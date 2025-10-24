import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import skiDayRoutes from "./routes/skiDayRoutes.js";
import { swaggerDocs } from "./config/swagger.js"; // ✅ only this import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/skiDays", skiDayRoutes);

// Swagger docs
swaggerDocs(app); // ✅ sets up /api-docs automatically

console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
    app.listen(PORT);
  })
  .catch((error) => console.error("MongoDB connection failed:", error));
