import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderItems: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
        count: { type: Number, default: 0 },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    address: {
      governorate: {
        type: String,
      },
      street: {
        type: String,
      },
      description: {
        type: String,
      },
      phone: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentMethods: {
      type: String,
      enum: ["cash", "online"],
      default: "online",
    },
    transactionId: { type: String },
    paidAt: { type: Date },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
  },
  {
    timestamps: true,
  },
);

export const orderModel = mongoose.model("order", orderSchema);
