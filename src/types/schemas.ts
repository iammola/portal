import type * as Mongoose from "mongoose";
import type { Day } from "date-fns";
import type { ModelNames } from "db/constants";

declare global {
  namespace Schemas {
    type ObjectId = Mongoose.Types.ObjectId;
    type DocumentId = {
      /** The unique identifier for the document. */
      _id: ObjectId;
    };

    type AQuery<R> = Mongoose.Aggregate<R[]>;
    type SQuery<S, R = S, M = unknown, V = unknown> = Mongoose.Query<
      S extends Array<infer A> ? Array<Mongoose.HydratedDocument<A, M, V>> : Mongoose.HydratedDocument<S, M, V> | null,
      Mongoose.HydratedDocument<S, M, V>,
      unknown,
      R
    >;

    type ModelRecord<S, V = unknown, K extends boolean | keyof V = false> = S &
      (K extends true ? V : Utils.FlattenIntersection<K extends keyof V ? Pick<V, K> : unknown>);

    // Todo: Get a better neame than "Thing" for this type. Meant to group classes or subjects or terms or sessions
    type ThingName = {
      /** The long name of the thing. */
      long: string;
      /** The short name of the thing. */
      short: string;
      /** This is a special name for the thing. It's optional. */
      special?: string;
    };
  }

  namespace Schemas {
    namespace Attendance {
      type Schema = {
        /** The id of the user who is being tracked. */
        userId: ObjectId;
        /** An array of dates that the user has attended. */
        dates: Date[];
      } & DocumentId;

      type Date = {
        /** The time the employee came in. */
        readonly in: Date;
        /** The time the employee left the office. */
        readonly out: Date;
        /** This is the state of the attendance. It can be either */
        readonly state: "present" | "late";
      };

      type Record = ModelRecord<Schema>;

      type Model = {
        /** Find one user's attendance records by userId */
        findUser(
          userId: string,
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema>;
        /** Find multiple users attendance records by userId */
        findUser(
          userId: string[],
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema[], Schema>;
        /**
         * Filter a range of dates for specific users
         *
         * @param userId User to find attendance record for
         * @param query The conditions to filter the attendance with
         */
        findUserRange(userId: string | string[], query: Mongoose.QuerySelector<Date>): AQuery<Pick<Schema, "dates">>;
      } & Mongoose.Model<Schema>;
    }

    namespace Class {
      type Schema = {
        /** The order of the class in the list of classes. */
        order: number;
        /** The name of the class. */
        name: ThingName;
        /** The date the class was created. */
        createdAt: Date;
        /** An array of ObjectIds that reference the teachers that are teaching this class. */
        teachers: ObjectId[];
      } & DocumentId;

      type Virtuals = {
        /** The number of subjects in the class. */
        subjectsCount: number;
      };

      type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type PopulatedTeachers = { teachers: Staff.TeacherSchema[] };

      type Model = {
        /** Find a class by any of it's long, short or special names */
        findByName(
          name: string,
          type: keyof ThingName,
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema, Schema, unknown, Virtuals>;
        /**
         * Get all the teachers linked to the class
         *
         * @param classId Class ID to get for
         * @param teacherProjection Select Teacher fields to return
         * @param options {@link Mongoose.QueryOptions}
         */
        getTeachers(
          classId: string,
          teacherProjection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<PopulatedTeachers, PopulatedTeachers, unknown, Virtuals>;
      } & Mongoose.Model<Schema, unknown, unknown, Virtuals>;
    }

    namespace Subject {
      type Subject = {
        /** The class that the subject belongs to. */
        class: ObjectId;
        /** The order in which the subject is taught. */
        order: number;
        /** If the subject is mandatory or not. */
        mandatory?: boolean;
      };

      type Schema<T extends ModelNames.B_SUBJECT | ModelNames.G_SUBJECT> = DocumentId & {
        /** The type of the subject */
        __type: T;
        /** The name of the subject. */
        name: ThingName;
      } & Subject;

      type BaseSchema = {
        /** An array of ObjectIds that reference the teachers that are teaching this subject. */
        teachers: ObjectId[];
      } & Schema<ModelNames.B_SUBJECT>;

      type BaseVirtuals = {
        /** The number of teachers teaching the subject. */
        teachersCount: number;
      };

      type DivisionSchema = Pick<BaseSchema, "_id" | "name" | "teachers">;

      type GroupSchema = {
        /** An array of subject divisions. */
        divisions: DivisionSchema[];
      } & Schema<ModelNames.G_SUBJECT>;

      type GroupVirtuals = {
        /** The number of divisions in the subject. */
        divisionsCount: number;
      };

      type Model = Mongoose.Model<BaseSchema | GroupSchema>;
      type Record<V extends boolean = false> = ModelRecord<
        BaseRecord<V> | GroupRecord<V>,
        Partial<BaseVirtuals & GroupVirtuals>,
        V
      >;

      type BaseModel = Mongoose.Model<BaseSchema>;
      type BaseRecord<V extends boolean | keyof BaseVirtuals = false> = ModelRecord<BaseSchema, BaseVirtuals, V>;

      type GroupModel = Mongoose.Model<GroupSchema>;
      type GroupRecord<V extends boolean | keyof GroupVirtuals = false> = ModelRecord<GroupSchema, GroupVirtuals, V>;
    }

    namespace Session {
      type Schema = {
        /** The name of the session. */
        name: ThingName;
      } & DocumentId;

      type Virtuals = {
        /** The number of terms in the session. */
        termsCount: number;
        /** The terms in the session. */
        terms: Array<Omit<Term.Schema, "session">>;
      };

      type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type Model = {
        /** It's a static method that finds the session with the current term. */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): Promise<Schema | null>;
      } & Mongoose.Model<Schema, unknown, unknown, Virtuals>;
    }

    namespace Term {
      type Schema = {
        /** The name of the term. */
        name: ThingName;
        /** The session that the term is in. */
        session: ObjectId;
        /** The end date of the term. */
        end: Date;
        /** The start date of the term. */
        start: Date;
      } & DocumentId;

      type Virtuals = {
        /** A boolean that indicates whether the term is the current term. */
        current: boolean;
      };

      type Record<V extends boolean | keyof Virtuals = false> = ModelRecord<Schema, Virtuals, V>;

      type Model = {
        /** It's a static method that finds the current term. */
        findCurrent(
          projection?: Mongoose.ProjectionType<Schema> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<Schema>;
      } & Mongoose.Model<Schema>;
    }

    namespace User {
      type Level = TopLevel | SubLevel;

      type TopLevel = "student" | "parent" | "staff";
      type SubLevel = `staff-${Schemas.Staff.Record["__type"]}`;

      type Name = {
        /** The title of the user, e.g. "Mr." */
        title?: string;
        /** The other name of the user. */
        other?: string;
        /** The user's initials */
        initials: string;
        /** The last name of the user. */
        last: string;
        /** The full name of the user. */
        full: string;
        /** The first name of the user. */
        first: string;
      };

      type Password = {
        /** The hashed password. */
        hash: string;
        /** A random string of characters that is used to "salt" the password. */
        salt: string;
      };

      type Images = {
        /** The cover image of the user. */
        cover?: string;
        /** The URL of the user's avatar. */
        avatar?: string;
      };

      type SubContact = {
        /** The primary contact for the user. */
        primary: string;
        /** This is an optional property. */
        other?: string;
      };

      type Contact = {
        /** The user's email contacts */
        email: SubContact;
        /** The user's phone contacts */
        phone?: Partial<SubContact>;
        /** The user's address contacts */
        address?: Partial<SubContact>;
      };

      type Gender = "M" | "F";

      type Base = {
        /** The user's Ddate of birth */
        dob?: Date;
        /** The user's names */
        name: Name;
        /** The user's profile picture and cover photo. */
        images?: Images;
        /** The user's gender */
        gender: Gender;
        /** The user's contact */
        contact: Contact;
        /** The username of the user. */
        readonly username: string;
        /** The user's school email address */
        readonly schoolMail: string;
      } & DocumentId;

      type Virtuals = {
        /** The user's password hash and salt */
        password: Password;
      };

      type StaticMethods<S> = {
        /** Find a user by username */
        findByUsername(
          username: string,
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S, S, unknown, Virtuals>;
        /** Find all users by username */
        findByUsername(
          username: string[],
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S[], S, unknown, Virtuals>;
        /** Find a user by school mail */
        findBySchoolMail(
          mail: string,
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S, S, unknown, Virtuals>;
        /** Find all users by schoolMail */
        findBySchoolMail(
          mail: string[],
          projection?: Mongoose.ProjectionType<S> | null,
          options?: Mongoose.QueryOptions
        ): SQuery<S[], S, unknown, Virtuals>;
      };
    }

    namespace Student {
      type Guardian = {
        /** The Guardian's ID. */
        guardian: ObjectId;
        /** The relation of the guardian to the student */
        relation: "father" | "mother" | "other";
      };

      type Academic = {
        /** The term for which the student is enrolled in the class. */
        term: ObjectId;
        /** The primary class the student is in the term */
        class: ObjectId;
        /** An array of ObjectIds of the subjects that the student is taking in the term. */
        subjects: ObjectId[];
      };

      type Schema = {
        /** This is an array of objects that contain the student's academic information. */
        academic: Academic[];
        /** This is an array of objects that contain the guardian's information. */
        guardians: Guardian[];
      } & User.Base;

      type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      type Model = Mongoose.Model<Schema, unknown, unknown, User.Virtuals> & User.StaticMethods<Schema>;
    }

    namespace Staff {
      /**
       * ### All Privileges
       * - `a` - Access to all settings and other privileges
       *
       * ### User Privileges
       * - `u` - Create, Modify and Delete all types of users
       * - `u.sta` - Create, Modify and Delete all Staff
       * - `u.stu` - Create, Modify and Delete all Students
       *
       * ### Structure Privileges
       * This applies to classes, subjects, sessions, terms, calendar events and timetables
       *
       * - `s` - Create, Modify and Delete all types of structures
       * - `s.cls` - Create, Modify and Delete classes and subjects
       * - `s.sts` - Create, Modify and Delete sessions and terms
       * - `s.cet` - Create, Modify and Delete calendar events and timetables (Class Teacher can still add timetables for their class)
       */
      type Privilege = "a" | "u" | "u.sta" | "u.stu" | "s" | "s.cls" | "s.sts" | "s.cet";
      type Base = User.Base;

      type Schema<T> = {
        /** The type of Staff */
        __type: T;
        /** This is an array of privileges that the staff has. */
        privileges: Privilege[];
      } & Base;

      type TeacherSchema = Schema<ModelNames.T_STAFF>;

      type Model = Mongoose.Model<TeacherSchema> & StaticMethods & User.StaticMethods<TeacherSchema>;
      type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<TeacherRecord, User.Virtuals, V>;

      type TeacherModel = Mongoose.Model<TeacherSchema> & StaticMethods & User.StaticMethods<TeacherSchema>;
      type TeacherRecord = ModelRecord<TeacherSchema>;

      type StaticMethods = {
        /** Check if a Staff has all the privileges specified */
        hasPrivileges(staffId: string | ObjectId, privileges: [Privilege, ...Privilege[]]): Promise<boolean>;
      };
    }

    namespace Parent {
      type Schema = {
        /** The parent's occupation. */
        occupation: string;
      } & User.Base;

      type Record<V extends boolean | keyof User.Virtuals = false> = ModelRecord<Schema, User.Virtuals, V>;

      type Model = Mongoose.Model<Schema, unknown, unknown, User.Virtuals> & User.StaticMethods<Schema>;
    }

    namespace Result {
      type Score = {
        /** The score of the student for the field. */
        score: number;
        /** The id of the field that the score is for on the result */
        fieldId: ObjectId;
      };

      type Scores = {
        /** An array of scores. */
        data?: Score[];
        /** The subject that the scores are for. */
        subject: ObjectId;
        /**
         * The total score that will be used for the subject. If this is
         * not provided, the total score will be calculated by adding all the scores in the data array.
         */
        forcedTotal?: number;
      };

      type Schema = {
        /** The term that the student is taking the course in. */
        term: ObjectId;
        /** This is an array of objects that contains the scores of the student for each subject. */
        scores: Scores[];
        /** The Student's ID. */
        studentId: ObjectId;
      } & DocumentId;

      type Record = ModelRecord<Schema>;

      type Model = Mongoose.Model<Schema>;
    }

    namespace Settings {
      type SchoolTime = {
        /** The days the time is specified for */
        days: Day[];
        /** The chosen time */
        value: Date;
      };

      type PeriodDurations = {
        /** The minimum duration of the period in minutes. */
        min: number;
        /** The maximum number of minutes that a period can last. */
        max: number;
      };

      type Schema = {
        /** A boolean that locks the system */
        locked: boolean;
        /** An array of days that are considered school days. */
        activeSchoolDays: Day[];
        /** The start and end times of a school day. */
        activeSchoolTime: {
          start: SchoolTime[];
          end: SchoolTime[];
        };
        /** This is an object that contains the duration of each period */
        periodDurations: {
          [K in Schemas.Calendar.TimetablePeriod["_type"]]: PeriodDurations;
        };
      } & DocumentId;

      type Record = ModelRecord<Schema>;

      type Model = Mongoose.Model<Schema>;
    }

    namespace Calendar {
      type Schema<T> = DocumentId & {
        /** The type of Calendar entry */
        __type: T;
      };

      type Model = Mongoose.Model<EventSchema | TimetableSchema>;
      type Record = ModelRecord<EventSchema | TimetableSchema>;

      type EventSchema = Schema<ModelNames.E_CALENDAR> & {
        /** The title of the event */
        title: string;
        /** The start time of the event */
        start: Date;
        /** The end time of the event. */
        ends: Date;
        /** This is an object that contains the invitees for the event. */
        invitees?: {
          staff?: ObjectId[];
          parents?: ObjectId[];
          students?: ObjectId[];
        };
      };

      type EventModel = Mongoose.Model<EventSchema>;

      type EventRecord = ModelRecord<EventSchema>;

      type TimetablePeriod = {
        /** The end time of the period */
        end: Date;
        /** The start time of the period */
        start: Date;
      } & (
        | {
            /** This is the type of the period. */
            _type: "subject";
            /** The subject that is being taught during this period. */
            subject: ObjectId;
            /** The teacher who is teaching the subject. */
            teacher: ObjectId;
          }
        | {
            /** This is the type of the period. */
            _type: "idle";
            /** The title of the idle period. */
            title: string;
            /** A description of the idle period. */
            description?: string;
          }
      );

      type TimetableDay = {
        /** The day of the week. */
        day: Day;
        /** An array of periods. */
        periods: TimetablePeriod[];
      };

      type TimetableSchema = Schema<ModelNames.T_CALENDAR> & {
        /** The term that this timetable entry is for. */
        term: ObjectId;
        /** The class that this timetable entry is for. */
        class: ObjectId;
        /** The weeks that this timetable entry is valid for. */
        weeks: [number, ...number[]];
        /** An array of days, each day is an array of lessons. */
        days: TimetableDay[];
      };

      type TimetableModel = Mongoose.Model<TimetableSchema>;

      type TimetableRecord = ModelRecord<TimetableSchema>;
    }
  }
}
