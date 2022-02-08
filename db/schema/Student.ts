import { Schema } from "mongoose";

import { ModelNames } from "db";

import type {
  StudentGuardianSchema as GuardianSchema,
  StudentAcademicSchema as AcademicSchema,
} from "types/schema";

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

const StudentAcademicTermSchema = new Schema(
  {
    term: {
      type: Schema.Types.ObjectId,
      required: [true, "Term ID required"],
    },
    subjects: {
      default: undefined,
      ref: ModelNames.SUBJECT,
      type: [Schema.Types.ObjectId],
    },
  },
  { _id: false }
);

export const StudentAcademicSchema = new Schema<AcademicSchema>(
  {
    class: {
      ref: ModelNames.CLASS,
      type: Schema.Types.ObjectId,
      required: [true, "Session Class ID required"],
    },
    session: {
      type: Schema.Types.ObjectId,
      required: [true, "Session ID required"],
    },
    terms: {
      type: [StudentAcademicTermSchema],
    },
  },
  { _id: false }
);
