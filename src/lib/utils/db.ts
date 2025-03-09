import { Collection } from "mongodb";
import { logger } from "./logger";

const TIMEOUT = 5000; // 5 seconds

export async function withTimeout<T>(
  operation: () => Promise<T>,
  name: string
): Promise<T> {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation ${name} timed out after ${TIMEOUT}ms`));
    }, TIMEOUT);
  });

  try {
    const result = await Promise.race([operation(), timeout]);
    return result as T;
  } catch (error) {
    logger.error(`Database operation ${name} failed`, error);
    throw error;
  }
}

export function wrapCollection<T extends Document>(collection: Collection<T>) {
  return {
    find: (...args: Parameters<typeof collection.find>) =>
      withTimeout(() => collection.find(...args).toArray(), "find"),
    aggregate: (...args: Parameters<typeof collection.aggregate>) =>
      withTimeout(() => collection.aggregate(...args).toArray(), "aggregate"),
    // Add other operations as needed
  };
}
