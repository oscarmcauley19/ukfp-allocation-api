import { Router, Request, Response } from "express";
import { Job } from "../models/jobModels";

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

// Get a single job by id
router.get("/:id", (req: Request, res: Response) => {
  const deanery = jobs.find((j) => j.jobId === parseInt(req.params.id));
  if (!deanery) {
    res.status(404).json({ message: "Job not found" });
  }
  res.json(deanery);
});

router.post("/", (req: Request, res: Response) => {
  const newJob: Job = {
    jobId: jobs.length + 1,
    userId: 1,
    dateStarted: new Date(),
    dateCompleted: null,
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

export default router;
