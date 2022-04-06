import { CreateResult, UpdateResult } from "types/api";
import { ClassRecord, StudentSchema, SubjectRecord, TeacherSchema } from "types/schema";

export type CreateClassData = CreateResult<Pick<ClassRecord, "createdAt">>;
export type CreateClassRequestBody = Pick<ClassRecord, "name"> & Record<"teachers", string[]>;

type ClassDataNoTeacher = Omit<ClassRecord<true>, "teachers">;

export type GetClassesData<S extends keyof ClassDataNoTeacher = keyof ClassDataNoTeacher> = {
  page?: number;
  pages: number;
  classes: Array<GetClassData<S>>;
};

export type GetClassData<S extends keyof ClassDataNoTeacher = keyof ClassDataNoTeacher> = Pick<
  ClassDataNoTeacher,
  "_id" | S
>;

export type GetClassStudentsData = {
  page?: number;
  pages: number;
  students: StudentSchema[];
};

export type GetClassStudentsCount = {
  count: number;
};

export type GetClassSubjectsData = {
  subjects: SubjectRecord[];
};

export type GetClassTeachersData = {
  teachers: TeacherSchema[];
};

export type AddClassTeachersData = Record<"success", boolean>;
export type AddClassTeachersRequestBody = Record<"teachers", string[]>;

export type DeleteClassTeacherData = UpdateResult & { message: string };
