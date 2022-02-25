import type { CreateResult, DeleteResult, UpdateResult } from "types/api";
import type { OneKey } from "types/utils";
import type { BaseSubjectSchema, GroupSubjectSchema } from "types/schema";

type BaseRequestBody = Omit<BaseSubjectSchema, "_id" | "teachers"> & {
  teachers: string[];
};

type GroupRequestBody = Omit<GroupSubjectSchema, "_id" | "divisions"> & {
  divisions: (Pick<BaseSubjectSchema, "_id" | "name" | "alias"> & {
    teachers: string[];
  })[];
};

export type CreateSubjectData = CreateResult;
export type CreateSubjectRequestBody = GroupRequestBody | BaseRequestBody;

export type DeleteSubjectData = DeleteResult;

type SubjectKeys<
  T extends BaseRequestBody | GroupRequestBody,
  K extends "__type" = "__type"
> = OneKey<Omit<T, K>> & Pick<T, K>;

export type UpdateSubjectData = UpdateResult;

export type UpdateSubjectRequestBody =
  | SubjectKeys<BaseRequestBody>
  | SubjectKeys<GroupRequestBody>;
