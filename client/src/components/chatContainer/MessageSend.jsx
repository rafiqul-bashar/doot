import React from "react";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { nanoid } from "nanoid";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function MessageSend() {
  const [message, setMessage] = useState("");
  const uid = nanoid(4);
  const sendMessage = () => {
    socket.emit("chat", { message, uid });
    setMessage("");
  };
  return (
    <div className="flex items-center gap-4 py-4 px-8">
      <div className="grow-0 ">
        <GrEmoji className="w-10 h-10" />
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enter Message..."
        className=" py-2 px-4  bg-gray-50 dark:bg-[#323332] focus:outline-none md:w-[60%]"
      />
      <div
        onClick={() => sendMessage()}
        className="bg-primary p-1 w-fit dark:text-[#D7D6D6] "
      >
        <AiOutlineSend className="w-8 h-8" />
      </div>
    </div>
  );
}
