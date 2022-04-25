import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";

const TeacherSchema = createUserSchema<Schemas.Teacher.Record, Schemas.Teacher.Model>({});

export const TeacherModel = (mongoose.models[ModelNames.TEACHER] ??
  mongoose.model(ModelNames.TEACHER, TeacherSchema)) as Schemas.Teacher.Model;
