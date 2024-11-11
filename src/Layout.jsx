import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col max-w-[600px] min-h-dvh items-center m-auto relative">
      <div className="flex-1 w-full overflow-y-auto pb-24">
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full max-w-[600px] z-50">
        <Navbar />
      </div>
    </div>
  );
}
