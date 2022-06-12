import { Schema } from "mongoose";

export const DateSchema = new Schema<Schemas.Attendance.Date>({
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
        // TODO: Look at this
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
