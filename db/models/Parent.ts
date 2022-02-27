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
  ParentRecord,
  ParentModel as ParentModelType,
} from "types/schema";

const ParentSchema = new Schema<ParentRecord, ParentModelType>({
  gender: userGender(),
  schoolMail: userSchoolMail(),
  dob: userDOB({ default: undefined }),
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

ParentSchema.virtual(...UserAuthVirtual);
ParentSchema.plugin(mongooseLeanVirtuals);

export const ParentModel =
  (models[ModelNames.PARENT] as ParentModelType) ??
  model<ParentRecord, ParentModelType>(ModelNames.PARENT, ParentSchema);
