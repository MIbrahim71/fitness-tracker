import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getWorkouts } from '../../services/workouts';
import Loading from "../UI/Loading";
import ErrorPage from "../UI/ErrorPage";



export default function MyWorkouts() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const data = await getWorkouts();
          setWorkouts(data);
          setLoading(false);
          setError("")
        } catch (error) {
          console.error('Failed to fetch workouts:', error);
          setError('Failed to fetch workouts. Please try again later.');
          if (error.response?.status === 401) {
            navigate('/auth');
          }
          setLoading(false);
        }
      };
  
      fetchWorkouts();
    }, [navigate]);


  // const { workouts } = useContext(WorkoutContext);
  console.log("Workouts ", workouts);
  if (loading) return <Loading/>
  if (error) return <ErrorPage message={error}/>

  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10 z-10">
      <div className="w-full">
        <h1 className="flex text-text-color text-3xl">My Workouts</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full">
        {/* Existing Workouts */}
        <div className="flex-grow w-full flex mt-8">
          <ul className="w-full">
            {/* Safeguard against null/undefined workouts */}
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <Link
                  key={workout._id}
                  className="bg-bg-secondary flex mb-4 p-2 pl-4 pb-6 rounded cursor-pointer text-lg text-text-color"
                  to={`${workout._id}`}
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

        {/* Add workout */}
        <Link to="addworkout">
          <button className="bg-header-color text-text-color px-5 py-2 rounded text-xl transition-transform duration-300 ease-in-out transform hover:scale-105  hover:shadow-lg">
            Add workout <span className="pl-2 font-semibold">+</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
