import mongoose from "mongoose";
import config from "config";

const dbURI = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("db connected");
  } catch (error) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
