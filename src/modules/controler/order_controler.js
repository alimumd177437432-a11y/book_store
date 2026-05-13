import { ErrorHandler, SendError } from "../../services/errorhandeler.js";
import { cartModel } from "../models/cart_model.js";
import { orderModel } from "../models/order_model.js";
export const makeOrder = ErrorHandler(async (req, res, next) => {
  const userId = req.user.id;

  let orderItems = [];
  let totalPrice = 0;
  let totalAmount = 0;

  const findCartItems = await cartModel
    .find({ userId })
    .populate("bookId");
    

  if (!findCartItems || findCartItems.length === 0) {
    throw new SendError(400, "Cart is empty");
  }

  findCartItems.forEach((item) => {
    orderItems.push({
      bookId: item.bookId._id,
      count: item.count,
      price: item.bookId.price, 
    });

    totalPrice += item.bookId.price * item.count;
    totalAmount += item.count;
  });

  req.body.orderItems = orderItems;
  req.body.totalPrice = totalPrice;
  req.body.totalAmount = totalAmount;

  next();
});

export const getMyOrders = ErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const orders = await orderModel.find({ userId: id }).populate({
    path: "orderItems.bookId",
    select: "title price minPrivImage",
  });

  req.meta = orders;

  next();
});
export const cancelOrder = ErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await orderModel.findById(id);

  if (!order) throw new SendError(404, "Order not found");

  if (
    order.userId.toString() !== req.user.id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new SendError(403, "You are not authorized to cancel this order");
  }

  if (order.status !== "pending")
    throw new SendError(
      400,
      `Sorry, this order cannot be cancelled because it is already ${order.status}`,
    );

  order.status = "cancelled";
  await order.save();

  req.result = {
    message: "Order cancelled successfully.",
    data: order,
  };

  next();
});
