import { Schema, model, models } from "mongoose";

import { ModelNames } from "db";
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
  ParentRecord,
  ParentModel as ParentModelType,
} from "types/schema";

const ParentSchema = new Schema<ParentRecord, ParentModelType>({
  gender: userGender(),
  schoolMail: userSchoolMail(),
  dob: userDOB({ required: [true, "Parent DOB required"] }),
  password: {
    type: UserPassword,
    required: [true, "Parent Password required"],
  },
  image: {
    type: UserImage,
    default: undefined,
  },
  name: {
    type: userName(),
    required: [true, "Parent name required"],
  },
  contact: {
    type: userContact(),
    required: [true, "Parent Contact required"],
  },
  occupation: {
    type: String,
    trim: true,
  },
});

export const ParentModel =
  (models[ModelNames.PARENT] as ParentModelType) ??
  model<ParentRecord, ParentModelType>(ModelNames.PARENT, ParentSchema);
