import Stripe from "stripe";
import { orderModel } from "../models/order_model.js";
import { payModel } from "../models/payment_model.js";
import { ErrorHandler, SendError } from "../../services/errorhandeler.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = ErrorHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await orderModel
    .findById(orderId)
    .populate("orderItems.bookId");

  if (!order) throw new SendError(404, "Order not found");
  if (order.userId.toString() !== req.user.id)throw new SendError(403,"You are not authorized to pay for this order! This is not your order.",);

  if (order.paymentStatus === "paid") throw new SendError(400, "Order already paid");

  const line_items = order.orderItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.bookId.title,
      },
      unit_amount: item.bookId.price * 100, 
    },
    quantity: item.count,
  }));

  // إنشاء session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    metadata: {
        orderId: order._id.toString()
    },
    success_url: `http://localhost:4000/api/v1/payment/success?orderId=${order._id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:4000/cancel`,
  });

  await payModel.create({
    orderId: order._id,
    userId: order.userId,
    amount: order.totalPrice,
    stripeSessionId: session.id,
  });

  res.json({
    message: "Checkout session created",
    url: session.url,
    order: order,
  });
});


export const stripeWebhook = ErrorHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

   event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const orderId = session.metadata.orderId;

    await payModel.findOneAndUpdate(
      { stripeSessionId: session.id },
      { status: "succeeded" }
    );

    await orderModel.findOneAndUpdate(
      { _id: orderId }, 
      { 
        paymentStatus: "paid",
        status: "confirmed"
      }
    );

  }

  res.status(200).json({ received: true });
});