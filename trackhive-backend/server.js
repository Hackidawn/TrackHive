const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route Imports
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes"); // ✅ NEW: Comments

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes); // ✅ NEW: Mount comments

// Root Health Check (Optional)
app.get("/", (req, res) => {
  res.send("🚀 TrackHive API is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 TrackHive backend running on port ${PORT}`);
  console.log("✅ Loaded .env values:");
  console.log("PORT:", process.env.PORT);
  console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ present" : "❌ missing");
  console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ present" : "❌ missing");
});
