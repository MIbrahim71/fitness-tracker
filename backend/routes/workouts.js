const express = require("express");
const Workout = require("../models/Workout");
const router = express.Router();

let workouts = [];

// CREATE a new workout
router.post("/", async (req, res) => {
  const { name, exercises, userId } = req.body;
  const workout = new Workout({ name, exercises, userId }); // Create new Workout instance

  try {
    const newWorkout = await newWorkout.save(); // Save Workout to database
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
    const workout = await Workout.findById(req.params.id);

    if (!workout) return res.status(404).send("Workout not found");

    await workout.remove();
    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
