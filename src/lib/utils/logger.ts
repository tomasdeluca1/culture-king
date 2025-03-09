type LogLevel = "info" | "warn" | "error" | "debug";

type LogData = Record<string, unknown>;

interface ErrorDetails {
  name: string;
  message: string;
  stack?: string;
}

interface LogMessage {
  timestamp: string;
  level: LogLevel;
  message: string;
  path?: string;
  error?: ErrorDetails;
  data?: LogData;
}

export const logger = {
  info: (message: string, data?: LogData) => log("info", message, data),
  warn: (message: string, data?: LogData) => log("warn", message, data),
  error: (message: string, error?: Error | unknown, data?: LogData) =>
    log("error", message, error, data),
  debug: (message: string, data?: LogData) => log("debug", message, data),
};

function log(
  level: LogLevel,
  message: string,
  errorOrData?: Error | unknown | LogData,
  additionalData?: LogData
) {
  const logMessage: LogMessage = {
    timestamp: new Date().toISOString(),
    level,
    message,
    path: getCurrentPath(),
  };

  if (errorOrData instanceof Error) {
    logMessage.error = {
      name: errorOrData.name,
      message: errorOrData.message,
      stack: errorOrData.stack,
    };
    if (additionalData) logMessage.data = additionalData;
  } else if (errorOrData && typeof errorOrData === "object") {
    logMessage.data = errorOrData as LogData;
  }

  // In development, pretty print to console
  if (process.env.NODE_ENV === "development") {
    console[level](JSON.stringify(logMessage, null, 2));
    return;
  }

  // In production, log in a format suitable for log aggregation
  console[level](JSON.stringify(logMessage));
}

function getCurrentPath() {
  try {
    const error = new Error();
    const stack = error.stack?.split("\n")[3];
    const path = stack?.match(/\((.+?)\)/)?.[1] || "";
    return path.includes("node_modules") ? undefined : path;
  } catch {
    return undefined;
  }
}
