import { CreateResult } from "types/api";
import { ClassRecord } from "types/schema";
import { FlattenIntersection } from "types/utils";

export type CreateClassData = CreateResult<Pick<ClassRecord, "createdAt">>;
export type CreateClassRequestBody = Pick<ClassRecord, "name" | "teachers">;

export type GetClassesData<S extends keyof ClassRecord = keyof ClassRecord> = Array<
  FlattenIntersection<Pick<ClassRecord, "_id" | S>>
>;

export type GetClassData = Omit<ClassRecord<true>, "teachers">;
