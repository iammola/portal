import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";
import { ClassName } from "db/schema/Class";

import type { ProjectionType, QueryOptions } from "mongoose";

const ClassSchema = new Schema<Schemas.Class.Record, Schemas.Class.Model>(
  {
    name: {
      type: ClassName,
      required: [true, "Class name required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    teachers: {
      default: undefined,
      ref: ModelNames.STAFF,
      type: [Schema.Types.ObjectId],
    },
    order: {
      type: Number,
      unique: true,
      required: true,
      min: [1, "Order cannot be less than 1"],
    },
  },
  { versionKey: false }
);

ClassSchema.virtual("subjectsCount", {
  count: true,
  ref: ModelNames.SUBJECT,
  localField: "_id",
  foreignField: "class",
});

ClassSchema.static(
  "findByName",
  function (
    name: string,
    type: keyof Schemas.ThingName,
    ...args: [ProjectionType<Schemas.Class.Record>?, QueryOptions?]
  ) {
    const regex = new RegExp(name.replaceAll(/[-_]/g, " "), "i");
    return this.findOne({ [`name.${type}`]: regex }, ...args);
  }
);

ClassSchema.static("getTeachers", function (classId: string, proj?: unknown, options?: QueryOptions) {
  return this.findById(classId, "teachers", options).populate("teachers", proj);
});

ClassSchema.pre("validate", async function () {
  if (this.isNew) this.order = 1 + (await this.collection.countDocuments({}));
});

export const ClassModel = (models[ModelNames.CLASS] ?? model(ModelNames.CLASS, ClassSchema)) as Schemas.Class.Model;
