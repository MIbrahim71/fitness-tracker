import { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";
import WorkoutContext from "../../../context/WorkoutContext";

export default function WorkoutDetail() {
  const { id } = useParams();
  const workout = useLoaderData();
  const { workouts, deleteWorkout } = useContext(WorkoutContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workouts && workouts.length > 0) {
      setIsLoading(false);
    }
    console.log(workout);
  }, [workouts]);

  if (isLoading) {
    return <div>Loading workouts...</div>;
  }

  // console.log("ID-- ", id);
  if (!workout) {
    return <div>Workout not found!</div>;
  }

  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 gap-12">
      <div className="w-full">
        <h1 className="flex text-text-color text-3xl">{workout.name}</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full"></div>
      <Link
        to="../myworkouts"
        onClick={(id) => deleteWorkout(workout.id)}
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
