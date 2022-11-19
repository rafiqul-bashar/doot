import React from "react";
import { BiChat } from "react-icons/bi";
import { RiContactsFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BiMoon, BiSun } from "react-icons/bi";

export default function DesktopNavbar({
  theme,
  switchTheme,
  handlePageContents,
  pageContents,
}) {
  return (
    <div className={styles.navContainer}>
      <div className="flex flex-col gap-12 mt-12">
        <BiChat
          className={`cursor-pointer h-10 w-10 ${
            pageContents === "Chats" ? "text-primary" : "text-white"
          }`}
          onClick={() => handlePageContents("Chats")}
        />
        <RiContactsFill
          onClick={() => handlePageContents("Contacts")}
          className={`cursor-pointer h-10 w-10 ${
            pageContents === "Contacts" ? "text-primary" : "text-gray-400"
          }`}
        />
        <IoSettingsOutline
          onClick={() => handlePageContents("Settings")}
          className={`cursor-pointer h-10 w-10 ${
            pageContents === "Settings" ? "text-primary" : "text-gray-400"
          }`}
        />
        <div className="fixed bottom-12">
          {theme === "dark" ? (
            <BiSun
              className=" h-10 w-10 text-gray-400 cursor-pointer"
              onClick={switchTheme}
            />
          ) : (
            <BiMoon
              className=" h-10 w-10 text-gray-400 cursor-pointer"
              onClick={switchTheme}
            />
          )}
          <img
            onClick={() => handlePageContents("Profile")}
            src="/auth-img.png"
            alt="authImage"
            className="mt-5 h-12 w-12 rounded-full p-1"
          />
        </div>
      </div>
    </div>
  );
}
const styles = {};
styles.navContainer = `p-4 bg-[#2F2F2E] w-[10vh] h-screen`;
