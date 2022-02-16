import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import {
  userDOB,
  userName,
  UserImage,
  userGender,
  userContact,
  userPassword,
  userSchoolMail,
} from "db/schema/User";

import type {
  TeacherRecord,
  TeacherModel as TeacherModelType,
} from "types/schema";

const TeacherSchema = new Schema<TeacherRecord, TeacherModelType>({
  gender: userGender(),
  schoolMail: userSchoolMail(),
  dob: userDOB({ default: undefined }),
  password: userPassword("Teacher Password required"),
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

export const TeacherModel =
  (models[ModelNames.TEACHER] as TeacherModelType) ??
  model<TeacherRecord, TeacherModelType>(ModelNames.TEACHER, TeacherSchema);
