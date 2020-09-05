const express = require("express");
const app = express();
const mongoose = require("mongoose");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./database");
connectDB();
//Route Files
const categories = require("./routes/category");

//so that req.body works properly
app.use(express.json());
app.use(morgan("dev"))

app.use("/api/category", categories);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running at port ${PORT}`));
