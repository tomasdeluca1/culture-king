import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";
export const maxDuration = 10;

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
    const lastActive = new Date(now.setDate(now.getDate() - 7));

    // Use Promise.all to run queries concurrently
    const totalPlayersPromise = collection
      .distinct("userId")
      .then((ids) => ids.length);
    const activePlayersPromise = collection
      .distinct("userId", { date: { $gte: lastActive } })
      .then((ids) => ids.length);
    const dailyPlayersPromise = collection
      .distinct("userId", { date: { $gte: today } })
      .then((ids) => ids.length);
    const monthlyPlayersPromise = collection
      .distinct("userId", { date: { $gte: thisMonth } })
      .then((ids) => ids.length);
    const yearlyPlayersPromise = collection
      .distinct("userId", { date: { $gte: thisYear } })
      .then((ids) => ids.length);
    const scoresPromise = collection
      .aggregate([
        {
          $group: {
            _id: null,
            averageScore: { $avg: "$score" },
            topScore: { $max: "$score" },
          },
        },
      ])
      .toArray();

    const [
      totalPlayers,
      activePlayers,
      dailyPlayers,
      monthlyPlayers,
      yearlyPlayers,
      scores,
    ] = await Promise.all([
      totalPlayersPromise,
      activePlayersPromise,
      dailyPlayersPromise,
      monthlyPlayersPromise,
      yearlyPlayersPromise,
      scoresPromise,
    ]);

    return NextResponse.json({
      gameStats: {
        totalPlayers,
        activePlayers,
        dailyPlayers,
        monthlyPlayers,
        yearlyPlayers,
        averageScore: Math.round(scores[0]?.averageScore || 0),
        topScore: scores[0]?.topScore || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching game stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
