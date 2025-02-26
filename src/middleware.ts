import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ApiError } from "@/lib/errors/ApiError";
import { errorResponse } from "@/lib/api/responseHandler";

export async function middleware(request: NextRequest) {
  try {
    // Validate and process the request
    await request.clone(); // Ensure request is valid
    // Continue to the next middleware or route handler
    return NextResponse.next();
  } catch (error) {
    // Handle any uncaught errors
    if (error instanceof ApiError) {
      return errorResponse(error);
    }
    return errorResponse(
      ApiError.internal("An unexpected error occurred", {
        originalError: error instanceof Error ? error.message : String(error),
      })
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};
