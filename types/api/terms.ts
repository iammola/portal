import { CreateResult } from "types/api";
import { SessionRecord, TermRecord } from "types/schema";

export type CreateTermData = CreateResult;

export type CreateTermRequestBody = TermRecord;

export type GetCurrentTermData = Omit<TermRecord, "session"> & {
  session: Omit<SessionRecord<true>, "terms">;
};
