import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ["teacher", "student"], required: true},
}, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: Record<string, any>) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

export const User = mongoose.model("User", userSchema);
