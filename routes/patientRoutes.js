import express from "express";
import {
  getPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/", getPatients);
router.get("/:id", getPatientById);
router.post("/", addPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
