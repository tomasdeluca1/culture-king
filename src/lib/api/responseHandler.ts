import { NextResponse } from "next/server";
import { ApiError } from "@/lib/errors/ApiError";
import { ApiResponse } from "@/types/api";

export function successResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

export function errorResponse(
  error: Error | ApiError
): NextResponse<ApiResponse<never>> {
  const isApiError = error instanceof ApiError;
  const statusCode = isApiError ? error.statusCode : 500;

  const response: ApiResponse<never> = {
    success: false,
    error: {
      code: isApiError ? error.code : "INTERNAL_SERVER_ERROR",
      message: error.message,
      ...(isApiError && error.details && { details: error.details }),
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: statusCode });
}
