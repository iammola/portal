import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import { BaseSubjectSchema, GroupSubjectSchema } from "db/schema/Subject";

import type {
  SubjectRecord,
  SubjectModel as Model,
  BaseSubjectModel as Base,
  GroupSubjectModel as Group,
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

export const SubjectModel = (models[ModelNames.SUBJECT] ??
  model(ModelNames.SUBJECT, SubjectSchema)) as Model;

export const BaseSubjectModel =
  (SubjectModel.discriminators?.[ModelNames.B_SUBJECT] as Base) ??
  SubjectModel.discriminator(ModelNames.B_SUBJECT, BaseSubjectSchema);

export const GroupSubjectModel =
  (SubjectModel.discriminators?.[ModelNames.G_SUBJECT] as Group) ??
  SubjectModel.discriminator(ModelNames.G_SUBJECT, GroupSubjectSchema);
