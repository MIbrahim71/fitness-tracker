import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Layout from "./Layout";
import MyAccount from "./components/MyAccount/MyAccount";
import MyWorkouts from "./components/MyWorkouts/MyWorkouts.jsx";
import WorkoutDetail, {
  workoutLoader,
} from "./components/MyWorkouts/WorkoutDetail/";
import ErrorPage from "./ErrorPage";
import { WorkoutProvider } from "./context/WorkoutContext";
import WorkoutForm from "./components/MyWorkouts/WorkoutForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // The Layout wraps the Navbar and route content
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, // This will render for '/' path
      { path: "myworkouts", element: <MyWorkouts /> },
      { path: "myworkouts/addworkout", element: <WorkoutForm /> },
      {
        path: "myworkouts/:id",
        element: <WorkoutDetail />,
        loader: workoutLoader,
      },
      { path: "/myaccount", element: <MyAccount /> },
    ],
  },
]);

function App() {
  return (
    <WorkoutProvider>
      <RouterProvider router={router} />
    </WorkoutProvider>
  );
}

export default App;
