import { NextResponse } from "next/server";

import { getNextResetTime } from "@/lib/utils/time";
import { logger } from "@/lib/utils/logger";
import { getCollection } from "@/lib/db/collections";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET(request: Request) {
  try {
    const period = new URL(request.url).searchParams.get("period") || "daily";
    const collection = await getCollection();

    // Calculate date ranges
    const now = new Date();
    const nextReset = getNextResetTime();
    let startDate: Date;

    switch (period) {
      case "monthly":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "yearly":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "daily":
      default:
        startDate = new Date(nextReset);
        startDate.setDate(startDate.getDate() - 1);
    }

    logger.debug("Fetching leaderboard", {
      period,
      startDate,
      nextReset,
    });

    // Use aggregation for cumulative scores
    const leaderboard = await collection
      .aggregate([
        {
          $match: {
            date: {
              $gte: startDate,
              $lt: nextReset,
            },
          },
        },
        {
          $group: {
            _id: "$userId",
            name: { $first: "$name" },
            picture: { $first: "$picture" },
            totalScore: { $sum: "$score" },
            totalCorrectAnswers: { $sum: "$correctAnswers" },
            averageTime: { $avg: "$timeTaken" },
            gamesPlayed: { $sum: 1 },
            lastPlayed: { $max: "$date" },
          },
        },
        {
          $sort: {
            totalScore: -1,
            averageTime: 1,
          },
        },
        {
          $limit: 10,
        },
      ])
      .toArray();

    logger.debug("Leaderboard fetched", {
      entriesCount: leaderboard.length,
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    logger.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
