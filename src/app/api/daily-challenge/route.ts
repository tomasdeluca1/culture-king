import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { getTodaysQuestions } from "@/lib/services/questions";
import { getCurrentResetTime, getNextResetTime } from "@/lib/utils/time";
import { withErrorHandling } from "@/lib/utils/api";
import { logger } from "@/lib/utils/logger";
import { getCollection } from "@/lib/db/collections";

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

    const collection = await getCollection();

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

    const { correctAnswers, timeTaken } = await req.json();
    const collection = await getCollection();

    const baseScore = correctAnswers * 3000; // Base score from correct answers
    const timePenalty = (timeTaken / 1000) * 50; // More balanced time penalty

    const score = Math.round(baseScore - timePenalty);

    // Get today's date range
    const today = getCurrentResetTime();
    const tomorrow = getNextResetTime();

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
    logger.error("Error saving challenge result:", error);
    return new NextResponse(null, { status: 500 });
  }
}
