import type { TeacherSchema } from "types/schema";

export type CreateTeacherData = Pick<TeacherSchema, "_id" | "schoolMail">;
export type CreateTeacherRequestBody = TeacherSchema;
