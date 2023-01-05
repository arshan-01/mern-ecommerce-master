const Order = require("../models/Order");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");
const router = require("express").Router();

//Create Order
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ONLY ADMIN CAN UPDATE ORDER 
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ONLY ADMIN CAN DELETE ORDER 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(" Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER ORDERS
//ONLY AUTHORIZED USER CAN SEE AND ALSO ADMIN 
router.get("/all/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const getOrders = await Order.find({ userId: req.params.id });
    res.status(200).json(getOrders);
  } catch (error) {
    res.status(500).json(error);
  }
});


//GET USER SINGLE ORDER
//ONLY AUTHORIZED USER CAN SEE AND ALSO ADMIN 
router.get("/detail/:OrderId/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const getOrders = await Order.find({ _id: req.params.OrderId, userId: req.params.id });
    res.status(200).json(getOrders);
  } catch (error) {
    res.status(500).json(error);
  }
});


//GET ALL ORDERS FROM ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
