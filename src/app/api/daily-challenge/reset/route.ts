import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { getCurrentResetTime, getNextResetTime } from "@/lib/utils/time";
import { getCollection } from "@/lib/db/collections";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

export async function DELETE() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const collection = await getCollection();
    const today = getCurrentResetTime();
    const tomorrow = getNextResetTime();

    logger.debug("Attempting to reset daily challenge", {
      userId: session.user.sub,
      today,
      tomorrow,
    });

    const result = await collection.deleteOne({
      userId: session.user.sub,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (result.deletedCount === 0) {
      logger.warn("No attempt found to reset", {
        userId: session.user.sub,
      });
      return new NextResponse(null, { status: 404 });
    }

    logger.info("Successfully reset daily challenge", {
      userId: session.user.sub,
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    logger.error("Failed to reset daily challenge", error);
    return new NextResponse(null, { status: 500 });
  }
}
