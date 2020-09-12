const express = require("express");
const app = express();
const mongoose = require("mongoose");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const connectDB = require("./database");
const fileupload = require("express-fileupload");
const cookieparser = require('cookie-parser');

//Load environment variables
dotenv.config({ path: "./config/config.env" });

//so that req.body works properly
app.use(express.json());

//cookie parser
app.use(cookieparser());

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


//For logging purpose
app.use(morgan("dev"));
//file upload
app.use(fileupload());

app.use("/api/category", categories);
app.use("/api/review", reviews);
app.use("/api", persons);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running at port ${PORT}`));
