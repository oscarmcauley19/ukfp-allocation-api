import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import deanery from "./routes/deaneryRoutes";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/deanery", deanery);

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
