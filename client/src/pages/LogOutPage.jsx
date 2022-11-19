import React from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
export default function LogOutPage() {
  return (
    <div className={styles.pageContainer}>
      <img
        src="/auth-img.png"
        alt="authImage"
        className="hidden md:block h-[380px]"
      />
      <main className={styles.container}>
        <div>
          <div className="rounded-full w-24 h-24 mx-auto  bg-primary/90 flex items-center justify-center">
            <BiUser size="4rem" color="white" />
          </div>
          <div className="mx-auto max-w-sm  ">
            <div className="flex flex-col gap-2 text-center my-4">
              <h2 className="text-gray-700 font-normal text-2xl">
                You are Logged Out
              </h2>
              <h4 className="text-gray-700 font-light">
                Thank you for using <span className="font-semibold">Doot</span>
              </h4>
            </div>
            <Link to="/auth-login">
              <button className={styles.button}>Log In</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
const styles = {};
styles.pageContainer = `h-screen w-screen bg-[#4FAD6D] px-[4%] flex items-center`;
styles.container = `bg-[#FEFEFF] w-full px-[8%] py-12 md:w-[70%] md:h-[90%] md:mx-0 md:ml-auto rounded-lg flex items-center justify-center`;
styles.input = `p-2 border-gray-400 outline-gray-600 border-solid border-[0.5px] focus:outline-none`;
styles.button = `w-full bg-primary py-3 text-white `;
