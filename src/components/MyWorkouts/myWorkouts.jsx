import React from "react";
import { useState } from "react";
import WorkoutForm from "./WorkoutForm/WorkoutForm";

export default function MyWorkouts() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Push Day" },
    { id: 2, name: "Pull Day" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addWorkout = (name, exercises) => {
    const newWorkout = { id: Date.now(), name, exercises };
    setWorkouts([...workouts, newWorkout]);
    closeModal();
  };

  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 gap-12">
      <div className="w-full">
        <h1 className="flex text-orange-400 text-3xl">My Workouts</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex-grow w-full">
          <ul>
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
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="flex flex-col items-center bg-bg-color w-[80%] h-[70%] p-6 rounded shadow-lg z-60"
              onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up to the backdrop
            >
              <WorkoutForm addWorkout={addWorkout} closeModal={closeModal} />
            </div>
          </div>
        )}

        <div className="">
          <button
            onClick={openModal}
            className="bg-orange-400 text-white px-5 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg"
          >
            Add workout
          </button>
        </div>
      </div>
    </div>
  );
}
