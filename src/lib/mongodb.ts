import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
  retryWrites: true,
  retryReads: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Add this function to create indexes
async function createIndexes(client: MongoClient) {
  const db = client.db(process.env.MONGODB_DATABASE);
  const collection = db.collection("daily_challenges");

  await Promise.all([
    // Index for daily challenges and leaderboards
    collection.createIndex({ date: -1, score: -1, timeTaken: 1 }),
    // Index for user attempts
    collection.createIndex({ userId: 1, date: -1 }),
    // Index for stats queries
    collection.createIndex({ userId: 1 }),
  ]);
}

// Call it after connecting
if (process.env.NODE_ENV !== "production") {
  clientPromise.then((client) => createIndexes(client));
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
