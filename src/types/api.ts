import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

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
          level: string;
          password: string;
          username: string;
          remember: boolean;
        };

        type Data = {
          token: string;
          expires?: Date;
          level: string;
          _id: Schemas.ObjectId;
        };
      }
    }

    namespace Attendance {
      namespace POST {
        type Body = Schemas.Attendance.Date;

        type Data = CreateData & UpdateData;
      }
    }

    namespace Class {
      namespace POST {
        type Data = CreateData<Pick<Schemas.Class.Record, "createdAt">>;

        type Body = Pick<Schemas.Class.Record, "name"> & Record<"teachers", string[]>;
      }

      namespace PUT {
        namespace Teachers {
          type Data = UpdateData;

          type Body = Record<"teachers", string[]>;
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

      namespace DELETE {
        type Teachers = DeleteData & Record<"message", string>;
      }
    }

    namespace Subject {
      namespace DELETE {
        type Data = DeleteData;
      }

      namespace PUT {
        type Data = UpdateData;

        type Body = SubjectKeys<BaseBody | GroupBody>;

        type K = "__type";
        type SubjectKeys<T extends BaseBody | GroupBody> = Utils.OneKey<Omit<T, K>> & Pick<T, K>;
      }

      namespace POST {
        type Data = CreateData;

        type Body = GroupBody | BaseBody;
      }

      type BaseBody = {
        class: string;
        teachers: string[];
      } & Omit<Schemas.Subject.BaseSchema, "_id" | "class" | "order" | "teachers">;

      type GroupBody = {
        class: string;
        divisions: Array<{ teachers: string[]; name: Schemas.Subject.DivisionSchema["name"] }>;
      } & Omit<Schemas.Subject.GroupSchema, "_id" | "class" | "divisions" | "order">;
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

    namespace Parent {
      namespace POST {
        type Data = CreateData<Pick<Schemas.Parent.Schema, "schoolMail">>;

        type Body = {
          password: string;
        } & Omit<Schemas.Parent.Schema, "_id" | "schoolMail" | "password">;
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
          Pick<Schemas.Student.Record, "_id" | "gender" | "username" | "schoolMail"> & {
            age?: string;
            name: string;
            class?: string;
            avatar?: string;
            initials: string;
          }
        >;
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
          level: string;
          images?: Pick<NonNullable<Schemas.User.Base["images"]>, "avatar">;
          name: Pick<Schemas.User.Base["name"], "full" | "initials">;
        };
      }
    }
  }
}
