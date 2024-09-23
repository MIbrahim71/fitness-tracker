import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import WorkoutContext from "../../context/WorkoutContext";
import WorkoutForm from "./WorkoutForm/WorkoutForm";

export default function MyWorkouts() {
  const { workouts, addWorkout } = useContext(WorkoutContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log(workouts);

  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 gap-12">
      <div className="w-full">
        <h1 className="flex text-orange-400 text-3xl">My Workouts</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex-grow w-full">
          <ul>
            {/* Safeguard against null/undefined workouts */}
            {Array.isArray(workouts) && workouts.length > 0 ? (
              workouts.map((workout) => (
                <Link
                  key={workout.id}
                  className="flex mb-2 p-2 rounded border cursor-pointer"
                  to={`workouts/${encodeURIComponent(workout.name)}`}
                >
                  {workout.name}
                </Link>
              ))
            ) : (
              <p>No workouts available</p>
            )}
          </ul>
        </div>
        {isModalOpen && <WorkoutForm closeModal={closeModal} />}

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
