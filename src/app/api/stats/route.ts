import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { logger } from "@/lib/utils/logger";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);
    const lastActive = new Date(now.setDate(now.getDate() - 7));

    const stats = await collection
      .aggregate([
        {
          $facet: {
            totalPlayers: [{ $group: { _id: "$userId" } }, { $count: "count" }],
            activePlayers: [
              { $match: { date: { $gte: lastActive } } },
              { $group: { _id: "$userId" } },
              { $count: "count" },
            ],
            dailyPlayers: [
              { $match: { date: { $gte: today } } },
              { $group: { _id: "$userId" } },
              { $count: "count" },
            ],
            monthlyPlayers: [
              { $match: { date: { $gte: thisMonth } } },
              { $group: { _id: "$userId" } },
              { $count: "count" },
            ],
            yearlyPlayers: [
              { $match: { date: { $gte: thisYear } } },
              { $group: { _id: "$userId" } },
              { $count: "count" },
            ],
            scores: [
              {
                $group: {
                  _id: null,
                  averageScore: { $avg: "$score" },
                  topScore: { $max: "$score" },
                },
              },
            ],
          },
        },
      ])
      .toArray();

    const [result] = stats;

    return NextResponse.json({
      gameStats: {
        totalPlayers: result.totalPlayers[0]?.count || 0,
        activePlayers: result.activePlayers[0]?.count || 0,
        dailyPlayers: result.dailyPlayers[0]?.count || 0,
        monthlyPlayers: result.monthlyPlayers[0]?.count || 0,
        yearlyPlayers: result.yearlyPlayers[0]?.count || 0,
        averageScore: Math.round(result.scores[0]?.averageScore || 0),
        topScore: result.scores[0]?.topScore || 0,
      },
    });
  } catch (error) {
    logger.error("Error fetching game stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
