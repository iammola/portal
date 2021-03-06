import type { NextApiRequest, NextApiResponse } from "next";
import type { StatusCodes, ReasonPhrases } from "http-status-codes";

declare global {
  namespace API {
    type METHOD = "GET" | "POST" | "PUT" | "DELETE" | "SEARCH";

    type UpdateData = Record<"success", boolean>;
    type CreateData<O = unknown> = Schemas.DocumentId & O;
    type DeleteData = {
      count: number;
      success: boolean;
    };

    type ResponseCodes = Utils.FilterNumber<`${StatusCodes}`>;

    type RouteResponse<D> = [Error, ResponseCodes] | [Response<D>, ResponseCodes];

    type HandlerResponse<D> = Promise<[Omit<Response<D>, "success">, ResponseCodes]>;

    type Handler<R extends object> = (
      req: Omit<NextApiRequest, "body"> & { method?: METHOD; body: Record<string, unknown> },
      res: NextApiResponse<Error | Response<R>>
    ) => Promise<Awaited<API.HandlerResponse<R>> | null>;

    type Data<S> = {
      success: S;
      message: `${ReasonPhrases}`;
    };

    type Response<D> = {
      data: D;
    } & Data<true>;

    type Error = {
      error: string | Record<string, string | undefined>;
    } & Data<false>;

    type Result<D> = Error | Response<D>;
  }

  namespace API {
    namespace Auth {
      namespace POST {
        type Body = {
          password: string;
          username: string;
          remember: boolean;
          level: Schemas.User.TopLevel;
        };

        type Data = {
          token: string;
          expires?: Date;
        };
      }
    }

    namespace Class {
      namespace POST {
        type Data = CreateData<Pick<Schemas.Class.Record, "createdAt">>;

        type Body = Pick<Schemas.Class.Record, "name"> & Record<"teachers", string[]>;

        namespace Subjects {
          type Data = CreateData;

          type Body = GroupBody | BaseBody;

          type BaseBody = {
            teachers: string[];
          } & Pick<Schemas.Subject.BaseSchema, "name" | "__type" | "mandatory">;

          type GroupBody = {
            divisions: Array<{ teachers: string[]; name: Schemas.Subject.DivisionSchema["name"] }>;
          } & Pick<Schemas.Subject.GroupSchema, "name" | "__type" | "mandatory">;
        }
      }

      namespace GET {
        type ClassDataNoTeacher = Omit<Schemas.Class.Record<true>, "teachers">;

        type Data<S extends keyof ClassDataNoTeacher = keyof ClassDataNoTeacher> = Pick<ClassDataNoTeacher, "_id" | S>;

        type AllData<S extends keyof ClassDataNoTeacher = keyof ClassDataNoTeacher> = Array<Data<S>>;

        namespace Students {
          type Data = Schemas.Student.Schema[];

          type Count = Record<"count", number>;
        }

        type Subjects = Array<Schemas.Subject.Record<true>>;

        type Teachers = Record<"teachers", Schemas.Staff.TeacherSchema[]>;
      }
    }

    namespace Session {
      namespace POST {
        namespace Terms {
          type Data = CreateData;

          type Body = {
            session?: Pick<Schemas.Session.Record, "name">;
          } & Omit<Schemas.Term.Record, "_id" | "session">;
        }
      }

      namespace GET {
        type AllData = {
          current: Schemas.DocumentId | null;
          data: Array<Omit<Data, "current">>;
        };

        type Data = {
          current: boolean;
        } & Schemas.Session.Record<"termsCount">;

        type Terms = Pick<Schemas.Session.Record<true>, "_id" | "terms">;
      }
    }

    namespace Term {
      namespace GET {
        type AllData = {
          current: Schemas.DocumentId | null;
          data: Array<{
            session: Pick<Schemas.Session.Record, "name">;
            terms: Array<Omit<Schemas.Term.Record, "session">>;
          }>;
        };

        type Data = {
          current: boolean;
          session: Pick<Schemas.Session.Record, "name">;
        } & Omit<Schemas.Term.Record, "session">;
      }
    }

    namespace Staff {
      namespace POST {
        type Data = CreateData<Pick<Schemas.Staff.Record, "schoolMail">>;

        type Body = {
          gender: string;
          password: string;
          classes?: string[];
        } & Omit<Schemas.Staff.Record, "_id" | "schoolMail" | "password" | "gender">;
      }
    }

    namespace Teacher {
      namespace GET {
        type Students = Array<
          {
            age?: string;
            name: string;
            class?: string;
            avatar?: string;
            initials: string;
          } & Pick<Schemas.Student.Record, "_id" | "gender" | "username" | "schoolMail">
        >;

        type Data = Schemas.Staff.TeacherSchema;

        type AllData = Data[];
      }
    }

    namespace Student {
      namespace POST {
        type Data = CreateData<Pick<Schemas.Student.Schema, "schoolMail">>;

        type Body = {
          dob: Date;
          gender: string;
          username: string;
          password: string;
          guardians: Array<Record<"guardian" | "relation", string>>;
          academic: Array<{ subjects: string[] } & Record<"term" | "class", string>>;
        } & Required<Pick<Schemas.Student.Schema, "images" | "name" | "contact">>;
      }

      namespace DELETE {
        type Data = DeleteData;
      }
    }

    namespace User {
      namespace GET {
        type Data = {
          _id: Schemas.ObjectId;
          level: string;
          name: string;
          avatar?: string;
          initials: string;
        };
      }
    }

    namespace Event {
      namespace POST {
        type Data = CreateData;

        type Invitee = "all" | string[];
        type Body = {
          invitees?:
            | Invitee
            | Partial<{
                parents: Invitee;
                classes: Invitee;
                students: Invitee;
                staff: Invitee | Partial<{ teachers: Invitee /* Other Staff Types */ }>;
              }>;
        } & Omit<Schemas.Calendar.EventSchema, "invitees" | "__type" | "_id">;
      }

      namespace GET {
        type AllData = Array<Pick<Schemas.Calendar.EventSchema, "_id" | "title" | "ends" | "start">>;
      }
    }

    namespace Timetable {
      namespace POST {
        type Data = CreateData;

        type Body = {
          week: number;
        } & Omit<Schemas.Calendar.TimetableSchema, "_id" | "__type" | "weeks">;
      }

      namespace GET {
        type PopulatedPeriod = {
          class?: Pick<Schemas.Class.Schema, "_id" | "name">;
        } & Pick<Schemas.Calendar.TimetablePeriod, "end" | "start"> &
          (
            | {
                _type: "subject";
                subject: { _id: Schemas.ObjectId; name: string };
                teacher: { _id: Schemas.ObjectId; avatar?: string } & Record<"username" | "initials" | "name", string>;
              }
            | {
                _type: "idle";
                title: string;
                description?: string;
              }
          );

        type Data = {
          week: number;
          term: Schemas.ObjectId;
          class?: Schemas.ObjectId;
          days: Array<Pick<Schemas.Calendar.TimetableDay, "day"> & Record<"periods", PopulatedPeriod[]>>;
        };
      }
    }
  }
}
