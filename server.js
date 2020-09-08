const express = require("express");
const app = express();
const mongoose = require("mongoose");
const colors = require("colors");
const morgan = require("morgan");
const dotenv =   require('dotenv');
const connectDB = require("./database");
const fileupload = require("express-fileupload")

//Load environment variables
dotenv.config({path:"./config/config.env"})

connectDB();
//Route Files
const categories = require("./routes/category");
const reviews = require("./routes/review");

//so that req.body works properly
app.use(express.json());
//For logging purpose
app.use(morgan("dev"))
//file upload 
app.use(fileupload());

app.use("/api/category", categories);
app.use("/api/review", reviews);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running at port ${PORT}`));
