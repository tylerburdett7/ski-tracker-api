import express from "express";
import {
  getAllSkiDays,
  getSkiDayById,
  createSkiDay,
  updateSkiDay,
  deleteSkiDay,
} from "../controllers/skiDayController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SkiDays
 *   description: API for managing ski days
 */

/**
 * @swagger
 * /api/skiDays:
 *   get:
 *     summary: Get all ski days
 *     tags: [SkiDays]
 *     responses:
 *       200:
 *         description: A list of ski days
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SkiDay'
 */
router.get("/", getAllSkiDays);

/**
 * @swagger
 * /api/skiDays/{id}:
 *   get:
 *     summary: Get a ski day by ID
 *     tags: [SkiDays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ski day ID
 *     responses:
 *       200:
 *         description: Ski day data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkiDay'
 *       404:
 *         description: Ski day not found
 */
router.get("/:id", getSkiDayById);

/**
 * @swagger
 * /api/skiDays:
 *   post:
 *     summary: Create a new ski day
 *     tags: [SkiDays]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkiDay'
 *     responses:
 *       201:
 *         description: Ski day created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkiDay'
 *       400:
 *         description: Invalid data provided
 */
router.post("/", createSkiDay);

/**
 * @swagger
 * /api/skiDays/{id}:
 *   put:
 *     summary: Update a ski day
 *     tags: [SkiDays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ski day ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkiDay'
 *     responses:
 *       200:
 *         description: Updated ski day
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkiDay'
 *       404:
 *         description: Ski day not found
 */
router.put("/:id", updateSkiDay);

/**
 * @swagger
 * /api/skiDays/{id}:
 *   delete:
 *     summary: Delete a ski day
 *     tags: [SkiDays]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ski day ID
 *     responses:
 *       200:
 *         description: Ski day deleted successfully
 *       404:
 *         description: Ski day not found
 */
router.delete("/:id", deleteSkiDay);

export default router;
