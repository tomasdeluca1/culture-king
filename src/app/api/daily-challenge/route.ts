import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { getTodaysQuestions } from "@/lib/services/questions";
import clientPromise from "@/lib/mongodb";
import { getNextResetTime } from "@/lib/utils/time";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    const nextReset = getNextResetTime();
    const prevReset = new Date(nextReset);
    prevReset.setUTCDate(prevReset.getUTCDate() - 1);

    // Use index on userId and date
    const existingAttempt = await collection.findOne(
      {
        userId: session.user.sub,
        date: {
          $gte: prevReset,
          $lt: nextReset,
        },
      },
      {
        projection: {
          _id: 0,
          score: 1,
          rank: 1,
          correctAnswers: 1,
          timeTaken: 1,
        },
      }
    );

    if (existingAttempt) {
      return NextResponse.json({
        hasPlayed: true,
        userGameScore: existingAttempt,
      });
    }

    const questions = await getTodaysQuestions();
    return NextResponse.json({ hasPlayed: false, questions });
  } catch (error) {
    console.error("Error in daily challenge route:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily challenge" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const { correctAnswers, timeTaken, score } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Calculate rank
    const higherScores = await collection.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
      score: { $gt: score },
    });

    const rank = higherScores + 1;

    // Save the challenge result
    await collection.insertOne({
      userId: session.user.sub,
      name: session.user.name,
      picture: session.user.picture.replace("_normal", ""),
      date: new Date(),
      correctAnswers,
      timeTaken,
      score,
      rank,
    });

    return NextResponse.json({ rank, score, correctAnswers, timeTaken });
  } catch (error) {
    console.error("Error saving challenge result:", error);
    return new NextResponse(null, { status: 500 });
  }
}
