import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import WorkoutContext from "../../../context/WorkoutContext";

export default function WorkoutForm({ closeModal }) {
  const { addWorkout } = useContext(WorkoutContext);

  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([
    { id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: 0 },
  ]);

  const handleAddExercise = () => {
    setExercises((prevExercises) => [
      ...prevExercises,
      { id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: 0 },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(workoutName, exercises);
    closeModal();
    console.log("Exercises", exercises);
    // Optionally reset form fields
    setWorkoutName("");
    setExercises([{ id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: 0 }]);
  };

  const updateExerciseField = (index, field, value) => {
    setExercises((prevExercises) => {
      const newExercises = [...prevExercises];
      newExercises[index][field] = value;
      return newExercises;
    });
  };

  return (
    <div
      className="fixed inset-0 bg-bg-primary flex items-center justify-center z-50"
      onClick={closeModal}
    >
      {/* Modal */}
      <div
        className="flex flex-col items-center bg-bg-color max-w-[700px] w-[90%] h-[80%] pt-6 px-6 rounded-lg shadow-lg z-60"
        onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up to the backdrop
      >
        {/* Header */}
        <div className="flex flex-row w-[80%] items-center justify-between mb-4">
          <h1 className="flex text-3xl lg:text-4xl text-text-color">
            Add Workout
          </h1>
          <button
            onClick={closeModal}
            className="px-2 py-1 self-center rounded border border-header-color"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-[80%]">
          <div className="flex">
            {/* <label htmlFor="">Workout Name</label> */}
            <input
              type="text"
              placeholder="Workout Name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="text-xl my-4 rounded placeholder:text-gray-400 focus:placeholder-transparent text-black"
              required
            />
          </div>

          {/* EXERCISES */}
          {exercises.map((exercise, index) => {
            return (
              <div
                key={exercise.id}
                className="flex flex-col sm:flex-row items-center align-middle py-1 px-2 mb-2 rounded-lg bg-bg-secondary"
              >
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) => {
                    updateExerciseField(index, "name", e.target.value);
                  }}
                  required
                  className="text-md rounded-sm placeholder:text-gray-400 focus:placeholder-transparent text-black border border-solid border-gray-400"
                />
                <div className="flex items-center justify-center my-2">
                  <p>
                    <label htmlFor={`sets-${exercise.id}`}>Sets</label>
                    <input
                      type="number"
                      id={`sets-${exercise.id}`}
                      value={exercise.sets}
                      onChange={(e) => {
                        updateExerciseField(index, "sets", e.target.value);
                      }}
                      className="mx-2 rounded placeholder:text-gray-400 focus:placeholder-transparent text-black w-8"
                    />
                  </p>
                  <p>
                    <label htmlFor={`reps-${exercise.id}`}>Reps</label>
                    <input
                      type="number"
                      id={`reps-${exercise.id}`}
                      value={exercise.reps}
                      onChange={(e) => {
                        updateExerciseField(index, "reps", e.target.value);
                      }}
                      className="mx-2 rounded placeholder:text-gray-400 focus:placeholder-transparent text-black w-8"
                    />
                  </p>
                  <p>
                    <label htmlFor={`pb-${exercise.id}`}>PB</label>
                    <input
                      type="number"
                      id={`pb-${exercise.id}`}
                      value={exercise.pb}
                      onChange={(e) => {
                        updateExerciseField(index, "pb", e.target.value);
                      }}
                      className="mx-2 rounded placeholder:text-gray-400 focus:placeholder-transparent text-black w-8"
                    />
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col items-center justify-between">
            <button
              type="button"
              onClick={handleAddExercise}
              className="px-2 py-1 rounded border"
            >
              Add Exercise
            </button>
            <button
              type="submit"
              className="max-w-[60%] mt-24 bg-header-color text-white px-3 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg"
            >
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
