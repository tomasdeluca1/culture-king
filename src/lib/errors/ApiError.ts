/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiErrorCode } from "@/types/api";

export class ApiError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: Record<string, any>;

  constructor(
    code: ApiErrorCode,
    message: string,
    statusCode: number = 500,
    details?: Record<string, any>
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  public static badRequest(message: string, details?: Record<string, any>) {
    return new ApiError(ApiErrorCode.BAD_REQUEST, message, 400, details);
  }

  public static unauthorized(message: string = "Unauthorized") {
    return new ApiError(ApiErrorCode.UNAUTHORIZED, message, 401);
  }

  public static forbidden(message: string = "Forbidden") {
    return new ApiError(ApiErrorCode.FORBIDDEN, message, 403);
  }

  public static notFound(message: string = "Not Found") {
    return new ApiError(ApiErrorCode.NOT_FOUND, message, 404);
  }

  public static internal(
    message: string = "Internal Server Error",
    details?: Record<string, any>
  ) {
    return new ApiError(
      ApiErrorCode.INTERNAL_SERVER_ERROR,
      message,
      500,
      details
    );
  }

  public static validation(message: string, details?: Record<string, any>) {
    return new ApiError(ApiErrorCode.VALIDATION_ERROR, message, 400, details);
  }

  public static database(message: string, details?: Record<string, any>) {
    return new ApiError(ApiErrorCode.DATABASE_ERROR, message, 500, details);
  }
}
