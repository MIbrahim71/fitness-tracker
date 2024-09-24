import React from "react";

export default function MyAccount() {
  return (
    <div className="flex flex-col w-[80%] h-[80%] mt-10">
      <div className="w-full">
        <h1 className="flex text-text-color text-3xl">My Account</h1>
      </div>

      {/* Saved workouts component*/}
      <div className="flex flex-col items-center justify-between w-full h-full"></div>
    </div>
  );
}
