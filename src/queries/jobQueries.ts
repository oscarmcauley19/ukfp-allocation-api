import { JobResult } from "../models/jobModels";
import { performRedisGet } from "../utils/redisUtils";

export const getJobResultById = async (
  jobId: string,
): Promise<JobResult | null> => {
  return performRedisGet<JobResult>(
    `result:${jobId}`,
    `Error retrieving job result for job ID ${jobId}`,
  );
};
