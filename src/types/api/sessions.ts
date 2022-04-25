import { CreateResult } from "types/api";

export type CreateSessionData = CreateResult;

export type CreateSessionRequestBody = Omit<Schemas.Session.Record<true>, "terms">;

export type GetSessionsData = GetSessionData[];

export type GetSessionData = Schemas.Session.Record;

export type GetSessionTermsData = Pick<Schemas.Session.Record<true>, "_id" | "terms">;
