import { model, models } from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";
import { TeacherStaffSchema } from "db/schema/Staff";

const StaffSchema = createUserSchema<Schemas.Staff.Base>({}, { discriminatorKey: "__type" });

export const StaffModel = (models[ModelNames.STAFF] ?? model(ModelNames.STAFF, StaffSchema)) as Schemas.Staff.Model;

export const TeacherStaffModel = (StaffModel.discriminators?.[ModelNames.T_STAFF] ??
  StaffModel.discriminator(ModelNames.T_STAFF, TeacherStaffSchema)) as Schemas.Staff.TeacherModel;
