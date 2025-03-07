import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { getTodaysQuestions } from "@/lib/services/questions";
import clientPromise from "@/lib/mongodb";
import { getNextResetTime } from "@/lib/utils/time";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Get today's date range using the reset time
    const nextReset = getNextResetTime();
    const prevReset = new Date(nextReset);
    prevReset.setUTCDate(prevReset.getUTCDate() - 1);

    // Check if user has already played in the current period
    const existingAttempt = await collection.findOne({
      userId: session.user.sub,
      date: {
        $gte: prevReset,
        $lt: nextReset,
      },
    });

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
    return new NextResponse(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const { correctAnswers, timeTaken } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Calculate score
    const baseScore = correctAnswers * 1000;
    const timeBonus = Math.max(0, 30000 - timeTaken) / 100;
    const score = Math.round(baseScore + timeBonus);

    // Calculate rank
    const higherScores = await collection.countDocuments({
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
      score: { $gt: score },
    });

    const rank = higherScores + 1;

    // Insert the challenge result
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

    return NextResponse.json({ score, rank });
  } catch (error) {
    console.error("Error saving challenge result:", error);
    return new NextResponse(null, { status: 500 });
  }
}
