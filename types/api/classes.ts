import type { CreateResult } from "types/api";
import type { ClassSchema } from "types/schema";
import type { FlattenIntersection } from "types/utils";

export type CreateClassData = CreateResult<Pick<ClassSchema, "createdAt">>;
export type CreateClassRequestBody = Pick<ClassSchema, "name" | "teachers">;

export type GetClassesData<S extends keyof ClassSchema = keyof ClassSchema> =
  FlattenIntersection<Pick<ClassSchema, "_id" | S>>[];
