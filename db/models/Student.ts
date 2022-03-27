import { model, models } from "mongoose";

import { ModelNames } from "db/constants";
import { createUserSchema } from "db/schema/User";
import { AcademicSchema, GuardianSchema } from "db/schema/Student";

import type { StudentRecord, StudentModel as Model } from "types/schema";

const StudentSchema = createUserSchema<StudentRecord, Model>({
  guardians: {
    default: undefined,
    type: [GuardianSchema],
  },
  academic: {
    default: undefined,
    type: [AcademicSchema],
  },
});

export const StudentModel = (models[ModelNames.STUDENT] ?? model(ModelNames.STUDENT, StudentSchema)) as Model;
