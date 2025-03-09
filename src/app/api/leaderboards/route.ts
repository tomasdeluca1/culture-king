import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    console.log("process.env.MONGODB_DATABASE", process.env.MONGODB_DATABASE);
  }
  const period = new URL(request.url).searchParams.get("period") || "daily";

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);
  if (process.env.NODE_ENV === "production") {
    console.log("db", db);
  }
  const collection = db.collection("daily_challenges");
  if (process.env.NODE_ENV === "production") {
    console.log("collection", collection);
  }
  // Calculate date ranges
  const now = new Date();
  const startDate = getStartDate(period, now);

  try {
    const topScores = await collection
      .find({ date: { $gte: startDate } })
      .sort({ score: -1, timeTaken: 1 })
      .limit(5)
      .project({
        _id: 0,
        userId: 1,
        name: 1,
        picture: 1,
        score: 1,
        correctAnswers: 1,
        timeTaken: 1,
        date: 1,
      })
      .toArray();

    if (process.env.NODE_ENV === "production") {
      console.log("Fetched top scores:", topScores);
    }

    return NextResponse.json(topScores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

function getStartDate(period: string, now: Date): Date {
  const startDate = new Date();
  switch (period) {
    case "daily":
      startDate.setHours(0, 0, 0, 0);
      break;
    case "monthly":
      startDate.setFullYear(now.getFullYear(), now.getMonth(), 1);
      break;
    case "yearly":
      startDate.setFullYear(now.getFullYear(), 0, 1);
      break;
    default:
      startDate.setHours(0, 0, 0, 0);
  }
  return startDate;
}
