import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import MessageSend from "../chatContainer/MessageSend";
import WelcomeText from "../chatContainer/WelcomeText";

const MessageComponent = ({ self, message }) => {
  return (
    <div
      className={`dark:text-[#D7D6D6] text-[#495057] w-fit p-3 ${
        self
          ? "ml-auto  bg-[#CDE3D3] dark:bg-[#427F56]"
          : "dark:bg-[#383939] bg-[#FFFEFE] "
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default function ChatContainer({
  setChatOpen,
  chatOpen,
  currentChat,
  setCurrentChat,
}) {
  const [chats, setChats] = useState([]);
  const backBtn = () => {
    setCurrentChat("");
    setChatOpen(false);
  };

  console.log(chats);
  if (!chatOpen) return <WelcomeText />;
  return (
    <div className="h-full w-full bg-[#F3F2F3] text-[#5B6167] dark:text-[#ADB5BD] dark:bg-[#2F2F2E]">
      <div className="chatheader  h-[10vh] px-6 flex items-center gap-8">
        <AiOutlineArrowLeft
          onClick={backBtn}
          className="w-8 h-8 cursor-pointer"
        />
        <h2>{currentChat}</h2>
      </div>
      <div className="bg-gray-200 dark:bg-[#444444] h-[80vh] w-full p-6 overflow-auto">
        <div className="flex flex-col gap-4 ">
          {chats?.map((message, i) => (
            <MessageComponent
              key={i}
              self={message.uid === "uUak" ? true : false}
              message={message.message}
            />
          ))}
        </div>
      </div>
      <div className="bottom-0 fixed w-full h-[10vh] bg-[#F3F2F3] dark:bg-[#2F2F2E] ">
        <MessageSend />
      </div>
    </div>
  );
}
