import { CreateResult, UpdateResult } from "types/api";

export type CreateClassData = CreateResult<Pick<Schemas.Class.Record, "createdAt">>;

export type CreateClassRequestBody = Pick<Schemas.Class.Record, "name"> & Record<"teachers", string[]>;

type ClassDataNoTeacher = Omit<Schemas.Class.Record<true>, "teachers">;

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
  students: Schemas.Student.Schema[];
};

export type GetClassStudentsCount = {
  count: number;
};

export type GetClassSubjectsData = {
  subjects: Array<Schemas.Subject.Record<true>>;
};

export type GetClassTeachersData = {
  teachers: Schemas.Teacher.Schema[];
};

export type AddClassTeachersData = Record<"success", boolean>;
export type AddClassTeachersRequestBody = Record<"teachers", string[]>;

export type DeleteClassTeacherData = UpdateResult & { message: string };
