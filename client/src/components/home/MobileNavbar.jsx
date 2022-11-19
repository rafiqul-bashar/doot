import React from "react";
import { BiChat } from "react-icons/bi";
import { RiContactsFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BiMoon, BiSun } from "react-icons/bi";
export default function MobileNavbar({
  theme,
  switchTheme,
  handlePageContents,
  pageContents,
}) {
  return (
    <div className={styles.navContainer}>
      <div className="flex items-center justify-evenly">
        <BiChat
          className={`cursor-pointer h-8 w-8 ${
            pageContents === "Chats" ? "text-primary" : "text-white"
          }`}
          onClick={() => handlePageContents("Chats")}
        />
        <RiContactsFill
          onClick={() => handlePageContents("Contacts")}
          className={`cursor-pointer h-8 w-8 ${
            pageContents === "Contacts" ? "text-primary" : "text-gray-400"
          }`}
        />
        <IoSettingsOutline
          onClick={() => handlePageContents("Settings")}
          className={`cursor-pointer h-8 w-8 ${
            pageContents === "Settings" ? "text-primary" : "text-gray-400"
          }`}
        />
        {theme === "dark" ? (
          <BiSun
            className="h-8 w-8 text-gray-400 cursor-pointer"
            onClick={switchTheme}
          />
        ) : (
          <BiMoon
            className="h-8 w-8 text-gray-400 cursor-pointer"
            onClick={switchTheme}
          />
        )}
        <img
          onClick={() => handlePageContents("Profile")}
          src="/auth-img.png"
          alt="authImage"
          className=" h-10 w-10 rounded-full p-1"
        />
      </div>
    </div>
  );
}

const styles = {};
styles.navContainer = `p-4 bg-[#2F2F2E] h-[10vh] md:h-[0vh]`;
