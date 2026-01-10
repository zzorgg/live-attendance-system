import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["teacher", "student"] },
});

export const User = mongoose.model("User", userSchema);
