import { Schema, model, models } from "mongoose";

import {
  userDOB,
  userName,
  UserImage,
  userGender,
  UserContact,
  UserPassword,
  userSchoolMail,
} from "db/schema/User";

import type {
  StudentRecord,
  StudentModel as StudentModelType,
  StudentGuardianSchema as GuardianSchema,
} from "types/schema";

const StudentGuardianSchema = new Schema<GuardianSchema>(
  {
    guardian: {
      type: Schema.Types.ObjectId,
      // TODO: Sort out ref Model
      required: [true, "Guardian ID required"],
    },
    linkedOn: {
      type: Date,
      default: new Date(),
    },
    relationship: {
      type: String,
      required: [true, "Guardian Relationship required"],
    },
  },
  { _id: false }
);

export const StudentSchema = new Schema<StudentRecord, StudentModelType>({
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
    type: userName(),
    required: [true, "Student name required"],
  },
  guardians: {
    default: undefined,
    type: [StudentGuardianSchema],
  },
  contact: {
    type: UserContact,
    required: [true, "Student Contact required"],
  },
});

export const StudentModel =
  (models.Student as StudentModelType) ??
  model<StudentRecord, StudentModelType>("Student", StudentSchema);
