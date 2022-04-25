import { CreateResult } from "types/api";

export type CreateTeacherData = CreateResult<Pick<Schemas.Teacher.Schema, "schoolMail">>;

export interface CreateTeacherRequestBody extends Omit<Schemas.Teacher.Schema, "_id" | "schoolMail" | "password"> {
  password: string;
}
