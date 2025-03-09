import { MongoClient } from "mongodb";
import { logger } from "@/lib/utils/logger";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  enableUtf8Validation: false, // Disable strict UTF-8 validation
  // Add monitoring
  monitorCommands: true,
  serverMonitoring: true,
} as const;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

async function createMongoClient() {
  const client = new MongoClient(uri, options);

  // Add command monitoring
  client.on("commandStarted", (event) => {
    logger.debug("MongoDB command started", {
      command: event.commandName,
      db: event.databaseName,
      requestId: event.requestId,
    });
  });

  client.on("commandSucceeded", (event) => {
    logger.debug("MongoDB command succeeded", {
      command: event.commandName,
      duration: event.duration,
      requestId: event.requestId,
    });
  });

  client.on("commandFailed", (event) => {
    logger.error("MongoDB command failed", {
      command: event.commandName,
      duration: event.duration,
      failure: event.failure,
      requestId: event.requestId,
    });
  });

  return client;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = await createMongoClient();
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = await createMongoClient();
  clientPromise = client.connect();
}

export default clientPromise;
