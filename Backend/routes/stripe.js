const express = require("express");
const app = express();

const {Safepay} = require('@sfpy/node-sdk');

const { verifyToken } = require("./verifyToken");

const client = new Safepay({
  apiKey: 'sec_4fd2f034-4ffe-400c-a462-75b3712f74ff',
  v1Secret: '538d69b8e1f8e6aaf54649e2dea44661dfe135cb22518cb2e65cf04017abc650',
  environment: 'sandbox',
  webhookSecret: '6738a479a25bf2cb7614e413b90294a5c328834ca5a2d834830f536fd1550c09'
   
});
// Create a new payment
app.post("/payment", verifyToken, async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const { token } = await client.payments.create({ amount, currency });

    res.send({ token });
  } catch (error) {
    res.status(500).json(error);
  }
})

// Create a checkout link
app.post('/create-checkout-link', verifyToken, async (req, res) => {
  try {
    const { token } = req.body;

    const url = client.checkout.create({
      token,
      orderId: 'T800',
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

app.post('/verify-signature', verifyToken, async (req, res) => {
        const paymentNotification = req.body;
  try {
    const valid = client.verify.signature(paymentNotification);
    if (valid) {
      console.log("Order confirmed")
      // mark the invoice as paid
      res.sendStatus(200);
    } else {
      // show an error
      res.status(401).send('Invalid signature');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});




 
// app.post('/verify-webhook', verifyToken, async (req, res) => { 
//   try {
//     const valid = client.verify.webhook(req.body, req.headers['x-sfpy-signature']);
//      if (valid) {
//       // mark the invoice as paid
//       res.sendStatus(200);
//     } else {
//       // show an error
//       res.status(401).send('Invalid signature');
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });



module.exports = app;


