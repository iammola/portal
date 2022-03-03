import { Schema } from "mongoose";

import { ModelNames } from "db";
import { ThingName } from "db/schema/Thing";

import type { BaseSubjectRecord, GroupSubjectRecord } from "types/schema";

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

export const BaseSubjectSchema = new Schema<BaseSubjectRecord>({
  name: {
    type: ThingName(),
    required: [true, "Name required"],
  },
  teachers: {
    default: undefined,
    ref: ModelNames.TEACHER,
    type: [Schema.Types.ObjectId],
  },
});

export const GroupSubjectSchema = new Schema<GroupSubjectRecord>({
  name: {
    type: ThingName(),
    required: [true, "Name required"],
  },
  divisions: {
    default: undefined,
    type: [BaseSubjectSchema],
  },
});
