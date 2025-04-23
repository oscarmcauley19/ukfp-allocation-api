import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import deanery from "./routes/deaneryRoutes";
import job from "./routes/jobRoutes";
import Redis from "ioredis";
import { config } from "./config/config";

dotenv.config(); // Load environment variables

const app = express();
export const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/deanery", deanery);
app.use("/job", job);

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
