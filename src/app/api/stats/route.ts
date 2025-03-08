import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface GameStats {
  totalPlayers: number;
  activePlayers: number;
  dailyPlayers: number;
  monthlyPlayers: number;
  yearlyPlayers: number;
  averageScore: number;
  topScore: number;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Get date ranges
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);
    const lastActive = new Date(now.setDate(now.getDate() - 7)); // Active = played in last 7 days
    console.log(lastActive);

    // Run aggregation pipeline
    const [stats] = await collection
      .aggregate([
        {
          $facet: {
            totalPlayers: [
              {
                $group: {
                  _id: "$userId",
                },
              },
              {
                $count: "count",
              },
            ],
            activePlayers: [
              {
                $match: {
                  date: { $gte: lastActive },
                },
              },
              {
                $group: {
                  _id: "$userId",
                },
              },
              {
                $count: "count",
              },
            ],
            dailyPlayers: [
              {
                $match: {
                  date: { $gte: today },
                },
              },
              {
                $group: {
                  _id: "$userId",
                },
              },
              {
                $count: "count",
              },
            ],
            monthlyPlayers: [
              {
                $match: {
                  date: { $gte: thisMonth },
                },
              },
              {
                $group: {
                  _id: "$userId",
                },
              },
              {
                $count: "count",
              },
            ],
            yearlyPlayers: [
              {
                $match: {
                  date: { $gte: thisYear },
                },
              },
              {
                $group: {
                  _id: "$userId",
                },
              },
              {
                $count: "count",
              },
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
    const gameStats: GameStats = {
      totalPlayers: stats.totalPlayers[0]?.count || 0,
      activePlayers: stats.activePlayers[0]?.count || 0,
      dailyPlayers: stats.dailyPlayers[0]?.count || 0,
      monthlyPlayers: stats.monthlyPlayers[0]?.count || 0,
      yearlyPlayers: stats.yearlyPlayers[0]?.count || 0,
      averageScore: Math.round(stats.scores[0]?.averageScore || 0),
      topScore: stats.scores[0]?.topScore || 0,
    };
    return NextResponse.json({ gameStats });
  } catch (error) {
    console.error("Error fetching game stats:", error);
    return new NextResponse(null, { status: 500 });
  }
}
