import { Schema } from "mongoose";

export const TermName = new Schema<Schemas.ThingName>(
  {
    long: {
      trim: true,
      type: String,
      required: [true, "Long name required"],
    },
    short: {
      trim: true,
      type: String,
      required: [true, "Short name required"],
    },
  },
  { _id: false }
);
