const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // userId: { type: String,  required: true },
    // products: [
    //   {
    //     _id: { type: String,  required: true },
    //     title: { type: String,  required: true },
    //     price: { type: Number,  required: true },
    //     image: { type: String,  required: true },
    //     qty: { type: Number },
    // }
    // ],
    token: { type: String, required: true },
    client_id: { type: String, required: true },
    type: { type: String, required: true },
    endpoint: { type: String, required: true },
    notification: {
      tracker: { type: String, required: true },
      reference: { type: String, required: true },
      intent: { type: String, required: true },
      fee: { type: Number, required: true },
      net: { type: Number, required: true },
      user: { type: String, required: true },
      state: { type: String, required: true },
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      metadata: {
        order_id: { type: String, required: true },
        source: { type: String, required: true },
      },
    },
    delivery_attempts: { type: Number, required: true },
    resource: { type: String, required: true },
    next_attempt_at: { type: Date, required: true },
    created_at: { type: Date, required: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", orderSchema);