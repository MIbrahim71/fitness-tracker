const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://localhost:5001/fitnessTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error", error));

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Simple route to check if server is running
app.get("/", (req, res) => res.send("Backend server is running!"));

const workoutRoutes = require("./routes/workouts");
app.use("/api/workouts", workoutRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
