import type { BaseSubjectSchema, GroupSubjectSchema } from "types/schema";

export type CreateSubjectData = Pick<BaseSubjectSchema, "_id">;
export type CreateSubjectRequestBody =
  | (Omit<GroupSubjectSchema, "divisions"> & {
      divisions: (Pick<BaseSubjectSchema, "_id" | "name" | "alias"> & {
        teachers: string[];
      })[];
    })
  | (Omit<BaseSubjectSchema, "teachers"> & {
      teachers: string[];
    });
