import { Schema } from "mongoose";

export const SessionName = new Schema<Schemas.ThingName>(
  {
    long: {
      trim: true,
      unique: true,
      type: String,
      required: [true, "Long name required"],
    },
    short: {
      trim: true,
      unique: true,
      type: String,
      required: [true, "Short name required"],
    },
  },
  { _id: false }
);
