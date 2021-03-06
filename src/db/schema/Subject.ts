import { Schema } from "mongoose";

import { ModelNames } from "db";

const SubjectName = () =>
  new Schema<Schemas.ThingName>(
    {
      long: {
        trim: true,
        type: String,
        required: [true, "Long name required"],
      },
      short: {
        trim: true,
        type: String,
        required: [true, "Short name required"],
      },
    },
    { _id: false }
  );

export const BaseSubjectSchema = new Schema<Schemas.Subject.BaseRecord>(
  {
    name: {
      type: SubjectName(),
      required: [true, "Name required"],
    },
    teachers: {
      default: undefined,
      ref: ModelNames.STAFF,
      type: [Schema.Types.ObjectId],
    },
  },
  { versionKey: false }
);

BaseSubjectSchema.virtual("teachersCount").get(function (this: Schemas.Subject.BaseRecord) {
  return this.teachers.length;
});

export const GroupSubjectSchema = new Schema<Schemas.Subject.GroupRecord>(
  {
    name: {
      type: SubjectName(),
      required: [true, "Name required"],
    },
    divisions: {
      default: undefined,
      type: [BaseSubjectSchema],
    },
  },
  { versionKey: false }
);

GroupSubjectSchema.virtual("divisionsCount").get(function (this: Schemas.Subject.GroupRecord) {
  return this.divisions.length;
});
