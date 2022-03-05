import { CreateResult } from "types/api";
import { ParentSchema } from "types/schema";

export type CreateParentData = CreateResult<Pick<ParentSchema, "schoolMail">>;
export type CreateParentRequestBody = Omit<ParentSchema, "_id" | "schoolMail" | "password"> & {
  password: string;
};
