import { Schema, model, models, QueryOptions } from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

import type { ClassModel as Model, ClassRecord, ThingName as Name } from "types/schema";

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
    default: undefined,
    ref: ModelNames.TEACHER,
    type: [Schema.Types.ObjectId],
  },
  order: {
    type: Number,
    unique: true,
    required: true,
    min: [1, "Order cannot be less than 1"],
  },
});

ClassSchema.virtual("subjectsCount", {
  count: true,
  ref: ModelNames.SUBJECT,
  localField: "_id",
  foreignField: "class",
});

ClassSchema.static("findByName", function (name: string, type: keyof Name, ...args: [any?, QueryOptions?]) {
  const regex = new RegExp(name.replaceAll(/[-_]/g, " "), "i");
  return this.findOne({ [`name.${type}`]: regex }, ...args);
});

ClassSchema.static("getTeachers", function (classId: string, proj?: any, options?: QueryOptions) {
  return this.findById(classId, "teachers", options).populate("teachers", proj);
});

ClassSchema.pre("validate", async function () {
  if (this.isNew) this.order = 1 + (await this.collection.countDocuments({}));
});

export const ClassModel = (models[ModelNames.CLASS] ?? model(ModelNames.CLASS, ClassSchema)) as Model;
