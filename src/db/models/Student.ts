import { model, models } from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";
import { AcademicSchema, GuardianSchema } from "db/schema/Student";

const StudentSchema = createUserSchema<Schemas.Student.Record, Schemas.Student.Model>({
  guardians: {
    default: undefined,
    type: [GuardianSchema],
  },
  academic: {
    default: undefined,
    type: [AcademicSchema],
  },
});

export const StudentModel = (models[ModelNames.STUDENT] ??
  model(ModelNames.STUDENT, StudentSchema)) as Schemas.Student.Model;
