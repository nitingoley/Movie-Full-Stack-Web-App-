import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = () => {
  try {
     mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to MongoDB 👍`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;