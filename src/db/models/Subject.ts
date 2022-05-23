import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { BaseSubjectSchema, GroupSubjectSchema } from "db/schema/Subject";

const SubjectSchema = new mongoose.Schema<Schemas.Subject.Record>(
  {
    class: {
      ref: ModelNames.CLASS,
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Subject class required"],
    },
    mandatory: {
      type: Boolean,
      default: undefined,
    },
    order: {
      type: Number,
      min: [1, "Order cannot be less than 1"],
    },
  },
  { discriminatorKey: "__type" }
);

export const SubjectModel = (mongoose.models[ModelNames.SUBJECT] ??
  mongoose.model(ModelNames.SUBJECT, SubjectSchema)) as Schemas.Subject.Model;

export const BaseSubjectModel = (SubjectModel.discriminators?.[ModelNames.B_SUBJECT] ??
  SubjectModel.discriminator(ModelNames.B_SUBJECT, BaseSubjectSchema)) as Schemas.Subject.BaseModel;

export const GroupSubjectModel = (SubjectModel.discriminators?.[ModelNames.G_SUBJECT] ??
  SubjectModel.discriminator(ModelNames.G_SUBJECT, GroupSubjectSchema)) as Schemas.Subject.GroupModel;
