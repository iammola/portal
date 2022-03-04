import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

import type { ClassModel as Model, ClassRecord } from "types/schema";

const ClassSchema = new Schema<ClassRecord, Model>({
  name: {
    type: ThingName(true),
    required: [true, "Class name required"],
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

export const ClassModel = (models[ModelNames.CLASS] ??
  model(ModelNames.CLASS, ClassSchema)) as Model;
