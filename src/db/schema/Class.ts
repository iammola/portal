import { Schema } from "mongoose";

export const ClassName = new Schema<Schemas.ThingName>(
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
      index: {
        unique: true,
        partialFilterExpression: { special: { $type: "string" } },
      },
    },
  },
  { _id: false }
);
