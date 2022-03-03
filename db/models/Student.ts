import { Schema, model, models } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

import { ModelNames } from "db";
import {
  StudentAcademicSchema,
  StudentGuardianSchema,
} from "db/schema/Student";
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
  StudentRecord,
  StudentModel as StudentModelType,
} from "types/schema";

const StudentSchema = new Schema<StudentRecord, StudentModelType>({
  gender: userGender(),
  schoolMail: userSchoolMail(),
  dob: userDOB({ required: [true, "Student DOB required"] }),
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
  academic: {
    default: undefined,
    type: [StudentAcademicSchema],
  },
  contact: {
    type: userContact(),
    required: [true, "Student Contact required"],
  },
});

StudentSchema.virtual(...UserAuthVirtual);
StudentSchema.plugin(mongooseLeanVirtuals);

export const StudentModel = (models[ModelNames.STUDENT] ??
  model(ModelNames.STUDENT, StudentSchema)) as StudentModelType;
