import { CreateResult, UpdateResult } from "types/api";

export type CreateAttendanceData = CreateResult & UpdateResult;

export type CreateAttendanceRequestBody = Schemas.Attendance.Date;
