import type { ParentSchema } from "types/schema";

export type CreateParentData = Pick<ParentSchema, "_id" | "schoolMail">;
export type CreateParentRequestBody = Omit<ParentSchema, "password"> & {
  password: string;
};
