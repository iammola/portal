import type { BaseSubjectSchema, GroupSubjectSchema } from "types/schema";

export type CreateSubjectData = Pick<BaseSubjectSchema, "_id">;
export type CreateSubjectRequestBody =
  | (Omit<GroupSubjectSchema, "_id" | "divisions"> & {
      divisions: (Pick<BaseSubjectSchema, "_id" | "name" | "alias"> & {
        teachers: string[];
      })[];
    })
  | (Omit<BaseSubjectSchema, "_id" | "teachers"> & {
      teachers: string[];
    });

export type DeleteSubjectData = {
  success: boolean;
};
