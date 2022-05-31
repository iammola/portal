import * as mongoose from "mongoose";

export const TeacherStaffSchema = new mongoose.Schema(
  {
    privileges: {
      type: [String],
      enum: [],
    },
  },
  { versionKey: false }
);
