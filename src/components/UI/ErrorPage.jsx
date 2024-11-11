import React from "react";

export default function ErrorPage({message}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full">
      <div className="bg-red-500/10 rounded-lg p-6 max-w-md w-[85%]">
        <h2 className="text-red-500 text-xl mb-2">Error</h2>
        <p className="text-text-color">{message || 'Something went wrong!'}</p>
      </div>
    </div>
  );
}
