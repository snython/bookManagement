const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    const connect = await mongoose.connect('mongodb://localhost/bookmanagement');
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
