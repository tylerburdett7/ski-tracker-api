import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import skiDayRoutes from "./routes/skiDayRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/skiDays", skiDayRoutes);

console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
    app.listen(PORT);
  })
  .catch((error) => console.error("MongoDB connection failed:", error));
