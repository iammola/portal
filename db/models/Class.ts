import mongooseLeanVirtuals from "mongoose-lean-virtuals";
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
    ref: ModelNames.TEACHER,
    type: [Schema.Types.ObjectId],
  },
});

ClassSchema.plugin(mongooseLeanVirtuals);

ClassSchema.virtual("subjectsCount", {
  count: true,
  ref: ModelNames.SUBJECT,
  localField: "_id",
  foreignField: "class",
});

ClassSchema.static(
  "findByName",
  function (name: string, type: keyof Name, ...args: [any?, QueryOptions?]) {
    const regex = new RegExp(name.replaceAll(/[-_]/g, " "), "i");
    return this.findOne({ [`name.${type}`]: regex }, ...args);
  }
);

export const ClassModel = (models[ModelNames.CLASS] ??
  model(ModelNames.CLASS, ClassSchema)) as Model;
