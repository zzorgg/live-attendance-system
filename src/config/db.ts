import mongoose from "mongoose";
import config from "./config";

const db = config.dbURI;

if (!db) {
  console.log("URL not set");
  process.exit(0);
}

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MONGODB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
