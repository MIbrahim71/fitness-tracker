import React from "react";
import { useState } from "react";
import WorkoutForm from "./WorkoutForm/WorkoutForm";

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Push Day" },
    { id: 2, name: "Pull Day" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 gap-12">
      <div className="w-full">
        <h1 className="flex text-orange-400 text-3xl">My Workouts</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex-grow w-full">
          <ul className="">
            {workouts.map((workout) => (
              <li
                key={workout.id}
                className="flex mb-2 p-2 rounded border cursor-pointer"
              >
                {workout.name}
              </li>
            ))}
          </ul>
        </div>
        {isModalOpen && <WorkoutForm />}

        <div className="mt-auto mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-400 text-white px-5 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg"
          >
            Add workout
          </button>
        </div>
      </div>
    </div>
  );
}
