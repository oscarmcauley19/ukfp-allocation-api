import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import deanery from "./routes/deaneryRoutes";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/deanery", deanery);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, TypeScript + Express! 🚀" });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
