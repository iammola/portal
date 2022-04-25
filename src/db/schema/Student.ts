import * as mongoose from "mongoose";

import { ModelNames } from "db";

export const GuardianSchema = new mongoose.Schema<Schemas.Student.Guardian>(
  {
    guardian: {
      ref: ModelNames.PARENT,
      type: mongoose.Schema.Types.ObjectId,
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

export const AcademicSchema = new mongoose.Schema<Schemas.Student.Academic>(
  {
    term: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Term ID required"],
    },
    class: {
      ref: ModelNames.CLASS,
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Term Class required"],
    },
    subjects: {
      default: undefined,
      ref: ModelNames.SUBJECT,
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { _id: false }
);
