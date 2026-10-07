import mongoose from "mongoose";
import { User } from "./user";

const { Schema } = mongoose;

const classSchema = new Schema({
  className: { required: true, trim: true },
  teacherId: { ref: 'User', required: true },
  status: { enum: ["present", "absent"], required: true },
}, {

  timestamps: true
})
