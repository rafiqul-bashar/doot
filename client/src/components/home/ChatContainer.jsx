import React from "react";
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
const messages = [
  {
    self: true,
    message: "Hello",
  },
  {
    self: false,
    message: "Hi",
  },
  {
    self: true,
    message: "Can i have a moment?",
  },
  {
    self: false,
    message: "Yes ,of course",
  },
  {
    self: false,
    message: "What do want to know?",
  },
  {
    self: true,
    message: "Can you lend me some money?",
  },
  {
    self: true,
    message: "Hello",
  },
  {
    self: false,
    message: "Hi",
  },
  {
    self: true,
    message: "Can i have a moment?",
  },
  {
    self: false,
    message: "Yes ,of course",
  },
  {
    self: false,
    message: "What do want to know?",
  },
  {
    self: true,
    message: "Can you lend me some money?",
  },
];

export default function ChatContainer({
  setChatOpen,
  chatOpen,
  currentChat,
  setCurrentChat,
}) {
  if (!chatOpen) return <WelcomeText />;
  const backBtn = () => {
    setCurrentChat("");
    setChatOpen(false);
  };

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
          {messages.map((message, i) => (
            <MessageComponent
              key={i}
              self={message.self}
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
