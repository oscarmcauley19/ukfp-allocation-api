import { Router, Request, Response } from "express";
import { Job } from "../models/jobModels";
import axios from "axios";
import { config } from "../config/config";
import { redis } from "../server";

const router = Router();

// Dummy jobs
const jobs: Job[] = [
  {
    jobId: 1,
    userId: 1,
    dateStarted: new Date(2025, 1, 2),
    dateCompleted: new Date(),
  },
  {
    jobId: 2,
    userId: 2,
    dateStarted: new Date(2025, 3, 15),
    dateCompleted: null,
  },
  {
    jobId: 3,
    userId: 3,
    dateStarted: new Date(2025, 3, 12),
    dateCompleted: new Date(),
  },
];

// Get all jobs
router.get("/", (req: Request, res: Response) => {
  res.json(jobs);
});

router.post("/", async (req: Request, res: Response) => {
  const jobId = Date.now().toString();
  console.log("Creating job with ID:", jobId);

  // Trigger Celery task via Python endpoint
  const response = await axios.post(`${config.WORKER_API_URL}/start-job`, {
    job_id: jobId,
  });

  res.json({ jobId: response.data.job_id });
});

router.get("/job/:jobId", async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const status = await redis.get(`job:${jobId}:status`);

    if (!status) {
      res.status(404).json({ error: "Job not found" });
    }

    res.json({ jobId, status });
  } catch (error) {
    console.error(`Error retrieving job ${jobId}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
