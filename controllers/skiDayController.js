import SkiDay from "../models/skiDay.js";

// Get all ski days
export const getAllSkiDays = async (req, res) => {
  try {
    const skiDays = await SkiDay.find();
    res.json(skiDays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one ski day by ID
export const getSkiDayById = async (req, res) => {
  try {
    const skiDay = await SkiDay.findById(req.params.id);
    if (!skiDay) return res.status(404).json({ message: "Ski day not found" });
    res.json(skiDay);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

// Create a ski day
export const createSkiDay = async (req, res) => {
  try {
    const newSkiDay = await SkiDay.create(req.body);
    res.status(201).json(newSkiDay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update ski day
export const updateSkiDay = async (req, res) => {
  try {
    const updatedSkiDay = await SkiDay.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkiDay) return res.status(404).json({ message: "Ski day not found" });
    res.json(updatedSkiDay);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

// Delete ski day
export const deleteSkiDay = async (req, res) => {
  try {
    const deletedSkiDay = await SkiDay.findByIdAndDelete(req.params.id);
    if (!deletedSkiDay) return res.status(404).json({ message: "Ski day not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};
