import express from "express";
import {
  getProviders,
  getProviderById,
  addProvider,
  updateProvider,
  deleteProvider,
} from "../controllers/providerController.js";

const router = express.Router();

router.get("/", getProviders);
router.get("/:id", getProviderById);
router.post("/", addProvider);
router.put("/:id", updateProvider);
router.delete("/:id", deleteProvider);

export default router;
