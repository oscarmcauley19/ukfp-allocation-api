import { Router, Request, Response } from "express";
import { Deanery } from "../models/deaneryModels";

const router = Router();

// Dummy deaneries
const deaneries: Deanery[] = [
  {
    deaneryId: 1,
    deaneryName: "East Anglia",
    places: 335,
    applicants: 134,
    ratio: 0.4,
  },
  {
    deaneryId: 2,
    deaneryName: "Essex, Bedfordshire & Hertfordshire (EBH)",
    places: 369,
    applicants: 210,
    ratio: 0.57,
  },
  {
    deaneryId: 3,
    deaneryName: "Kent, Surrey and Sussex (KSS)",
    places: 581,
    applicants: 290,
    ratio: 0.5,
  },
  {
    deaneryId: 4,
    deaneryName: "Leicestershire, Northamptonshire & Rutland (LNR)",
    places: 238,
    applicants: 155,
    ratio: 0.65,
  },
  {
    deaneryId: 5,
    deaneryName: "London",
    places: 989,
    applicants: 2387,
    ratio: 2.41,
  },
  {
    deaneryId: 6,
    deaneryName: "North West of England",
    places: 901,
    applicants: 1112,
    ratio: 1.23,
  },
  {
    deaneryId: 7,
    deaneryName: "Northern",
    places: 443,
    applicants: 422,
    ratio: 0.95,
  },
  {
    deaneryId: 8,
    deaneryName: "Northern Ireland",
    places: 284,
    applicants: 266,
    ratio: 0.94,
  },
  {
    deaneryId: 9,
    deaneryName: "Peninsula",
    places: 253,
    applicants: 162,
    ratio: 0.64,
  },
  {
    deaneryId: 10,
    deaneryName: "Scotland",
    places: 879,
    applicants: 831,
    ratio: 0.95,
  },
  {
    deaneryId: 11,
    deaneryName: "Severn",
    places: 352,
    applicants: 478,
    ratio: 1.36,
  },
  {
    deaneryId: 12,
    deaneryName: "Thames Valley Oxford",
    places: 286,
    applicants: 357,
    ratio: 1.25,
  },
  {
    deaneryId: 13,
    deaneryName: "Trent",
    places: 397,
    applicants: 211,
    ratio: 0.53,
  },
  {
    deaneryId: 14,
    deaneryName: "Wales",
    places: 459,
    applicants: 277,
    ratio: 0.6,
  },
  {
    deaneryId: 15,
    deaneryName: "Wessex",
    places: 367,
    applicants: 249,
    ratio: 0.68,
  },
  {
    deaneryId: 16,
    deaneryName: "West Midlands Central",
    places: 224,
    applicants: 307,
    ratio: 1.37,
  },
  {
    deaneryId: 17,
    deaneryName: "West Midlands North",
    places: 366,
    applicants: 130,
    ratio: 0.36,
  },
  {
    deaneryId: 18,
    deaneryName: "West Midlands South",
    places: 232,
    applicants: 119,
    ratio: 0.51,
  },
  {
    deaneryId: 19,
    deaneryName: "Yorkshire and Humber",
    places: 700,
    applicants: 558,
    ratio: 0.8,
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
