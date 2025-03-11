import { NextResponse } from "next/server";
import { getCurrentResetTime, getNextResetTime } from "@/lib/utils/time";
import { getCollection } from "@/lib/db/collections";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic"; // Disable caching
export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  try {
    const collection = await getCollection();

    // Get today's date range using UTC reset time
    const today = getCurrentResetTime();
    const tomorrow = getNextResetTime();

    logger.debug("Fetching daily leaderboard", {
      today: today.toISOString(),
      tomorrow: tomorrow.toISOString(),
    });

    // Query for today's entries only
    const topScores = await collection
      .find({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
      })
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

    logger.debug("Daily leaderboard fetched", {
      entriesCount: topScores.length,
      firstEntry: topScores[0]?.date,
      lastEntry: topScores[topScores.length - 1]?.date,
    });

    return NextResponse.json(topScores);
  } catch (error) {
    logger.error("Error fetching daily leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily leaderboard" },
      { status: 500 }
    );
  }
}
