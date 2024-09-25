import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col max-w-[600px] min-h-dvh items-center m-auto relative overflow-y-scroll">
      <Outlet />
      <div className="absolute bottom-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
}
