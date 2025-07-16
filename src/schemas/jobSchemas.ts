import { z, ZodSchema } from "zod";

export const startJobSchema: ZodSchema = z.object({
  user_ranking: z.array(z.number()),
  runs: z.number().int().positive().min(1).max(100),
});
