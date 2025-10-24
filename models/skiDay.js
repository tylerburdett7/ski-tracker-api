import mongoose from "mongoose";

const skiDaySchema = new mongoose.Schema({
  date: { type: Date, required: [true, "Date is required"] },
  location: { type: String, required: [true, "Location is required"], trim: true },
  runs: { type: Number, required: [true, "Runs are required"], min: [0, "Runs must be positive"] },
  topSpeed: { type: Number, required: [true, "Top speed is required"], min: [0, "Speed must be positive"] },
  verticalFeet: { type: Number, required: [true, "Vertical feet is required"], min: [0, "Vertical feet must be positive"] },
  activityType: {
    type: String,
    enum: ["Skiing", "Snowboarding", "Other"],
    required: [true, "Activity type is required"],
  },
  notes: { type: String, maxlength: [200, "Notes cannot exceed 200 characters"] },
});

export default mongoose.model("SkiDay", skiDaySchema);
