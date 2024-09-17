import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/HomePage/Home";
import MyAccount from "./components/MyAccount/MyAccount";
import MyWorkouts from "./components/MyWorkouts/myWorkouts";
import Navbar from "./components/Navbar/navbar";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/MyWorkouts", element: <MyWorkouts /> },
  { path: "/MyAccount", element: <MyAccount /> },
]);

function App() {
  return (
    <div className="flex flex-col max-w-[700px] h-screen items-center m-auto relative">
      <RouterProvider router={router} />
      <div className="absolute bottom-0 left-0 w-[100%]">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
