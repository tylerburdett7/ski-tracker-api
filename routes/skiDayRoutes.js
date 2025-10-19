import express from "express";
import {
  getAllSkiDays,
  getSkiDayById,
  createSkiDay,
  updateSkiDay,
  deleteSkiDay,
} from "../controllers/skiDayController.js";

const router = express.Router();

// Get all ski days
router.get("/", getAllSkiDays);

// Get a single ski day by ID
router.get("/:id", getSkiDayById);

// Create a new ski day
router.post("/", createSkiDay);

// Update a ski day by ID
router.put("/:id", updateSkiDay);

// Delete a ski day by ID
router.delete("/:id", deleteSkiDay);

export default router;
