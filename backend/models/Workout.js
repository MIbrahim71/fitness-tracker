const mongoose = require("mongoose");

// Define schema for exercises
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
});

// Define schema for workouts
const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [exerciseSchema],
  createdAt: { type: Date, default: Date.now }, // Automatically set creation date
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
});

module.exports = mongoose.model("Workout", workoutSchema);
