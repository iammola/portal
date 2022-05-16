import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

declare global {
  namespace API {
    export type UpdateData = Record<"success", boolean>;
    export type CreateData<O = unknown> = Schemas.DocumentId & O;
    export type DeleteData = {
      // TODO: Add a count property to return number of records deleted
      // TODO: count: number;
      success: boolean;
    };

    type ResponseCodes = Utils.FilterNumber<`${StatusCodes}`>;

    export type RouteResponse<D> = [Error, ResponseCodes] | [Response<D>, ResponseCodes];

    export type HandlerResponse<D> = Promise<[Omit<Response<D>, "success">, ResponseCodes]>;

    export type Handler<R extends object> = (
      req: NextApiRequest,
      res: NextApiResponse<Error | Response<R>>
    ) => Promise<Awaited<API.HandlerResponse<R>> | null>;

    type Data<S> = {
      success: S;
      message: `${ReasonPhrases}`;
    };

    export type Response<D> = {
      data: D;
    } & Data<true>;

    export type Error = {
      error: string | Record<string, string | undefined>;
    } & Data<false>;

    export type Result<D> = Error | Response<D>;
  }

  namespace API {
    namespace Auth {
      namespace POST {
        export type Body = {
          level: string;
          password: string;
          username: string;
          remember: boolean;
        };

        export type Data = {
          token: string;
          expires?: Date;
        };
      }
    }

    namespace Attendance {
      namespace POST {
        export type Body = Schemas.Attendance.Date;

        export type Data = CreateData & UpdateData;
      }
    }

    namespace Class {
      namespace POST {
        export type Data = CreateData<Pick<Schemas.Class.Record, "createdAt">>;

        export type Body = Pick<Schemas.Class.Record, "name"> & Record<"teachers", string[]>;
      }

      namespace PUT {
        namespace Teachers {
          export type Data = UpdateData;

          export type Body = Record<"teachers", string[]>;
        }
      }

      namespace GET {
        type ClassDataNoTeacher = Omit<Schemas.Class.Record<true>, "teachers">;

        export type Data<S extends keyof ClassDataNoTeacher = keyof ClassDataNoTeacher> = Pick<
          ClassDataNoTeacher,
          "_id" | S
        >;

        export type AllData<S extends keyof ClassDataNoTeacher = keyof ClassDataNoTeacher> = {
          page?: number;
          pages: number;
          classes: Array<Data<S>>;
        };

        namespace Students {
          export type Data = {
            page?: number;
            pages: number;
            students: Schemas.Student.Schema[];
          };

          export type Count = Record<"count", number>;
        }

        export type Subjects = Record<"subjects", Array<Schemas.Subject.Record<true>>>;

        export type Teachers = Record<"teachers", Schemas.Teacher.Schema[]>;
      }

      namespace DELETE {
        export type Teachers = DeleteData & Record<"message", string>;
      }
    }

    namespace Subject {
      namespace DELETE {
        export type Data = DeleteData;
      }

      namespace PUT {
        export type Data = UpdateData;

        export type Body = SubjectKeys<BaseBody | GroupBody>;

        type K = "__type";
        type SubjectKeys<T extends BaseBody | GroupBody> = Utils.OneKey<Omit<T, K>> & Pick<T, K>;
      }

      namespace POST {
        export type Data = CreateData;

        export type Body = GroupBody | BaseBody;
      }

      type BaseBody = {
        teachers: string[];
      } & Omit<Schemas.Subject.BaseSchema, "_id" | "teachers">;

      type GroupBody = {
        divisions: Array<Pick<Schemas.Subject.BaseSchema, "_id" | "name"> & Record<"teachers", string[]>>;
      } & Omit<Schemas.Subject.GroupSchema, "_id" | "divisions">;
    }

    namespace Session {
      namespace POST {
        export type Data = CreateData;

        export type Body = Omit<Schemas.Session.Record<true>, "terms">;
      }

      namespace GET {
        export type AllData = Data[];

        export type Data = Schemas.Session.Record;

        export type Terms = Pick<Schemas.Session.Record<true>, "_id" | "terms">;
      }
    }

    namespace Term {
      namespace POST {
        export type Data = CreateData;

        export type Body = Schemas.Term.Record;
      }

      namespace GET {
        export type AllData = Array<Omit<Schemas.Term.Record, "session">>;

        export type Data = {
          session: Omit<Schemas.Session.Record<true>, "terms">;
        } & Omit<Schemas.Term.Record, "session">;
      }
    }

    namespace Parent {
      namespace POST {
        export type Data = CreateData<Pick<Schemas.Parent.Schema, "schoolMail">>;

        export type Body = {
          password: string;
        } & Omit<Schemas.Parent.Schema, "_id" | "schoolMail" | "password">;
      }
    }

    namespace Teacher {
      namespace POST {
        export type Data = CreateData<Pick<Schemas.Teacher.Schema, "schoolMail">>;

        export type Body = {
          password: string;
        } & Omit<Schemas.Teacher.Schema, "_id" | "schoolMail" | "password">;
      }
    }

    namespace Student {
      namespace POST {
        export type Data = CreateData<Pick<Schemas.Student.Schema, "schoolMail">>;

        export type Body = {
          password: string;
          guardians: Array<Record<"mail" | "relation", string>>;
          academic: Array<{ subjects: string[] } & Record<"term" | "class", string>>;
        } & Required<Pick<Schemas.Student.Schema, "dob" | "gender" | "images" | "name" | "contact">>;
      }
    }
  }
}
