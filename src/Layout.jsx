import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col max-w-[600px] h-screen items-center m-auto relative overflow-hidden">
      <Outlet />
      <div className="absolute bottom-0 w-[100%] z-50">
        <Navbar />
      </div>
    </div>
  );
}
