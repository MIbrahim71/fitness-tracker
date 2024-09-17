import React from "react";

import { homeIcon, dumbellIcon, userIcon } from "../../assets/assets";
export default function Navbar() {
  return (
    <div className="flex flex-row items-center justify-center border rounded-md mt-4 bg-slate-50">
      <div className="flex flex-row items-center justify-between gap-4 w-[80%] ">
        <a className="cursor-pointer">
          <img className="w-[42px] h-42px]" src={homeIcon} alt="" />
        </a>

        <a className="cursor-pointer">
          <img className="w-[72px] h-[72px]" src={dumbellIcon} alt="" />
        </a>
        <a className="cursor-pointer">
          <img className="w-[42px] h-[42px]" src={userIcon} alt="" />
        </a>
      </div>
    </div>
  );
}
