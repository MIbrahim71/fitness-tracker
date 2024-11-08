import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import WorkoutContext from "../../context/WorkoutContext";
import { v4 as uuidv4 } from "uuid";

export default function WorkoutDetail() {
  const { id } = useParams();
  // const workout = useLoaderData();
  // const workoutName = workout.name;
  // const { workouts, updateWorkout, deleteWorkout } = useContext(WorkoutContext);
  // const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [localExercises, setLocalExercises] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
        setLocalExercises(data.exercises);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch workout details');
        setIsLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleAddExercise = () => {
    setLocalExercises((prevExercises) => [
      ...prevExercises,
      { id: "Ex" + uuidv4(), name: "", sets: 0, reps: 0, pb: "" },
    ]);
  };

  const handleDeleteExercise = (id) => {
    setLocalExercises((prevExercises) => 
      prevExercises.filter((exercise) => exercise.id !== id)
    );
  };

  const saveWorkoutChanges = async () => {
    const filteredExercises = localExercises.filter(
      (exercise) => exercise.name.trim() !== ""
    );

    const updatedWorkoutData = { ...workout, exercises: filteredExercises };
    try {
      await updateWorkout(id, updatedWorkoutData);
      setWorkout(updatedWorkoutData);
      setLocalExercises(filteredExercises);
      setEditMode(false);
    } catch (err) {
      setError('Failed to update workout');
    }
  };

  const handleUpdateExerciseField = (index, field, value) => {
    setLocalExercises((prevExercises) => {
      const updatedExercises = [...prevExercises];
      updatedExercises[index][field] = value;
      return updatedExercises;
    });
  };

  const handleDeleteWorkout = async () => {
    try {
      await deleteWorkout(id);
      navigate('/myworkouts');
    } catch (err) {
      setError('Failed to delete workout');
    }
  };

    // Loading screen
  if (isLoading) return <div className="text-text-color">Loading workout details...</div>;
  if (error) return <div className="text-text-color">{error}</div>;
  if (!workout) return <div className="text-text-color">Workout not found!</div>;
  // useEffect(() => {
  //   if (workouts && workouts.length > 0) {
  //     setIsLoading(false);
  //   }
  //   console.log(workout);
  // }, [workouts]);


  console.log(localExercises);

  return (
    <div className="flex flex-col w-[85%] h-[80%] mt-10 gap-10">
      <div className="w-full flex flex-row items-center justify-between">
        {/* <div className="flex items-center m-0"> */}
        <Link to="../myworkouts" className="pr-2 m-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="w-6 h-6 m-0 fill-text-color hover:fill-header-color cursor-pointer"
          >
            <path d="M16.752,23.994,6.879,14.121a3,3,0,0,1,0-4.242L16.746.012,18.16,1.426,8.293,11.293a1,1,0,0,0,0,1.414l9.873,9.873Z" />
          </svg>
        </Link>
        <h1 className="flex text-text-color text-3xl">
          {workoutName.charAt(0).toUpperCase() +
            workoutName.slice(1).toLowerCase()}
        </h1>

        <a
          onClick={() => {
            editMode ? saveWorkoutChanges() : setEditMode(true)
          }}
          className="m-0 cursor-pointer"
        >
          {editMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              className="w-8 h-8 fill-text-color hover:fill-header-color "
            >
              <path d="M19,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,19,0Zm3,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3Z" />
              <path d="M9.333,15.919,5.414,12A1,1,0,0,0,4,12H4a1,1,0,0,0,0,1.414l3.919,3.919a2,2,0,0,0,2.829,0L20,8.081a1,1,0,0,0,0-1.414h0a1,1,0,0,0-1.414,0Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-text-color hover:fill-header-color "
            >
              <path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z" />
              <path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z" />
            </svg>
          )}
        </a>
      </div>

      {/* Saved exercises component*/}
      <div className="flex flex-col items-center gap-3 w-full h-full">
        {localExercises.map((exercise, index) => {
          return (
            <div
              key={exercise.id}
              className="w-full flex flex-row items-center align-middle px-2 rounded-md bg-bg-secondary overflow-y-auto sm:text-xl"
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
            className="w-full rounded border border-bg-secondary mt-2"
          >
            Add Exercise
          </button>
        )}
      </div>

      <button
        onClick={handleDeleteWorkout}
        className="bg-red-700 text-text-color px-5 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      >
        Delete Workout
      </button>
    </div>
  );
}

