import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { DailyChallenge } from "@/lib/models/DailyChallenge";
import { getTodaysQuestions } from "@/lib/services/questions";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);

    // Check if user has already played today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const collection = db.collection("daily_challenges");
    console.log(collection);

    const existingAttempt = await collection.findOne({
      userId: session.user.sub,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (existingAttempt) {
      return NextResponse.json({
        hasPlayed: true,
        score: existingAttempt.score,
        rank: existingAttempt.rank,
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
    const db = client.db("culture-king");

    const challenge = new DailyChallenge({
      userId: session.user.sub,
      date: new Date(),
      correctAnswers,
      timeTaken,
      score: 0, // Will be calculated
    });

    challenge.score = challenge.calculateScore();

    // Calculate rank
    const higherScores = await db
      .collection("daily_challenges")
      .countDocuments({
        date: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999),
        },
        score: { $gt: challenge.score },
      });

    challenge.rank = higherScores + 1;
    await challenge.save();

    return NextResponse.json({
      score: challenge.score,
      rank: challenge.rank,
    });
  } catch (error) {
    console.error("Error saving challenge result:", error);
    return new NextResponse(null, { status: 500 });
  }
}
