import { Schema } from "mongoose";

import { ModelNames } from "db/constants";

import type { StudentGuardianSchema as Guardian, StudentAcademicSchema as Academic } from "types/schema";

export const GuardianSchema = new Schema<Guardian>(
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

export const AcademicSchema = new Schema<Academic>(
  {
    term: {
      type: Schema.Types.ObjectId,
      required: [true, "Term ID required"],
    },
    class: {
      ref: ModelNames.CLASS,
      type: Schema.Types.ObjectId,
      required: [true, "Term Class required"],
    },
    subjects: {
      default: undefined,
      ref: ModelNames.SUBJECT,
      type: [Schema.Types.ObjectId],
    },
  },
  { _id: false }
);
