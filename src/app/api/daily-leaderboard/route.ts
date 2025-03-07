import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get top 5 scores for today
    const topScores = await collection
      .aggregate([
        {
          $match: {
            date: {
              $gte: today,
              $lt: tomorrow,
            },
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
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "sub",
            as: "user",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  name: 1,
                  picture: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { correctAnswers: -1, timeTaken: 1 },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 0,
            userId: "$userId",
            name: "$name",
            picture: "$picture",
            correctAnswers: 1,
            timeTaken: 1,
            score: 1,
            rank: 1,
          },
        },
      ])
      .toArray();
    return NextResponse.json(topScores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return new NextResponse(null, { status: 500 });
  }
}
