import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { getTodaysQuestions } from "@/lib/services/questions";
import clientPromise from "@/lib/mongodb";
import { getNextResetTime } from "@/lib/utils/time";
import { withErrorHandling } from "@/lib/utils/api";
import { logger } from "@/lib/utils/logger";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  return withErrorHandling(async () => {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    logger.debug("Starting daily challenge fetch", {
      userId: session.user.sub,
    });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("daily_challenges");

    // Log the query parameters
    const nextReset = getNextResetTime();
    const prevReset = new Date(nextReset);
    prevReset.setUTCDate(prevReset.getUTCDate() - 1);

    logger.debug("Query parameters", {
      userId: session.user.sub,
      prevReset,
      nextReset,
    });

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
      logger.debug("Found existing attempt", { attempt: existingAttempt });
      return NextResponse.json({
        hasPlayed: true,
        userGameScore: existingAttempt,
      });
    }

    const questions = await getTodaysQuestions();
    logger.debug("Generated new questions", {
      questionCount: questions.length,
    });

    return NextResponse.json({ hasPlayed: false, questions });
  }, "daily-challenge-GET");
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
