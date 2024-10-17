const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/auth");
const Workout = require("../models/Workout");
const router = express.Router();

let workouts = [];

// CREATE a new workout
router.post("/", authMiddleware, async (req, res) => {
  const { name, exercises } = req.body;
  if (!name || !exercises) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Convert userId to ObjectId
    const validUserId = mongoose.Types.ObjectId.isValid(req.user)
      ? new mongoose.Types.ObjectId(req.user)
      : null;

    if (!validUserId) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const workout = new Workout({ ...req.body, userId: req.user }); // Create new Workout instance

    const newWorkout = await workout.save(); // Save Workout to database
    res.status(201).json(newWorkout); // Respond with new Workout
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all workouts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific workout by ID
router.get("/:id", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout Not Found" });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a workout
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).send("Workout not found");

    // Update workout properties with body data or retain the original
    workout.name = req.body.name || workout.name;
    workout.exercises = req.body.exercises || workout.exercises;
    // Saves changes to database
    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a workout
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).send("Workout not found");

    res.json({ message: "Workout deleted", workout });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
