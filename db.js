const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectToDatabase = async () => {
  try {
    const options = {
      useUnifiedTopology: true,
    };
    await mongoose.connect("mongodb://localhost:27017/SchoolPractice", options);
    console.log("Connected to MongoDB Atlas");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
};

connectToDatabase();
