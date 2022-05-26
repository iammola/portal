import * as mongoose from "mongoose";

import { ModelNames } from "db";

const SubjectName = () =>
  new mongoose.Schema<Schemas.ThingName>(
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

export const BaseSubjectSchema = new mongoose.Schema<Schemas.Subject.BaseRecord>({
  name: {
    type: SubjectName(),
    required: [true, "Name required"],
  },
  teachers: {
    default: undefined,
    ref: ModelNames.STAFF,
    type: [mongoose.Schema.Types.ObjectId],
  },
});

BaseSubjectSchema.virtual("teachersCount").get(function (this: Schemas.Subject.BaseRecord) {
  return this.teachers.length;
});

export const GroupSubjectSchema = new mongoose.Schema<Schemas.Subject.GroupRecord>({
  name: {
    type: SubjectName(),
    required: [true, "Name required"],
  },
  divisions: {
    default: undefined,
    type: [BaseSubjectSchema],
  },
});

GroupSubjectSchema.virtual("divisionsCount").get(function (this: Schemas.Subject.GroupRecord) {
  return this.divisions.length;
});
