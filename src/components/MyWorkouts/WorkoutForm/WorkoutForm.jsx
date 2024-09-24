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
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      {/* Modal */}
      <div
        className="flex flex-col items-center bg-bg-secondary max-w-[600px] w-full h-full pt-6 px-8 sm:px-12 rounded-lg shadow-lg z-60 overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up to the backdrop
      >
        {/* Header */}
        <div className="flex flex-row w-full items-center justify-between mb-4">
          <h1 className="flex text-xl lg:text-4xl text-text-color">
            Add Workout
          </h1>
          <button
            onClick={closeModal}
            className="px-2 self-center rounded border border-header-color"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center">
            {/* <label htmlFor="">Workout Name</label> */}
            <input
              type="text"
              placeholder="Workout Name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="sm:w-48 text-2xl sm:text-3xl my-4 sm:my-12 rounded placeholder:text-gray-400 bg-transparent focus:placeholder-transparent text-text-color text-left"
              required
            />
          </div>

          {/* EXERCISES */}
          {exercises.map((exercise, index) => {
            return (
              <div
                key={exercise.id}
                className="w-full flex flex-row  items-center align-middle justify-between py-1 px-2 mb-2 rounded-lg bg-bg-primary overflow-y-auto sm:text-xl"
              >
                <input
                  type="text"
                  placeholder="Exercise"
                  value={exercise.name || ""}
                  onChange={(e) => {
                    updateExerciseField(index, "name", e.target.value);
                  }}
                  required
                  className="w-[50%] text-lg sm:text-xl pl-1 rounded-sm placeholder:text-gray-400 bg-transparent focus:placeholder-transparent text-text-color text-left"
                />
                <div className="flex items-center justify-center my-2">
                  {["sets", "reps", "pb"].map((field) => (
                    <input
                      key={field}
                      type="number"
                      id={`${field}-${exercise.id}`}
                      placeholder={
                        field == "pb"
                          ? field.toUpperCase()
                          : field.charAt(0).toUpperCase() + field.slice(1)
                      } // Capitalizes field names for placeholder
                      value={exercise[field] || ""}
                      onChange={(e) =>
                        updateExerciseField(index, field, e.target.value)
                      }
                      className="mx-2 rounded placeholder:text-text-color bg-transparent focus:placeholder-transparent text-text-color w-12 border-2 border-bg-secondary"
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <div className="h-full max-h-64 flex flex-col items-center justify-between pb-24">
            <button
              type="button"
              onClick={handleAddExercise}
              className="px-2 py-1 rounded border"
            >
              Add Exercise
            </button>
            <div className="w-full  mt-auto flex justify-center">
              <button
                type="submit"
                className="max-w-[60%] bg-header-color text-white px-3 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg"
              >
                Save Workout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
