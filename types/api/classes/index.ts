import type { ClassSchema } from "types/schema";

export type CreateClassError = string;
export type CreateClassData = Pick<ClassSchema, "_id" | "createdAt">;
export type CreateClassRequestBody = Pick<ClassSchema, "name" | "alias" | "special">;
