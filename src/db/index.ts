import mongoose from "mongoose";
import mongooseLeanGetters from "mongoose-lean-getters";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
// Global is used here to maintain a cached connection across hot reloads in development. This prevents connections growing exponentially during API Route usage.
const cached = global.mongoose ?? {};

mongoose.plugin(mongooseLeanGetters);
mongoose.plugin(mongooseLeanVirtuals);

/**
 * It connects to the database and returns a promise that resolves to the mongoose connection object
 * @returns The mongoose object
 */
export async function connect(): Promise<typeof mongoose> {
  if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

  cached.promise ??= mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptionsExt);

  return (cached.conn ??= await cached.promise);
}

type ConnectOptionsExt = {
  /** False by default. If `true`, this connection will use `createIndex()` instead of `ensureIndex()` for automatic index builds via `Model.init()`. */
  useCreateIndex?: boolean;
  /** false by default. Set to `true` to make all connections set the `useNewUrlParser` option by default */
  useNewUrlParser?: boolean;
  /** false by default. Set to `true` to make all connections set the `useUnifiedTopology` option by default */
  useUnifiedTopology?: boolean;
} & mongoose.ConnectOptions;

declare const global: {
  mongoose: {
    conn: typeof mongoose;
    promise: Promise<typeof mongoose>;
  };
};

export { ModelNames } from "./constants";
