import { Schema, model, models } from "mongoose";

import {
  subjectName,
  subjectAlias,
  subjectTeachers,
  SubjectDivisionSchema,
} from "db/schema/Subject";

import type {
  SubjectModel as SubjectModelType,
  SubjectRecord,
} from "types/schema";

export const SubjectSchema = new Schema<SubjectRecord, SubjectModelType>({
  teachers: subjectTeachers(),
  name: subjectName("Subject name required"),
  alias: subjectAlias(
    "Subject alias required",
    "Subject alias min-length = 3",
    "Subject alias max-length = 5"
  ),
  class: {
    ref: "Class",
    type: Schema.Types.ObjectId,
    required: [true, "Subject class required"],
  },
  sessions: {
    // TODO: Sort out ref Model
    default: undefined,
    type: [Schema.Types.ObjectId],
  },
  divisions: {
    default: undefined,
    type: [SubjectDivisionSchema],
  },
});

export const SubjectModel =
  (models.Subject as SubjectModelType) ??
  model<SubjectRecord, SubjectModelType>("Subject", SubjectSchema);
