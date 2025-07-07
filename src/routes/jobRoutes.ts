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
  console.log("Request body:", req.body);
  // Trigger Celery task via Python endpoint
  const response = await axios.post(`${config.WORKER_API_URL}/start-job`, {
    user_ranking: req.body.user_ranking,
    runs: req.body.runs,
  });
  console.log("Response from Celery: ", response.data);

  res.json({ job_id: response.data.task_id });
});

router.get("/:jobId", async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const status = await redis.get(`result:${jobId}`);

    if (!status) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    const json = JSON.parse(status);
    res.json(json);
  } catch (error) {
    console.error(`Error retrieving job ${jobId}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
