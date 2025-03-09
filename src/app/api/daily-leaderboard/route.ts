import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getNextResetTime } from "@/lib/utils/time";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Get today's date range using the reset time
    const nextReset = getNextResetTime();
    const prevReset = new Date(nextReset);
    prevReset.setUTCDate(prevReset.getUTCDate() - 1);

    // Simplified query with index usage
    const topScores = await collection
      .find(
        {
          date: {
            $gte: prevReset,
            $lt: nextReset,
          },
        },
        {
          sort: { score: -1, timeTaken: 1 },
          limit: 10,
          projection: {
            _id: 0,
            userId: 1,
            name: 1,
            picture: 1,
            score: 1,
            correctAnswers: 1,
            timeTaken: 1,
          },
        }
      )
      .toArray();

    return NextResponse.json(topScores);
  } catch (error) {
    console.error("Error fetching daily leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily leaderboard" },
      { status: 500 }
    );
  }
}
