require("dotenv").config();    // requiring dotenv config to use .env file variables
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe")
var cookieParser = require("cookie-parser"); 
const helmet = require('helmet')
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const cors = require("cors");
const app = express();


// Set Security HTTP headers
app.use(helmet())



// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//Body parser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


//Cookie Parser
app.use(cookieParser());


app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);




//Limit Request from same API
const limiter = rateLimit({
  max:100,
  windowMs :  60 * 60 * 1000,
  message : 'To many request, try again later in an hour'           //Window Mili-sec
})
app.use('/api',limiter)

// Data sanitization against Nosql query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

//connection to database
const mongoString = process.env.DATABASE_URL;
mongoose
  .connect(mongoString)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
