import React from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { contacts } from "../../staticInfos";

export default function Contacts({ handleCurrentChat, currentChat }) {
  return (
    <div className="h-screen p-6  dark:bg-[#262626] ">
      <div className={styles.chatsHeader}>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold tracking-wider text-lg">Contacts</h1>
          <AiOutlinePlus className="h-8 w-8 text-primary" />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full py-2 px-4  bg-gray-200 dark:bg-[#2F2F2E] focus:outline-none"
          />
          <AiOutlineSearch
            onClick={() => alert("search")}
            className="h-5 w-5 absolute right-4 top-3 z-10"
          />
        </div>
      </div>
      {/* Render Chats Here */}

      <div className="h-[80vh] py-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
        <div className="flex flex-col gap-4">
          <h2 className="mt-4">All Contacts</h2>
          {contacts?.map((el, i) => (
            <div
              onClick={() => handleCurrentChat(el.name)}
              key={i}
              className={`flex cursor-pointer items-center gap-4 p-2 ${
                currentChat === el.name ? "bg-primary" : null
              }`}
            >
              <img src={el.img} alt={el.name} className="h-8 w-8" />
              <h2>{el.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const styles = {};
styles.chatsHeader = "flex flex-col gap-4 h-[10vh] w-full  dark:bg-[#262626] ";
