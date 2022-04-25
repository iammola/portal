import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

export const subjectName = () => ({
  trim: true,
  unique: true,
  type: String,
  required: [true, "Subject name required"] as [true, string],
});

export const subjectAlias = () => ({
  trim: true,
  unique: true,
  type: String,
  minLength: [3, "Subject alias min-length = 3"] as const,
  maxLength: [5, "Subject alias max-length = 5"] as const,
  required: [true, "Subject alias required"] as [true, string],
});

export const BaseSubjectSchema = new mongoose.Schema<Schemas.Subject.BaseRecord>({
  name: {
    type: ThingName(),
    required: [true, "Name required"],
  },
  teachers: {
    default: undefined,
    ref: ModelNames.TEACHER,
    type: [mongoose.Schema.Types.ObjectId],
  },
});

BaseSubjectSchema.virtual("teachersCount").get(function (this: Schemas.Subject.BaseRecord) {
  return this.teachers.length;
});

export const GroupSubjectSchema = new mongoose.Schema<Schemas.Subject.GroupRecord>({
  name: {
    type: ThingName(),
    required: [true, "Name required"],
  },
  divisions: {
    default: undefined,
    type: [BaseSubjectSchema],
  },
});

GroupSubjectSchema.virtual("divisionsCount").get(function (this: Schemas.Subject.GroupRecord) {
  return this.divisions.length;
});
