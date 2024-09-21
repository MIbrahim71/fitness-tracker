import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Layout from "./Layout";
import MyAccount from "./components/MyAccount/MyAccount";
import MyWorkouts from "./components/MyWorkouts/MyWorkouts";
import WorkoutDetail from "./components/MyWorkouts/WorkoutDetail/WorkoutDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // The Layout wraps the Navbar and route content
    children: [
      { index: true, element: <Home /> }, // This will render for '/' path
      { path: "/myworkouts", element: <MyWorkouts /> },
      { path: "/myworkouts/:id", element: <WorkoutDetail /> },

      { path: "/myaccount", element: <MyAccount /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
