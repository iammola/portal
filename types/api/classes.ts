import { CreateResult } from "types/api";
import { FlattenIntersection } from "types/utils";
import { ClassRecord, TeacherSchema } from "types/schema";

export type CreateClassData = CreateResult<Pick<ClassRecord, "createdAt">>;
export type CreateClassRequestBody = Pick<ClassRecord, "name" | "teachers">;

export type GetClassesData<S extends keyof ClassRecord = keyof ClassRecord> = Array<
  FlattenIntersection<Pick<ClassRecord, "_id" | S>>
>;

export type GetClassData = Omit<ClassRecord<true>, "teachers">;

export type GetClassTeachersData = {
  teachers: TeacherSchema[];
};
