import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";

import type { ClassModel as ClassModelType, ClassRecord } from "types/schema";

const ClassSchema = new Schema<ClassRecord, ClassModelType>({
  name: {
    trim: true,
    type: String,
    unique: true,
    required: [true, "Class name required"],
  },
  alias: {
    trim: true,
    type: String,
    unique: true,
    required: [true, "Class alias required"],
    minLength: [3, "Class alias min-length = 3"],
    maxLength: [5, "Class alias max-length = 5"],
  },
  special: {
    trim: true,
    type: String,
    unique: true,
    required: [true, "Class special required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  teachers: {
    ref: ModelNames.TEACHER,
    type: [Schema.Types.ObjectId],
  },
});

ClassSchema.virtual("subjectsCount", {
  count: true,
  ref: ModelNames.SUBJECT,
  localField: "_id",
  foreignField: "class",
});

export const ClassModel =
  (models[ModelNames.CLASS] as ClassModelType) ??
  model<ClassRecord, ClassModelType>(ModelNames.CLASS, ClassSchema);
