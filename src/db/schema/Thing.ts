import * as mongoose from "mongoose";

export const ThingName = (withSpecial?: true) => {
  return new mongoose.Schema<Schemas.ThingName>(
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
      special: withSpecial ? { trim: true, type: String, unique: true } : {},
    },
    { _id: false }
  );
};
