import type { StudentSchema } from "types/schema";

export type CreateStudentData = Pick<StudentSchema, "_id" | "schoolMail">;
export type CreateStudentRequestBody = Required<
  Pick<StudentSchema, "dob" | "gender" | "image" | "name" | "contact">
> & {
  password: string;
  academic: { class: string; subjects: string[] };
  guardians: { [K in "mail" | "relation"]: string }[];
};
