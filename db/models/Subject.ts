import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";

import type {
  SubjectRecord,
  SubjectModel as SubjectModelType,
} from "types/schema";

export const SubjectSchema = new Schema<SubjectRecord, SubjectModelType>({
  class: {
    ref: ModelNames.CLASS,
    type: Schema.Types.ObjectId,
    required: [true, "Subject class required"],
  },
  required: {
    type: Boolean,
    default: undefined,
  },
  sessions: {
    // TODO: Sort out ref Model
    default: undefined,
    type: [Schema.Types.ObjectId],
  },
});

export const SubjectModel =
  (models[ModelNames.SUBJECT] as SubjectModelType) ??
  model<SubjectRecord, SubjectModelType>(ModelNames.SUBJECT, SubjectSchema);
