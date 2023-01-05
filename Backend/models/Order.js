const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String,  required: true },
    products: [
      {
        _id: { type: String,  required: true },
        title: { type: String,  required: true },
        price: { type: Number,  required: true },
        image: { type: String,  required: true },
        qty: { type: Number },
    }
    ],
    amount : {type: Number , required : true},
    address : {type: Object , required : true},
    status : {type: String ,default:"Pending"}
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", orderSchema);