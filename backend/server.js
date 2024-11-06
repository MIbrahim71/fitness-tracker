const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected successfully to:", mongoose.connection.name))
  .catch((error) => console.error("MongoDB connection error", error));

const PORT = process.env.PORT || 5001; 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Simple route to check if server is running
app.get("/", (req, res) => res.send("Backend server is running!"));

// API Routes
const workoutRoutes = require("./routes/workouts");
app.use("/api/workouts", workoutRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/user", authRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
