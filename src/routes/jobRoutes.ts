import { Router, Request, Response } from "express";
import axios from "axios";
import { config } from "../config/config";
import { getJobResultById } from "../queries/jobQueries";
import { startJobSchema } from "../schemas/jobSchemas";
import { validatePostRequest } from "../utils/validation";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const validationResult = validatePostRequest(req, res, startJobSchema);
  if (validationResult) {
    res.status(validationResult.code).json(validationResult.json);
  }

  // Trigger Celery task via Python endpoint
  const response = await axios.post(`${config.WORKER_API_URL}/start-job`, {
    user_ranking: req.body.user_ranking,
    runs: req.body.runs,
  });
  res.json({ job_id: response.data.task_id });
});

router.get("/:jobId", async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const status = await getJobResultById(jobId);
    if (!status) {
      res.status(404).json({ error: "Job not found" });
      return;
    }
    res.json(status);
  } catch (error) {
    console.error(`Error retrieving job ${jobId}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
