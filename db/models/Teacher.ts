import { Schema, model, models } from "mongoose";

import {
  userDOB,
  userName,
  UserImage,
  userGender,
  userContact,
  UserPassword,
  userSchoolMail,
} from "db/schema/User";

import type {
  TeacherRecord,
  TeacherModel as TeacherModelType,
} from "types/schema";

const TeacherSchema = new Schema<TeacherRecord, TeacherModelType>({
  gender: userGender(),
  schoolMail: userSchoolMail(),
  dob: userDOB({ required: [true, "Teacher DOB required"] }),
  password: {
    type: UserPassword,
    required: [true, "Teacher Password required"],
  },
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
  (models.Teacher as TeacherModelType) ??
  model<TeacherRecord, TeacherModelType>("Teacher", TeacherSchema);
