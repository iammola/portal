import { CreateResult } from "types/api";

export type CreateParentData = CreateResult<Pick<Schemas.Parent.Schema, "schoolMail">>;

export interface CreateParentRequestBody extends Omit<Schemas.Parent.Schema, "_id" | "schoolMail" | "password"> {
  password: string;
}
