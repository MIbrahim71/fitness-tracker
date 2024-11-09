import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createWorkout } from "../../services/workouts";
import { v4 as uuidv4 } from "uuid";


export default function WorkoutForm() {
  const navigate = useNavigate();

  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: "" },
    ])
  };

  const handleDeleteExercise = (id) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
  };

  const updateExerciseField = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const resetFormFields = () => {
    // Optionally reset form fields
    setExercises([{ id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: "" }]);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("")

    try {
      const filteredExercises = exercises.filter(
        (exercise) => exercise.name.trim() !== ""
      );
      
      const workoutData = {
        name: workoutName,
        exercises: filteredExercises,
      }
      resetFormFields();
      await createWorkout(workoutData)
      navigate('..')
     
    } catch (error) {
      setError(error.message || "Failed to create workout");
      console.error("Error creating workout:", error);
    }

    
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
      className="flex flex-col max-w-[600px] w-[85%] min-h-[80vh] bg-bg-primary px-4 sm:px-12 rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Form Container */}
      <div className="w-full flex flex-col h-full">
        {/* Header Section */}
        <div className="w-full flex items-center justify-between py-6 sm:py-8">
          <Link to="../myworkouts" className="pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              className="w-6 h-6 sm:w-8 sm:h-8 fill-text-color hover:fill-header-color cursor-pointer"
            >
              <path d="M16.752,23.994,6.879,14.121a3,3,0,0,1,0-4.242L16.746.012,18.16,1.426,8.293,11.293a1,1,0,0,0,0,1.414l9.873,9.873Z" />
            </svg>
          </Link>
          <h1 className="text-2xl sm:text-4xl text-text-color text-center flex-grow">
            Add Workout
          </h1>
          <div className="w-6 sm:w-8" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
          {/* Workout Name Input */}
          <div className="flex items-center relative mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Workout Name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full sm:w-48 text-xl sm:text-3xl p-0 rounded placeholder:text-gray-400 bg-transparent focus:placeholder-transparent text-text-color text-left outline-none relative group"
              required
            />
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-header-color group-hover:w-full"></span>
          </div>

          {/* Exercises Section */}
          <div className="flex flex-col gap-2 mb-4">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="w-full flex flex-row items-center px-2 rounded-md bg-bg-secondary text-base sm:text-xl"
              >
                <input
                  type="text"
                  placeholder="Exercise"
                  value={exercise.name || ""}
                  onChange={(e) => {
                    updateExerciseField(index, "name", e.target.value);
                  }}
                  required
                  className="w-[40%] sm:w-[50%] text-base sm:text-xl pl-1 rounded-sm placeholder:text-gray-400 bg-transparent focus:placeholder-transparent text-text-color text-left"
                  maxLength={15}
                />
                <div className="flex items-center justify-center my-2 flex-grow">
                  {["sets", "reps", "pb"].map((field) => (
                    <input
                      key={field}
                      type={field === "pb" ? "text" : "number"}
                      id={`${field}-${exercise.id}`}
                      placeholder={field.toUpperCase()}
                      value={exercise[field] || ""}
                      onChange={(e) =>
                        updateExerciseField(index, field, e.target.value)
                      }
                      maxLength={field === "pb" ? 10 : 3}
                      className="mx-1 sm:mx-2 px-1 rounded placeholder:text-text-color focus:placeholder-transparent text-text-color w-10 sm:w-14 bg-bg-primary text-sm sm:text-base"
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleDeleteExercise(exercise.id)}
                  className="p-1 text-red-600 ml-1"
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* Add Exercise Button */}
          <button
            type="button"
            onClick={handleAddExercise}
            className="w-full py-2 rounded border border-bg-secondary hover:bg-bg-secondary transition-colors duration-200 mb-auto"
          >
            Add Exercise
          </button>

          {/* Save Button */}
          <div className="flex justify-center mt-4 sm:mt-6 pb-6 sm:pb-8">
            <button
              type="submit"
              className="w-full  bg-header-color text-white px-4 sm:px-8 py-2 sm:py-3 rounded text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
