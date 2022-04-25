import { CreateResult, DeleteResult, UpdateResult } from "types/api";

interface BaseRequestBody extends Omit<Schemas.Subject.BaseSchema, "_id" | "teachers"> {
  teachers: string[];
}

interface GroupRequestBody extends Omit<Schemas.Subject.GroupSchema, "_id" | "divisions"> {
  divisions: Array<
    Pick<Schemas.Subject.BaseSchema, "_id" | "name"> & {
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
