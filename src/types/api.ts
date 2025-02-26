export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
};

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
};

export enum ApiErrorCode {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
}
