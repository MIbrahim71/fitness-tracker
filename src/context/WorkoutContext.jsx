import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([
    { id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: "" },
  ]);

  // const handleAddExercise = () => {
  //   setExercises((prevExercises) => [
  //     ...prevExercises,
  //     { id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: "" },
  //   ]);
  // };

  // const handleDeleteExercise = (id) => {
  //   const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
  //   setExercises(updatedExercises);
  // };

  // const updateExerciseField = (index, field, value) => {
  //   setExercises((prevExercises) => {
  //     const newExercises = [...prevExercises];
  //     newExercises[index][field] = value;
  //     return newExercises;
  //   });
  // };

  // const resetFormFields = () => {
  //   // Optionally reset form fields
  //   setExercises([{ id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: "" }]);
  // };

  // READ - Load workouts from localStorage when component mounts
  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    if (storedWorkouts) setWorkouts(storedWorkouts);
  }, []);

  // CREATE
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

  // UPDATE
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
      value={{
        workouts,
        exercises,
        setExercises,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        // handleAddExercise,
        // handleDeleteExercise,
        // updateExerciseField,
        // resetFormFields,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
