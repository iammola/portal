import { Schema } from "mongoose";

import type { AttendanceDate } from "types/schema";

export const DateSchema = new Schema<AttendanceDate>({
  in: {
    type: Date,
    immutable: true,
    required: [true, "Attendance in time required"],
  },
  out: {
    type: Date,
    validate: {
      message: "Out time cannot be before In time",
      validator() {
        return true;
      },
    },
  },
  state: {
    type: String,
    immutable: true,
    enum: ["present", "late"],
  },
});
