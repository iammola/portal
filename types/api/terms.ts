import { CreateResult } from "types/api";
import { SessionRecord, TermRecord } from "types/schema";

export type GetTermsData = Array<Omit<TermRecord, "session">>;

export type CreateTermData = CreateResult;

export type CreateTermRequestBody = TermRecord;

export interface GetTermData extends Omit<TermRecord, "session"> {
  session: Omit<SessionRecord<true>, "terms">;
};
