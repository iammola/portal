import { CreateResult, DeleteResult, UpdateResult } from "types/api";
import { BaseSubjectSchema, GroupSubjectSchema } from "types/schema";

interface BaseRequestBody extends Omit<BaseSubjectSchema, "_id" | "teachers"> {
  teachers: string[];
}

interface GroupRequestBody extends Omit<GroupSubjectSchema, "_id" | "divisions"> {
  divisions: Array<
    Pick<BaseSubjectSchema, "_id" | "name"> & {
      teachers: string[];
    }
  >;
}

export type CreateSubjectData = CreateResult;
export type CreateSubjectRequestBody = GroupRequestBody | BaseRequestBody;

export type DeleteSubjectData = DeleteResult;

type SubjectKeys<T extends BaseRequestBody | GroupRequestBody, K extends "__type" = "__type"> = Utils.OneKey<
  Omit<T, K>
> &
  Pick<T, K>;

export type UpdateSubjectData = UpdateResult;

export type UpdateSubjectRequestBody = SubjectKeys<BaseRequestBody> | SubjectKeys<GroupRequestBody>;
