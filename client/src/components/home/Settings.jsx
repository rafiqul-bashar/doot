import React from "react";

export default function Settings() {
  return (
    <div className="p-6 h-screen dark:bg-[#262626] ">
      <div>
        {" "}
        <h1 className="font-semibold tracking-wider text-lg mb-4">Settings </h1>
      </div>

      <div>
        Personal Info
        <div className="flex flex-col gap-4 p-3">
          <div>
            <label>Name</label>
            <h2>Rafiqul Bashar</h2>
          </div>
          <div>
            <label>Email</label>
            <h2>demo@mail.com</h2>
          </div>
        </div>
      </div>
      <div className="my-4">Change Password</div>
      <div>Log Out</div>
    </div>
  );
}
