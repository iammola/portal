import { Schema } from "mongoose";

import { ModelNames } from "db";

import type { BaseSubjectRecord, GroupSubjectRecord } from "types/schema";

export const subjectName = (required: string) => ({
  trim: true,
  unique: true,
  type: String,
  required: [true, required] as [true, string],
});

export const subjectAlias = (
  required: string,
  minLength: string,
  maxLength: string
) => ({
  trim: true,
  unique: true,
  type: String,
  minLength: [3, minLength] as const,
  maxLength: [5, maxLength] as const,
  required: [true, required] as [true, string],
});

export const subjectTeachers = () => ({
  default: undefined,
  ref: ModelNames.TEACHER,
  type: [Schema.Types.ObjectId],
});

export const BaseSubjectSchema = new Schema<BaseSubjectRecord>({
  name: subjectName("Subject name required"),
  alias: subjectAlias(
    "Subject alias required",
    "Subject alias min-length = 3",
    "Subject alias max-length = 5"
  ),
  teachers: subjectTeachers(),
});

export const GroupSubjectSchema = new Schema<GroupSubjectRecord>({
  name: subjectName("Subject name required"),
  alias: subjectAlias(
    "Subject alias required",
    "Subject alias min-length = 3",
    "Subject alias max-length = 5"
  ),
  divisions: {
    default: undefined,
    type: [BaseSubjectSchema],
  },
});
