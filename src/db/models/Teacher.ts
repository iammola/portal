import { model, models } from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";

import type { TeacherRecord, TeacherModel as Model } from "types/schema";

const TeacherSchema = createUserSchema<TeacherRecord, Model>({});

export const TeacherModel = (models[ModelNames.TEACHER] ?? model(ModelNames.TEACHER, TeacherSchema)) as Model;
