const express = require("express");
const Workout = require("../models/Workout");
const router = express.Router();

let workouts = [];

// Create a new workout
router.post("/", async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.status(201).json(newWorkout);
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
router.get("/:id", (req, res) => {
  const workout = workouts.find(
    (workout) => workout.id === parseInt(req.params.id)
  );

  if (!workout) return res.status(404).send("Workout Not Found");
  res.json(workout);
});

// Update a workout
router.put("/:id", (req, res) => {
  const workout = workouts.find(
    (workout) => workout.id === parseInt(req.params.id)
  );

  if (!workout) return res.status(404).send("Workout not found");

  Object.assign(workout, req.body);
  res.json(workout);
});

// Delete a workout
router.delete("/:id", (req, res) => {
  const workoutIndex = workouts.findIndex(
    (workout) => workout.id === parseInt(req.params.id)
  );

  if (workoutIndex === -1) return res.status(404).send("Workout not found");

  workouts.splice(workoutIndex, 1);
  res.status(204).send(); // No content to send back
});

module.exports = router;
