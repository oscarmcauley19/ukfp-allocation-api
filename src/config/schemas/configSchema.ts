import { z } from "zod";

export const configSchema = z.object({
  WORKER_API_URL: z.string().url(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().int().positive(),
});

export type ConfigSchema = z.infer<typeof configSchema>;
