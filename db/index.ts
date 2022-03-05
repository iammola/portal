import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
// Global is used here to maintain a cached connection across hot reloads in development. This prevents connections growing exponentially during API Route usage.
const cached = global.mongoose ?? {};

export async function connect(): Promise<typeof mongoose> {
  if (!MONGODB_URI)
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

  cached.promise ??= mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptionsExt);

  return (cached.conn ??= await cached.promise);
}

export enum ModelNames {
  AUTH = "Auth",
  TERM = "Term",
  CLASS = "Class",
  PARENT = "Parent",
  B_SUBJECT = "base",
  STUDENT = "Student",
  TEACHER = "Teacher",
  SUBJECT = "Subject",
  G_SUBJECT = "group",
  SESSION = "Session",
}

interface ConnectOptionsExt extends mongoose.ConnectOptions {
  /** False by default. If `true`, this connection will use `createIndex()` instead of `ensureIndex()` for automatic index builds via `Model.init()`. */
  useCreateIndex?: boolean;
  /** false by default. Set to `true` to make all connections set the `useNewUrlParser` option by default */
  useNewUrlParser?: boolean;
  /** false by default. Set to `true` to make all connections set the `useUnifiedTopology` option by default */
  useUnifiedTopology?: boolean;
}

declare const global: {
  mongoose: {
    conn: typeof mongoose;
    promise: Promise<typeof mongoose>;
  };
};
