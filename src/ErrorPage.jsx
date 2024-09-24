import React from "react";
import Navbar from "./components/Navbar/navbar";

export default function ErrorPage() {
  return (
    <>
      <div className="mt-12 text-3xl">Page Not Found</div>
      <div className="absolute bottom-0 w-[100%] ">
        <Navbar />
      </div>
    </>
  );
}
