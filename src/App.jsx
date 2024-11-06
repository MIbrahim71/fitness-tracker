import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthForm from "./components/Login/AuthForm";
import Home from "./components/HomePage/Home";
import Layout from "./Layout";
import MyAccount from "./components/MyAccount/MyAccount";
import MyWorkouts from "./components/MyWorkouts/myWorkouts";
import WorkoutForm from "./components/MyWorkouts/WorkoutForm";
import WorkoutDetail, {
  // workoutLoader,
} from "./components/MyWorkouts/WorkoutDetail";
import { WorkoutProvider } from "./context/WorkoutContext";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthForm />,
  },
  {
    path: "/",
    element: <Layout />, // The Layout wraps the Navbar and route content
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { 
        element: <ProtectedRoute />,
        children: [
          { path: "myworkouts", element: <MyWorkouts /> },
          { path: "myworkouts/addworkout", element: <WorkoutForm /> },
          {
            path: "myworkouts/:id",
            element: <WorkoutDetail />,
          },
          { path: "myaccount", element: <MyAccount /> },
        ]
      },
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
