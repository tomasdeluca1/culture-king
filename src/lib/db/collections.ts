import clientPromise from "@/lib/mongodb";

export async function getCollection(
  collectionName: string = "daily_challenges"
) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);
  return db.collection(collectionName, {
    enableUtf8Validation: false,
  });
}
