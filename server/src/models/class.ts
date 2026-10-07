import mongoose from "mongoose";

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    className: { type: String, required: true, trim: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    studentIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Class = mongoose.model("Class", classSchema);
