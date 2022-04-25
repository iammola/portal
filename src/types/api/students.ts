import { CreateResult } from "types/api";

export type CreateStudentData = CreateResult<Pick<Schemas.Student.Schema, "schoolMail">>;

export interface CreateStudentRequestBody
  extends Required<Pick<Schemas.Student.Schema, "dob" | "gender" | "image" | "name" | "contact">> {
  password: string;
  academic: { class: string; subjects: string[] };
  guardians: Array<{ [K in "mail" | "relation"]: string }>;
}
