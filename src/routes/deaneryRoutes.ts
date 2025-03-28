import { Router, Request, Response } from "express";
import { Deanery } from "../models/deaneryModels";

const router = Router();

// Dummy deaneries
const deaneries: Deanery[] = [
  {
    deaneryId: 1,
    deaneryName: "Deanery 1",
    places: 2000,
    applicants: 1800,
    ratio: 1800 / 2000,
  },
  {
    deaneryId: 2,
    deaneryName: "Deanery 2",
    places: 820,
    applicants: 950,
    ratio: 820 / 950,
  },
  {
    deaneryId: 3,
    deaneryName: "Deanery 3",
    places: 1230,
    applicants: 895,
    ratio: 895 / 1230,
  },
];

// Get all deaneries
router.get("/", (req: Request, res: Response) => {
  res.json(deaneries);
});

// Get a single deanery by ID
router.get("/:id", (req: Request, res: Response) => {
  const deanery = deaneries.find(
    (d) => d.deaneryId === parseInt(req.params.id),
  );
  if (!deanery) {
    res.status(404).json({ message: "Deanery not found" });
  }
  res.json(deanery);
});

export default router;
