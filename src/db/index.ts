import mongoose from "mongoose";
import mongooseLeanGetters from "mongoose-lean-getters";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
const cached = global.mongoose ?? {};

mongoose.plugin(mongooseLeanGetters);
mongoose.plugin(mongooseLeanVirtuals);

/**
 * It connects to the database and returns the connection
 * @returns The connection to the database
 */
export async function connect(): Promise<typeof mongoose> {
  // Set the promise if the cache isn't defined
  cached.promise ??= mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  // Set the connection to the result of the promise if the cache isn't defined
  cached.conn ??= await cached.promise;

  // Store the cache in the global object
  global.mongoose = cached;

  return cached.conn;
}

declare const global: {
  mongoose: {
    conn?: typeof mongoose;
    promise?: Promise<typeof mongoose>;
  };
};

export { ModelNames } from "./constants";
