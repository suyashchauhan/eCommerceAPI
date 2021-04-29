const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongoDB Atlas".bold.blue);
  } catch (err) {
    throw new Error("Database failed to connect")
  }
};

module.exports = connectDB;
