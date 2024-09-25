import * as React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex flex-row border justify-center rounded-md mt-4 py-4 bg-text-color">
      <div className="flex flex-row items-center justify-between gap-4 w-[80%]">
        <NavLink
          to=""
          // className={(isActive) => (isActive ? "fill-header-color" : "")}
          className={({ isActive }) =>
            `w-[42px] h-[42px] duration-200 ${
              isActive ? "fill-header-color" : ""
            } hover:fill-header-color`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5Z" />
          </svg>
        </NavLink>

        <NavLink
          to="myworkouts"
          className={({ isActive }) =>
            `w-[42px] h-[42px] duration-200 ${
              isActive ? "fill-header-color" : ""
            } hover:fill-header-color`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="m8.5,0C5.467,0,3,2.467,3,5.5s2.467,5.5,5.5,5.5,5.5-2.467,5.5-5.5S11.533,0,8.5,0Zm0,7c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5.672,1.5,1.5-.672,1.5-1.5,1.5Zm15.5,13.857s-4.667,3.143-12,3.143S.009,18.762.009,18.762C.009,16.862.268,13.049,1.968,9.174c1.046,1.852,2.852,3.219,4.995,3.667-.098,1.184-.293,2.329-.676,3.293,1.402-1.282,3.836-3.133,6.213-3.133,2.125,0,4.122,1.94,4.14,1.96l1.492-1.332c-.043-.048-.523-.577-1.311-1.148.995-.743,2.303-1.48,3.602-1.48,2.095,0,3.577.5,3.577.5v9.357Z" />
          </svg>
        </NavLink>

        <NavLink
          to="myaccount"
          className={({ isActive }) =>
            `w-[42px] h-[42px] duration-200 ${
              isActive ? "fill-header-color" : ""
            } hover:fill-header-color`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="M12.006,12.309c3.611-.021,5.555-1.971,5.622-5.671-.062-3.56-2.111-5.614-5.634-5.637-3.561,.022-5.622,2.122-5.622,5.672s2.062,5.615,5.634,5.636Z" />
            <path d="M11.994,13.661c-5.328,.034-8.195,2.911-8.291,8.322-.004,.268,.099,.527,.287,.718s.445,.299,.713,.299h14.595c.268,0,.525-.108,.713-.299,.188-.191,.291-.45,.287-.718-.092-5.333-3.036-8.288-8.304-8.322Z" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
}
