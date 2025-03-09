/* eslint-disable no-var */
import { MongoClient, MongoClientOptions } from "mongodb";
import { logger } from "@/lib/utils/logger";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  enableUtf8Validation: false,
} as const;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

async function createMongoClient() {
  const client = new MongoClient(uri, options);

  // Create indexes on first connection
  try {
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    await Promise.all([
      // Index for date-based queries
      collection.createIndex({ date: -1 }),
      // Index for leaderboard queries
      collection.createIndex({ date: -1, score: -1, timeTaken: 1 }),
      // Index for user queries
      collection.createIndex({ userId: 1, date: -1 }),
      // Index for stats queries
      collection.createIndex({ userId: 1 }),
    ]);
  } catch (error) {
    logger.error("Failed to create indexes", error);
  }

  // Add command monitoring only in development
  if (process.env.NODE_ENV === "development") {
    client.on("commandStarted", (event) => {
      logger.debug("MongoDB command started", {
        command: event.commandName,
        db: event.databaseName,
      });
    });

    client.on("commandSucceeded", (event) => {
      logger.debug("MongoDB command succeeded", {
        command: event.commandName,
        duration: event.duration,
      });
    });

    client.on("commandFailed", (error) => {
      logger.error("MongoDB command failed", error);
    });
  }

  return client;
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = await createMongoClient();
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = await createMongoClient();
  clientPromise = client.connect();
}

export default clientPromise;
