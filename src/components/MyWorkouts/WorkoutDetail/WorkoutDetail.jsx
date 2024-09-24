import { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";
import WorkoutContext from "../../../context/WorkoutContext";
import { editIcon, checkbox } from "../../../assets/assets";
import { v4 as uuidv4 } from "uuid";

export default function WorkoutDetail() {
  const { id } = useParams();
  const workout = useLoaderData();

  const { workouts, updateWorkout, deleteWorkout } = useContext(WorkoutContext);

  const [localExercises, setLocalExercises] = useState([...workout?.exercises]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddExercise = () => {
    setLocalExercises([
      ...localExercises,
      { id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: "" },
    ]);
  };

  const handleDeleteExercise = (id) => {
    const updatedExercises = localExercises.filter(
      (exercise) => exercise.id !== id
    );
    setLocalExercises(updatedExercises);
  };

  const saveWorkoutChanges = () => {
    const filteredExercises = localExercises.filter(
      (exercise) => exercise.name.trim() !== ""
    );

    const updatedWorkout = { ...workout, exercises: filteredExercises };
    setLocalExercises(filteredExercises);
    updateWorkout(updatedWorkout);
  };

  // Update a specific exercise field
  const handleUpdateExerciseField = (index, field, value) => {
    const updatedExercises = [...localExercises];
    updatedExercises[index][field] = value;

    setLocalExercises(updatedExercises);
    // updateWorkout({ ...workout, exercises: updatedExercises }); // Update the workout in context
  };

  // Loading screen
  useEffect(() => {
    if (workouts && workouts.length > 0) {
      setIsLoading(false);
    }
    console.log(workout);
  }, [workouts]);

  if (isLoading) {
    return <div>Loading workouts...</div>;
  }

  if (!workout) {
    return <div>Workout not found!</div>;
  }

  console.log(localExercises);

  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 gap-12">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="flex text-text-color text-3xl">{workout.name}</h1>
        <img
          onClick={() => {
            saveWorkoutChanges();
            setEditMode(!editMode);
          }}
          src={editMode ? checkbox : editIcon}
          alt={editMode ? checkbox : editIcon}
          className="text-text-color w-8 h-8 m-0 cursor-pointer"
        />
      </div>

      {/* Saved exercises component*/}
      <div className="flex flex-col items-center gap-4 w-full h-full">
        {localExercises.map((exercise, index) => {
          return (
            <div
              key={exercise.id}
              className="w-full flex flex-row items-center align-middle px-2 mb-2 rounded-md bg-bg-secondary overflow-y-auto sm:text-xl"
            >
              <input
                readOnly={!editMode}
                type="text"
                placeholder="Exercise"
                value={exercise.name || ""}
                onChange={(e) => {
                  handleUpdateExerciseField(index, "name", e.target.value);
                }}
                required
                className="w-[50%] text-lg sm:text-xl pl-1 rounded-sm placeholder:text-gray-400 bg-transparent focus:placeholder-transparent text-text-color text-left"
                maxLength={15}
              />
              <div className="flex items-center justify-center my-2">
                {["sets", "reps", "pb"].map((field) => (
                  <input
                    readOnly={!editMode}
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
                      handleUpdateExerciseField(index, field, e.target.value)
                    }
                    required
                    maxLength={3}
                    className="mx-2 rounded placeholder:text-text-color focus:placeholder-transparent text-text-color w-12 bg-bg-primary"
                  />
                ))}
              </div>

              {editMode && (
                <button
                  onClick={() => handleDeleteExercise(exercise.id)}
                  className="p-1 text-red-600"
                >
                  X
                </button>
              )}
            </div>
          );
        })}
        {editMode && (
          <button
            type="button"
            onClick={handleAddExercise}
            className="w-full rounded border border-bg-secondary"
          >
            Add Exercise
          </button>
        )}
      </div>

      <Link
        to="../myworkouts"
        onClick={() => deleteWorkout(workout.id)}
        className="bg-red-700 text-text-color px-5 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg"
      >
        Delete {id}
      </Link>
    </div>
  );
}
// Load data before page renders
export async function workoutLoader({ params }) {
  const workouts = JSON.parse(localStorage.getItem("workouts"));
  return workouts.find((workout) => workout.name === params.id);
}
