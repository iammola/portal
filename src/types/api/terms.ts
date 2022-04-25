import { CreateResult } from "types/api";

export type GetTermsData = Array<Omit<Schemas.Term.Record, "session">>;

export type CreateTermData = CreateResult;

export type CreateTermRequestBody = Schemas.Term.Record;

export interface GetTermData extends Omit<Schemas.Term.Record, "session"> {
  session: Omit<Schemas.Session.Record<true>, "terms">;
}
