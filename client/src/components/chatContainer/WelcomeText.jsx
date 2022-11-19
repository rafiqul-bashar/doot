import React from "react";

export default function WelcomeText() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200 dark:bg-[#313131]">
      <div className="flex flex-col text-center gap-4">
        <img src="/logo.svg" alt="logo" className="h-20 w-20 mx-auto" />
        <h2 className="font-semibold my-4 text-3xl text-gray-500 dark:text-gray-300">
          Welcome to Doot Chat App
        </h2>
        <h2 className="font-normal text-xl text-gray-500">
          Click on a chat to continue
        </h2>
      </div>
    </div>
  );
}
