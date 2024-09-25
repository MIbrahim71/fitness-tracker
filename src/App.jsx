import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Layout from "./Layout";
import MyAccount from "./components/MyAccount/MyAccount";
import MyWorkouts from "./components/MyWorkouts/myWorkouts";
import WorkoutDetail, {
  workoutLoader,
} from "./components/MyWorkouts/WorkoutDetail";
import { WorkoutProvider } from "./context/WorkoutContext";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // The Layout wraps the Navbar and route content
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, // This will render for '/' path
      { path: "myworkouts", element: <MyWorkouts /> },
      { path: "myworkouts/addworkout", element: },
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
