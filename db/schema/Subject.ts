import { Schema } from "mongoose";

import { ModelNames } from "db";

import type { SubjectDivisionSchema as SchemaType } from "types/schema";

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

export const SubjectDivisionSchema = new Schema<SchemaType>({
  teachers: subjectTeachers(),
  name: subjectName("Subject Division name required"),
  alias: subjectAlias(
    "Subject Division alias required",
    "Subject Division alias min-length = 3",
    "Subject Division alias max-length = 5"
  ),
});
