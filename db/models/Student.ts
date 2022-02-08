import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
import { StudentGuardianSchema } from "db/schema/Student";
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
  StudentRecord,
  StudentModel as StudentModelType,
} from "types/schema";

const StudentSchema = new Schema<StudentRecord, StudentModelType>({
  gender: userGender(),
  schoolMail: userSchoolMail(),
  dob: userDOB({ required: [true, "Student DOB required"] }),
  password: {
    type: UserPassword,
    required: [true, "Student Password required"],
  },
  image: {
    type: UserImage,
    default: undefined,
  },
  name: {
    type: userName(false),
    required: [true, "Student name required"],
  },
  guardians: {
    default: undefined,
    type: [StudentGuardianSchema],
  },
  contact: {
    type: userContact(),
    required: [true, "Student Contact required"],
  },
});

export const StudentModel =
  (models[ModelNames.STUDENT] as StudentModelType) ??
  model<StudentRecord, StudentModelType>(ModelNames.STUDENT, StudentSchema);
