import type { CreateResult } from "types/api";
import type { ParentSchema } from "types/schema";

export type CreateParentData = CreateResult<Pick<ParentSchema, "schoolMail">>;
export type CreateParentRequestBody = Omit<
  ParentSchema,
  "_id" | "schoolMail" | "password"
> & {
  password: string;
};
