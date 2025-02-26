import connectDB from "@/lib/mongodb";
import { successResponse, errorResponse } from "@/lib/api/responseHandler";
import { ApiError } from "@/lib/errors/ApiError";

export async function GET() {
  try {
    await connectDB();
    return successResponse({ status: "Connected to MongoDB" });
  } catch (error) {
    if (error instanceof ApiError) {
      return errorResponse(error);
    }
    return errorResponse(
      ApiError.database("Failed to connect to MongoDB", {
        originalError: error instanceof Error ? error.message : String(error),
      })
    );
  }
}
