import { CreateResult } from "types/api";
import { ClassSchema } from "types/schema";
import { FlattenIntersection } from "types/utils";

export type CreateClassData = CreateResult<Pick<ClassSchema, "createdAt">>;
export type CreateClassRequestBody = Pick<ClassSchema, "name" | "teachers">;

export type GetClassesData<S extends keyof ClassSchema = keyof ClassSchema> =
  FlattenIntersection<Pick<ClassSchema, "_id" | S>>[];
