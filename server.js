import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";

import patientRoutes from "./routes/patientRoutes.js";

// Middleware
app.use("/api/patients", patientRoutes);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HMS Backend API is running...");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
