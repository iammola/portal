import { Schema } from "mongoose";

import { ModelNames } from "db";

import type { StudentGuardianSchema as GuardianSchema } from "types/schema";

export const StudentGuardianSchema = new Schema<GuardianSchema>(
  {
    guardian: {
      ref: ModelNames.PARENT,
      type: Schema.Types.ObjectId,
      required: [true, "Guardian ID required"],
    },
    relation: {
      type: String,
      required: [true, "Guardian Relationship required"],
      enum: ["father", "mother", "other"],
    },
  },
  { _id: false }
);
