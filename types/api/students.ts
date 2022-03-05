import { CreateResult } from "types/api";
import { StudentSchema } from "types/schema";

export type CreateStudentData = CreateResult<Pick<StudentSchema, "schoolMail">>;
export type CreateStudentRequestBody = Required<
  Pick<StudentSchema, "dob" | "gender" | "image" | "name" | "contact">
> & {
  password: string;
  academic: { class: string; subjects: string[] };
  guardians: Array<{ [K in "mail" | "relation"]: string }>;
};
