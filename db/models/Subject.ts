import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import {
  subjectName,
  subjectAlias,
  subjectTeachers,
  SubjectDivisionSchema,
} from "db/schema/Subject";

import type {
  SubjectRecord,
  SubjectModel as SubjectModelType,
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
  (models[ModelNames.SUBJECT] as SubjectModelType) ??
  model<SubjectRecord, SubjectModelType>(ModelNames.SUBJECT, SubjectSchema);
