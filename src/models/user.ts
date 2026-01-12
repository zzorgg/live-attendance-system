import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: Object, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["teacher", "student"] },
});

export const User = mongoose.model("User", userSchema);
