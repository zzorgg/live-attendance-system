import mongoose from "mongoose";
import logger from "../logger";
import config from "./config";

const db = config.dbURI;

if (!db) {
  logger.error("urls is not set, exiting");
  process.exit(0);
}

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    logger.info(`Mongodb connected: ${config.dbURI}`);
  } catch (error) {
    logger.error(error);
  }
};

export default connectDB;
