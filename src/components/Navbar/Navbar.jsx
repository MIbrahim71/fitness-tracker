import * as React from "react";
import { NavLink } from "react-router-dom";

import { homeIcon, dumbellIcon, userIcon } from "../../assets/assets";
export default function Navbar() {
  return (
    <div className="flex flex-row border justify-center rounded-md mt-4 bg-slate-50">
      <div className="flex flex-row items-center justify-between gap-4 w-[80%] ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "border" : "")}
        >
          <img
            className={`w-[42px] h-42px] hover:border duration-200`}
            src={homeIcon}
            alt=""
          />
        </NavLink>
        <NavLink
          to="MyWorkouts"
          className={({ isActive }) => (isActive ? "border" : "")}
        >
          <img
            className="w-[72px] h-[72px]  hover:border duration-200"
            src={dumbellIcon}
            alt=""
          />
        </NavLink>
        <NavLink
          to="MyAccount"
          className={({ isActive }) => (isActive ? "border" : "")}
        >
          <img
            className="w-[42px] h-[42px]  hover:border duration-200"
            src={userIcon}
            alt=""
          />
        </NavLink>
      </div>
    </div>
  );
}
