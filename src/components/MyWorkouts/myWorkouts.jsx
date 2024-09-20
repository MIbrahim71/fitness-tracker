import React from "react";

export default function MyWorkouts() {
  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 gap-12">
      <div className="w-full">
        <h1 className="flex text-yellow-300 text-3xl">My Workouts</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex-grow">Saved Workout</div>

        <div className="mt-auto mb-4">
          <button className="bg-orange-400 text-white px-5 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg">
            Add workout
          </button>
        </div>
      </div>
    </div>
  );
}
