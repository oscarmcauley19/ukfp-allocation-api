import dotenv from "dotenv";
import { configSchema } from "./schemas/configSchema";
import { configDefaults } from "./defaults/configDefaults";

dotenv.config();

// Merge defaults and process.env (env vars override defaults)
const rawEnv = { ...configDefaults, ...process.env };

const parsed = configSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.format());
  process.exit(1);
}

export const config = parsed.data;
