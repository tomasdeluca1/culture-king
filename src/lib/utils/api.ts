import { NextResponse } from "next/server";
import { logger } from "./logger";

export async function withErrorHandling(
  handler: () => Promise<Response>,
  routeName: string
) {
  const startTime = Date.now();
  try {
    const response = await handler();
    const duration = Date.now() - startTime;

    logger.info(`API ${routeName} completed`, {
      duration,
      status: response.status,
    });

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error(`API ${routeName} failed`, error, {
      duration,
    });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
