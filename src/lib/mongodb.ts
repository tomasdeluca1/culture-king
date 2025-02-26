/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

const cached = (global as any).mongoose;

if (!cached) {
  (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
