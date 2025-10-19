import mongoose from "mongoose";

const skiDaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: { type: String, required: true },
  runs: { type: Number, required: true },
  topSpeed: { type: Number, required: true },
  verticalFeet: { type: Number, required: true },
  activityType: {
    type: String,
    enum: ["Skiing", "Snowboarding", "Other"],
    required: true,
  },
  notes: String,
});

export default mongoose.model("SkiDay", skiDaySchema);
