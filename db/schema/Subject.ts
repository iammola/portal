import { Schema } from "mongoose";

import { ModelNames } from "db";

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
  teachers: {
    default: undefined,
    ref: ModelNames.TEACHER,
    type: [Schema.Types.ObjectId],
  },
  name: subjectName(),
  alias: subjectAlias(),
});

export const GroupSubjectSchema = new Schema<GroupSubjectRecord>({
  name: subjectName(),
  alias: subjectAlias(),
  divisions: {
    default: undefined,
    type: [BaseSubjectSchema],
  },
});
