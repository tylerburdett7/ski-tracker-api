import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import skiDayRoutes from "./routes/skiDayRoutes.js";
import { swaggerDocs } from "./config/swagger.js";
import session from "express-session";
import passport from "./config/passport.js";



const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Middleware
app.use(express.json());

// Routes
app.use("/api/skiDays", skiDayRoutes);

// Google OAuth login route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
  })
);

app.get("/auth/success", (req, res) => {
  res.send(`Welcome ${req.user.displayName}!`);
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
