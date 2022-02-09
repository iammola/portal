import type { ClassSchema } from "types/schema";
import type { FlattenIntersection } from "types/utils";

export type CreateClassData = Pick<ClassSchema, "_id" | "createdAt">;
export type CreateClassRequestBody = Pick<
  ClassSchema,
  "name" | "alias" | "special" | "teachers"
>;

export type GetClassesData<S extends keyof ClassSchema = keyof ClassSchema> =
  FlattenIntersection<Pick<ClassSchema, "_id" | S>>[];
