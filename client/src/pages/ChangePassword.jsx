import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ChangePassword() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePassword = () => {
    console.log({ userName, password });
  };
  return (
    <div className={styles.pageContainer}>
      <img
        src="/auth-img.png"
        alt="authImage"
        className="hidden md:block h-[380px]"
      />
      <main className={styles.container}>
        <div className="mx-auto max-w-sm  ">
          <div className="flex flex-col gap-2 text-center my-4">
            <h2 className="text-gray-700 font-normal text-3xl">
              Change Password
            </h2>
            <div className="rounded-full w-24 h-24 mx-auto  bg-primary/90 flex items-center justify-center my-4">
              <img
                src="/avatar.jpeg"
                alt="user-photo"
                className="rounded-full"
              />
            </div>
            <h4 className="text-gray-700 font-normal">User Name</h4>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-gray-600 font-normal">Old Password</label>
            <input
              className={styles.input}
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="Enter Old Password"
            />
            <label className="text-gray-600 font-normal">New Password</label>
            <input
              className={styles.input}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              type="password"
              placeholder="Enter New Password"
            />
            <label className="text-gray-600 font-normal">
              Confirm New Password
            </label>
            <input
              className={styles.input}
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Enter Confirm Password"
            />

            <div className="flex gap-4">
              <button onClick={handleChangePassword} className={styles.button}>
                Save
              </button>
              <button
                onClick={handleChangePassword}
                className="w-full bg-[#F6F7F8] py-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
const styles = {};
styles.pageContainer = `h-screen w-screen bg-[#4FAD6D] px-[4%] flex items-center`;
styles.container = `bg-[#FEFEFF] w-full px-[8%] py-12 md:w-[70%] md:mx-0 md:ml-auto rounded-lg `;
styles.input = `p-2 border-gray-400 outline-gray-600 border-solid border-[0.5px] focus:outline-none`;
styles.button = `w-full bg-primary py-3 text-white `;
