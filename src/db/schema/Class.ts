import * as mongoose from "mongoose";

export const ClassName = new mongoose.Schema<Schemas.ThingName>(
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
    special: {
      trim: true,
      type: String,
      unique: true,
    },
  },
  { _id: false }
);
