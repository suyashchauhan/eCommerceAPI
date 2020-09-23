const express = require("express");
const app = express();
const mongoose = require("mongoose");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const connectDB = require("./database");
const fileupload = require("express-fileupload");
const cookieparser = require("cookie-parser");
const session = require("express-session");
//Load environment variables
dotenv.config({ path: "./config/config.env" });
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
    cookie: { maxAge: 180 * 60 * 100 },
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

//For logging purpose
app.use(morgan("dev"));
//file upload
app.use(fileupload());
// app.get("/api/:id", async (req, res, next) => {
//   try {
//     console.log(req.cookies);
//     //req.session.views = 1;
//     //console.log("this is on the server file  ".white.bold, req.cookies);
//     if (!req.session.cart) {
//       const cart = await productModel.findById(req.params.id);
//       req.session.cart = cart;
//       console.log('yaahan pe aa raaha hai ')
//     } else {
//       req.session.views = 1;
//     }
//     console.log("session is  ".blue, req.session);
//     console.log(req.session);
//     // window["localStorage"].xy = "hadsa";
//     res.send(req.session);
//   } catch (err) {
//     res.send(err);
//   }
// });
app.use("/api/category", categories);
app.use("/api/review", reviews);
app.use("/api", persons);
app.use("/api/product", products);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running at port ${PORT}`));
