import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createWorkout } from "../../services/workouts";

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
      navigate('myworkouts')
     
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
      className="flex flex-col max-w-[600px] w-[85%] h-full items-center bg-bg-primary sm:px-12 rounded-lg overflow-y-scroll"
      onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up to the backdrop
    >
      <div className="w-full flex flex-col items-center justify-between mt-10 ">
        {/* Header */}

        <div className="w-full flex items-center justify-between mb-12">
          <Link to="../myworkouts" className="pr-2 m-0">
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
          <h1 className="text-3xl sm:text-5xl text-text-color text-center flex-grow">
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
            <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-header-color group-hover:w-full"></span>
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
    </div>
  );
}
