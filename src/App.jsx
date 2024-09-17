import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Layout from "./components/Layout";
import MyAccount from "./components/MyAccount/MyAccount";
import MyWorkouts from "./components/MyWorkouts/myWorkouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // The Layout wraps the Navbar and route content
    children: [
      { index: true, element: <Home /> }, // This will render for '/' path
      { path: "/MyWorkouts", element: <MyWorkouts /> },
      { path: "/MyAccount", element: <MyAccount /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
