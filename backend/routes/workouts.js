const express = require("express");
const mongoose = require("mongoose");
const Workout = require("../models/Workout");
const router = express.Router();

let workouts = [];

// CREATE a new workout
router.post("/", async (req, res) => {
  const { name, exercises, userId } = req.body;
  if (!name || !exercises || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const workout = new Workout({ name, exercises, userId }); // Create new Workout instance

  try {
    // Convert userId to ObjectId
    const validUserId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : null;

    if (!validUserId) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const newWorkout = await workout.save(); // Save Workout to database
    res.status(201).json(newWorkout); // Respond with new Workout
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all workouts
router.get("/", async (req, res) => {
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
    res.status.apply(500).json({ message: error.message });
  }
});

// UPDATE a workout
router.put("/:id", async (req, res) => {
  try {
    const workout = workouts.find(
      (workout) => workout.id === parseInt(req.params.id)
    );
    if (!workout) return res.status(404).send("Workout not found");

    workout.name = req.body.name || workout.name;
    workout.exercises = req.body.exercises || workout.exercises;
    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a workout
router.delete("/:id", async (req, res) => {
  try {
    const workout = req.params.id;
    const deletedWorkout = await Workout.findByIdAndDelete(workout);

    if (!deletedWorkout) return res.status(404).send("Workout not found");

    res.json({ message: "Workout deleted", deletedWorkout });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
