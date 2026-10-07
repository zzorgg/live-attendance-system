import mongoose from "mongoose";

const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["present", "absent"], required: true },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.index({ classId: 1, studentId: 1 }, { unique: true });

export const Attendance = mongoose.model("Attendance", attendanceSchema);
