import { CreateResult } from "types/api";
import { TeacherSchema } from "types/schema";

export type CreateTeacherData = CreateResult<Pick<TeacherSchema, "schoolMail">>;
export interface CreateTeacherRequestBody extends Omit<TeacherSchema, "_id" | "schoolMail" | "password"> {
  password: string;
}
