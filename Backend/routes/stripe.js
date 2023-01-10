const router = require("express").Router();
const Stripe = require("stripe"); 
const stripe = Stripe(process.env.SECRET_KEY) 
const { verifyToken } = require("./verifyToken");


// Create a new payment
router.post("/payment", async (req, res) => {
  console.log(req.body.cart);
  const line_items = req.body.cart.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images:[product.image],
          metadata : {
            id : product._id
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
  shipping_address_collection: {allowed_countries: ['US', 'PK']},
  shipping_options: [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {amount: 0, currency: 'usd'},
        display_name: 'Free shipping',
        delivery_estimate: {
          minimum: {unit: 'business_day', value: 5},
          maximum: {unit: 'business_day', value: 7},
        },
      },
    },
  ],
    phone_number_collection: {  
      enabled: true
    },
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/',
    cancel_url: 'http://localhost:3000/cart',
  });

  res.send({url : session.url});
 
}) ;
module.exports = router;
