import type { CreateResult } from "types/api";
import type { TeacherSchema } from "types/schema";

export type CreateTeacherData = CreateResult<Pick<TeacherSchema, "schoolMail">>;
export type CreateTeacherRequestBody = Omit<
  TeacherSchema,
  "_id" | "schoolMail" | "password"
> & { password: string };
