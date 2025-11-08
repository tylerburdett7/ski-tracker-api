import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "./config/passport.js";
import skiDayRoutes from "./routes/skiDayRoutes.js";
import { swaggerDocs } from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 🧱 Middleware
app.use(express.static("public"));
app.use(express.json()); // ✅ Parse JSON bodies

// 🧠 Session + Passport setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboardcat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🗺️ Routes
app.use("/api/skiDays", skiDayRoutes);

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
  })
);

app.get("/auth/success", (req, res) => {
  res.send(`Welcome ${req.user ? req.user.displayName : "Guest"}!`);
});

app.get("/auth/failure", (req, res) => {
  res.send("Failed to authenticate.");
});

app.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// 🧾 Swagger docs
swaggerDocs(app);

// 🧩 MongoDB connection + Server startup
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
