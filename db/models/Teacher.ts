import { Schema, model, models } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

import { ModelNames } from "db";
import {
  userDOB,
  userName,
  UserImage,
  userGender,
  userContact,
  userSchoolMail,
} from "db/schema/User";

import { UserAuthVirtual } from "./Auth";

import type {
  TeacherRecord,
  TeacherModel as TeacherModelType,
} from "types/schema";

const TeacherSchema = new Schema<TeacherRecord, TeacherModelType>({
  gender: userGender(),
  schoolMail: userSchoolMail(),
  dob: userDOB({ default: undefined }),
  image: {
    type: UserImage,
    default: undefined,
  },
  name: {
    type: userName(),
    required: [true, "Teacher name required"],
  },
  contact: {
    type: userContact(),
    required: [true, "Teacher Contact required"],
  },
});

TeacherSchema.virtual(...UserAuthVirtual);
TeacherSchema.plugin(mongooseLeanVirtuals);

export const TeacherModel =
  (models[ModelNames.TEACHER] as TeacherModelType) ??
  model<TeacherRecord, TeacherModelType>(ModelNames.TEACHER, TeacherSchema);
