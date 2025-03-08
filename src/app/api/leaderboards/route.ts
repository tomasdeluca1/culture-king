import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Increase the Vercel function timeout (only works on certain plans)
export const maxDuration = 15; // 15 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "daily";

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

    // Add index hint and optimize the query
    const topScores = await collection
      .aggregate(
        [
          {
            $match: {
              date: { $gte: startDate },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "sub",
              as: "user",
            },
          },
          {
            $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $sort: { score: -1, timeTaken: 1 },
          },
          {
            $limit: 5, // Limit to top 5 scores
          },
          {
            $project: {
              _id: 0,
              userId: 1,
              name: 1,
              picture: 1,
              score: 1,
              correctAnswers: 1,
              timeTaken: 1,
              date: 1,
            },
          },
        ],
        {
          maxTimeMS: 5000, // Set a 5-second timeout for the query
          allowDiskUse: true, // Allow using disk for large sort operations
        }
      )
      .toArray();

    return NextResponse.json(topScores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
