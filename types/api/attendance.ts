import { CreateResult, UpdateResult } from "types/api";
import { AttendanceDate } from "types/schema";

export type CreateAttendanceData = CreateResult & UpdateResult;
export type CreateAttendanceRequestBody = AttendanceDate;
