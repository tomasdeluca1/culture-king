import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET(request: Request) {
  try {
    const period = new URL(request.url).searchParams.get("period") || "daily";

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Calculate date ranges
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case "daily":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "monthly":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "yearly":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate.setHours(0, 0, 0, 0);
    }

    // Simplified and optimized query
    const topScores = await collection
      .find(
        { date: { $gte: startDate } },
        {
          sort: { score: -1, timeTaken: 1 },
          limit: 5,
          projection: {
            _id: 0,
            userId: 1,
            name: 1,
            picture: 1,
            score: 1,
            correctAnswers: 1,
            timeTaken: 1,
            date: 1,
          },
        }
      )
      .toArray();

    return NextResponse.json(topScores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
