import { FlattenIntersection } from "types/utils";
import { CreateResult, UpdateResult } from "types/api";
import { ClassRecord, TeacherSchema } from "types/schema";

export type CreateClassData = CreateResult<Pick<ClassRecord, "createdAt">>;
export type CreateClassRequestBody = Pick<ClassRecord, "name"> & Record<"teachers", string[]>;

export type GetClassesData<S extends keyof ClassRecord = keyof ClassRecord> = Array<
  FlattenIntersection<Pick<ClassRecord, "_id" | S>>
>;

export type GetClassData = Omit<ClassRecord<true>, "teachers">;

export type GetClassTeachersData = {
  teachers: TeacherSchema[];
};

export type AddClassTeachersData = Record<"success", boolean>;
export type AddClassTeachersRequestBody = Record<"teachers", string[]>;

export type DeleteClassTeacherData = UpdateResult & { message: string };
