const router = require("express").Router();
const {Safepay,verify} = require('@sfpy/node-sdk');
const { verifyToken } = require("./verifyToken");
const { verifyWebhook } = require('@sfpy/node-sdk');
const { v4: uuidv4 } = require('uuid');
const Order = require("../models/Order");
const client = new Safepay({
  apiKey: 'sec_4fd2f034-4ffe-400c-a462-75b3712f74ff',
  v1Secret: '538d69b8e1f8e6aaf54649e2dea44661dfe135cb22518cb2e65cf04017abc650',
  environment: 'sandbox',
  webhookSecret: '6738a479a25bf2cb7614e413b90294a5c328834ca5a2d834830f536fd1550c09'
   
});

// Create a new payment
// Create a new payment
router.post("/payment", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const { token } = await client.payments.create({ amount, currency });

    res.send({ token });
  } catch (error) {
    res.status(500).json(error);
  }
})


// Create a checkout link
router.post('/create-checkout-link', async (req, res) => {
  try {
    const { token } = req.body;
    const url = client.checkout.create({
      token,
      orderId: uuidv4(),
      cancelUrl: 'http://localhost:3000/cart',
      redirectUrl: 'http://localhost:3000',
      source: 'custom',
      webhooks: true
    });

    res.send({ url });
   
  } catch (error) {
    res.status(500).json(error);
  }
});
// Route to handle the payment webhook
router.post('/webhook', async (req, res) => {

  const newOrder = new Order(req.body.data);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
  // const { event, data } = req.body;
});


module.exports = router;

