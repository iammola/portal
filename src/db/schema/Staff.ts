import { Schema } from "mongoose";

export const TeacherStaffSchema = new Schema(
  {
    privileges: {
      type: [String],
      enum: [],
    },
  },
  { versionKey: false }
);
