import { CreateResult } from "types/api";
import { SessionRecord } from "types/schema";

export type CreateSessionData = CreateResult;

export type CreateSessionRequestBody = Omit<SessionRecord<true>, "terms">;

export type GetSessionData = SessionRecord;
