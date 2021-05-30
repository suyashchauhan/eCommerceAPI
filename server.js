const express = require("express");
const app = express();
const mongoose = require("mongoose");
const stripe = require('stripe')(`${process.env.Stripe_secret_key}`)
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const connectDB = require("./database");
const fileupload = require("express-fileupload");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const orderModel = require("./models/order");
const Mongostore = require("connect-mongo")(session);
//Load environment variables
dotenv.config({ path: `${__dirname}/.env` });
//const productModel = require("./models/product");
//so that req.body works properly
app.use(express.json());

//cookie parser
app.use(cookieparser());
app.use(
  session({
    secret: process.env.Session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 100 },
    store: new Mongostore({ mongooseConnection: mongoose.connection }),
  })
);
require("./config/passport")(passport);

//passport local
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

connectDB();
//Route Files
const categories = require("./routes/category");
const reviews = require("./routes/review");
const persons = require("./routes/person");
const products = require("./routes/product");
const cart = require("./routes/cart");
const order = require("./routes/order");
//For logging purpose
app.use(morgan("dev"));
//file upload
app.use(fileupload());

// Redirect to Docs 
app.get('/', (req, res, next) => {
  res.redirect('https://documenter.getpostman.com/view/11688579/TVRj58Xi');
})
app.post('/webhook', async (req, res) => {
  let event;
  if (process.env.NODE_CONFIG_PRODUCTION === 'true') {
    const signature = req.headers['stripe-signature']
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, process.env.Stripe_endpoint_secret)
    }
    catch (err) {
      res.status(400).send({ sucess: false, mesg: `Webhook error${err.message}` })
    }
  }
  else
    event = req.body
  switch (event.type) {
    case 'invoice.paid': const paymentIntent = event.data.object
      try {
        const paidOrder = await orderModel.findOne({ invoice_id: paymentIntent.id })
        if (paidOrder) {
          paidOrder.isPaid = true;
          await paidOrder.save();
        }
      }
      catch (err) {
        res.json({ success: false });
      }
      break;
    default: console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ success: true });
})
app.use("/api/category", categories);
app.use("/api/review", reviews);
app.use("/api", persons);
app.use("/api/product", products);
app.use("/api/cart", cart);
app.use("/api/order", order);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running at port ${PORT}`));
