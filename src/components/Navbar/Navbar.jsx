import * as React from "react";
import { NavLink } from "react-router-dom";

import { homeIcon, dumbellIcon, userIcon } from "../../assets/assets";
export default function Navbar() {
  return (
    <div className="flex flex-row border justify-center rounded-md mt-4 bg-slate-50">
      <div className="flex flex-row items-center justify-between gap-4 w-[80%] ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "bg-orange-300" : "")}
        >
          <a className="cursor-pointer">
            <img
              className={`w-[42px] h-42px] hover:bg-orange-300 duration-200`}
              src={homeIcon}
              alt=""
            />
          </a>
        </NavLink>
        <NavLink
          to="MyWorkouts"
          className={({ isActive }) => (isActive ? "bg-orange-300" : "")}
        >
          <a className="cursor-pointer">
            <img
              className="w-[72px] h-[72px]  hover:bg-orange-300 duration-200"
              src={dumbellIcon}
              alt=""
            />
          </a>
        </NavLink>
        <NavLink
          to="MyAccount"
          className={({ isActive }) => (isActive ? "bg-orange-300" : "")}
        >
          {" "}
          <a className="cursor-pointer">
            <img
              className="w-[42px] h-[42px]  hover:bg-orange-300 duration-200"
              src={userIcon}
              alt=""
            />
          </a>
        </NavLink>
      </div>
    </div>
  );
}
