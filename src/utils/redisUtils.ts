import { redis } from "../server";

/**
 *  Utility function to perform a Redis GET operation with error handling.
 * @param query String to query Redis
 * @param errorMessage Error message to log if the operation fails
 * @returns Parsed value from Redis or null if the key does not exist
 */
export const performRedisGet = async <T>(
  query: string,
  errorMessage: string,
): Promise<T | null> => {
  try {
    const value = await redis.get(query);
    if (!value) {
      return null; // Key not found
    }
    return JSON.parse(value) as T; // Parse and return the value
  } catch (error) {
    console.error(errorMessage, error);
    throw new Error("Internal server error");
  }
};
