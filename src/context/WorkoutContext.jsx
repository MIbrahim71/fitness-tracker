import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Load workouts from localStorage when component mounts
  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    if (storedWorkouts) setWorkouts(storedWorkouts);
  }, []);

  // ADD
  const addWorkout = (workoutName, exercises) => {
    const newWorkout = {
      id: "Workout" + uuidv4(),
      name: workoutName,
      exercises,
    };

    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);

    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
  };

  // UPDATE - Save workouts to localStorage when they're changed
  const updateWorkout = (updatedWorkout) => {
    const updatedWorkouts = workouts.map((workout) => {
      return workout.id === updatedWorkout.id ? updatedWorkout : workout;
    });

    setWorkouts(updatedWorkouts);
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
  };

  // DELETE
  const deleteWorkout = (id) => {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);

    setWorkouts(updatedWorkouts);
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
  };

  return (
    <WorkoutContext.Provider
      value={{ workouts, addWorkout, updateWorkout, deleteWorkout }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
