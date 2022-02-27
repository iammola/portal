import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import { BaseSubjectSchema, GroupSubjectSchema } from "db/schema/Subject";

import type {
  SubjectRecord,
  SubjectModel as SubjectModelType,
  BaseSubjectModel as BaseSubjectType,
  GroupSubjectModel as GroupSubjectType,
} from "types/schema";

const SubjectSchema = new Schema<SubjectRecord>(
  {
    class: {
      ref: ModelNames.CLASS,
      type: Schema.Types.ObjectId,
      required: [true, "Subject class required"],
    },
    mandatory: {
      type: Boolean,
      default: undefined,
    },
    sessions: {
      // TODO: Sort out ref Model
      default: undefined,
      type: [Schema.Types.ObjectId],
    },
  },
  { discriminatorKey: "__type" }
);

export const SubjectModel =
  (models[ModelNames.SUBJECT] as SubjectModelType) ??
  model<SubjectRecord, SubjectModelType>(ModelNames.SUBJECT, SubjectSchema);

export const BaseSubjectModel =
  (SubjectModel.discriminators?.[ModelNames.B_SUBJECT] as BaseSubjectType) ??
  SubjectModel.discriminator(ModelNames.B_SUBJECT, BaseSubjectSchema);

export const GroupSubjectModel =
  (SubjectModel.discriminators?.[ModelNames.G_SUBJECT] as GroupSubjectType) ??
  SubjectModel.discriminator(ModelNames.G_SUBJECT, GroupSubjectSchema);
