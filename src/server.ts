import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import deanery from "./routes/deaneryRoutes";
import job from "./routes/jobRoutes";
import Redis from "ioredis";
import { config } from "./config/config";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config(); // Load environment variables

const app = express();

// Setup web socket server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Redis connection
export const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});
const redisSub = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});
redisSub.subscribe("job_updates");

redisSub.on("message", (channel, message) => {
  const update = JSON.parse(message);
  console.log(`🔔 Received update on channel ${channel}:`, update);
  const room = `job:${update.job_id}`;
  io.to(room).emit("jobUpdate", update);
});

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("subscribeToJob", (jobId: string) => {
    console.log(`👀 Client subscribed to job ${jobId}`);
    socket.join(`job:${jobId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/deanery", deanery);
app.use("/job", job);

// Start server
httpServer.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
