import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import WorkoutContext from "../../../context/WorkoutContext";

export default function WorkoutForm() {
  const {
    addWorkout,
    exercises,
    setExercises,
    handleAddExercise,
    handleDeleteExercise,
    updateExerciseField,
    resetFormFields,
  } = useContext(WorkoutContext);

  const [workoutName, setWorkoutName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredExercises = exercises.filter(
      (exercise) => exercise.name.trim() !== ""
    );

    addWorkout(workoutName, filteredExercises);
    setWorkoutName("");
    resetFormFields();
  };

  console.log("Exercises: " + exercises);

  // Remove empty exercises when navigating away without form submission
  useEffect(() => {
    return () => {
      setExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise.name.trim() !== "")
      );
    };
  }, [setExercises]);

  return (
    <div
      className="flex flex-col max-w-[600px] w-[80%] h-[80%] items-center bg-bg-primary mt-10 sm:px-12 rounded-lg z-60 overflow-y-auto"
      onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up to the backdrop
    >
      {/* Header */}

      <div className="w-full flex items-center justify-between mb-12">
        {/* <div className="flex items-center m-0"> */}
        <Link to="../myworkouts" className="pr-2 m-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-text-color hover:fill-header-color cursor-pointer"
          >
            <path d="M16.752,23.994,6.879,14.121a3,3,0,0,1,0-4.242L16.746.012,18.16,1.426,8.293,11.293a1,1,0,0,0,0,1.414l9.873,9.873Z" />
          </svg>
        </Link>
        <h1 className="text-3xl lg:text-4xl text-text-color text-center flex-grow">
          Add Workout
        </h1>
        <div className="w-6"></div>{" "}
        {/* Spacer div with the same width as the SVG */}
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center relative">
          {/* <label htmlFor="">Workout Name</label> */}
          <input
            type="text"
            placeholder="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="sm:w-48 text-2xl sm:text-3xl p-0 mb-2 sm:my-12 rounded placeholder:text-gray-400 bg-transparent focus:placeholder-transparent text-text-color text-left outline-none relative group"
            required
          />
          <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-header-color group-hover:w-full"></span>
        </div>

        {/* EXERCISES */}
        {exercises.map((exercise, index) => {
          return (
            <div
              key={exercise.id}
              className="w-full flex flex-row  items-center align-middle px-2 mb-2 rounded-md bg-bg-secondary overflow-y-auto sm:text-xl"
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
                maxLength={15}
              />
              <div className="flex items-center justify-center my-2">
                {["sets", "reps", "pb"].map((field) => (
                  <input
                    key={field}
                    type={field == "pb" ? "text" : "number"}
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
                    maxLength={3}
                    className="mx-2 rounded placeholder:text-text-color focus:placeholder-transparent text-text-color w-12 bg-bg-primary"
                  />
                ))}
              </div>

              <button
                onClick={(id) => handleDeleteExercise(exercise.id)}
                className="p-1 text-red-600"
              >
                X
              </button>
            </div>
          );
        })}
        <div className="h-full max-h-64 flex flex-col items-center justify-between pb-24">
          <button
            type="button"
            onClick={handleAddExercise}
            className="w-full rounded border border-bg-secondary mt-2"
          >
            Add Exercise
          </button>
          <div className="w-full mt-auto flex justify-center">
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
  );
}
