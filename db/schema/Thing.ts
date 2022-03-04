import { Schema } from "mongoose";

import type { ThingName as Name } from "types/schema";

export const ThingName = (withSpecial?: true) => {
  return new Schema<Name>(
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
      special:
        withSpecial === true
          ? {
              trim: true,
              type: String,
              unique: true,
              required: [true, "Class special required"],
            }
          : {},
    },
    { _id: false }
  );
};
