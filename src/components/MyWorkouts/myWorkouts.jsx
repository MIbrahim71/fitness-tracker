import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import WorkoutContext from "../../context/WorkoutContext";

export default function MyWorkouts() {
  const { workouts } = useContext(WorkoutContext);
  console.log("Workouts ", workouts);

  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 z-10">
      <div className="w-full">
        <h1 className="flex text-text-color text-3xl">My Workouts</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex-grow w-full flex mt-8">
          <ul className="w-full">
            {/* Safeguard against null/undefined workouts */}
            {Array.isArray(workouts) && workouts.length > 0 ? (
              workouts.map((workout) => (
                <Link
                  key={workout.id}
                  className="bg-bg-secondary flex mb-4 p-2 pl-4 pb-6 rounded cursor-pointer text-lg text-text-color"
                  to={`${encodeURIComponent(workout.name)}`}
                >
                  {workout.name}
                </Link>
              ))
            ) : (
              <p className="text-xl text-text-color opacity-40 text-center">
                No workouts added
              </p>
            )}
          </ul>
        </div>

        <Link to="addworkout">
          <button className="bg-header-color text-text-color px-5 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg">
            Add workout <span className="pl-2 font-semibold">+</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
