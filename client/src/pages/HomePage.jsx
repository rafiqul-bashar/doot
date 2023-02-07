import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  MobileNavbar,
  Chats,
  Contacts,
  Settings,
  Profile,
  ChatContainer,
  DesktopNavbar,
} from "../components";

// socket stuffs here

export default function HomePage({ user = true, theme, switchTheme }) {
  const [pageContents, setPageContents] = useState("Chats");
  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState("");

  const handlePageContents = (content) => {
    setPageContents(content);
  };

  const renderPageContent = (contents) => {
    switch (contents) {
      case "Chats":
        return (
          <Chats
            handleCurrentChat={handleCurrentChat}
            currentChat={currentChat}
          />
        );
      case "Contacts":
        return (
          <Contacts
            handleCurrentChat={handleCurrentChat}
            currentChat={currentChat}
          />
        );
      case "Settings":
        return <Settings />;
      case "Profile":
        return <Profile />;
      default:
        return (
          <Chats
            handleCurrentChat={handleCurrentChat}
            currentChat={currentChat}
          />
        );
    }
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate("/auth-login");
    }
  }, []);

  const handleCurrentChat = (e) => {
    if (e) {
      setCurrentChat(e);
    } else {
      setCurrentChat("");
    }
    setChatOpen(true);
  };

  return (
    <div className={styles.pageContainer}>
      <div className="flex">
        <div className={styles.nav}>
          <DesktopNavbar
            theme={theme}
            switchTheme={switchTheme}
            handlePageContents={handlePageContents}
            pageContents={pageContents}
          />
        </div>
        <div className="grid grid-cols-4 w-screen">
          <div className="col-span-4 bg-gray-100 md:col-span-1">
            {renderPageContent(pageContents)}
          </div>

          <div
            className={` md:block md:col-span-3 ${
              currentChat ? "absolute top-0 w-full md:w-[72%] right-0" : "hidde"
            }`}
          >
            <ChatContainer
              setCurrentChat={setCurrentChat}
              setChatOpen={setChatOpen}
              chatOpen={chatOpen}
              currentChat={currentChat}
            />
          </div>
        </div>
      </div>

      <div className={styles.mobilenav}>
        <MobileNavbar
          theme={theme}
          switchTheme={switchTheme}
          handlePageContents={handlePageContents}
          pageContents={pageContents}
        />
      </div>
    </div>
  );
}

const styles = {};
styles.pageContainer = `h-screen w-screen dark:bg-[#262626] dark:text-white relative`;
styles.nav = `hidden md:block w-fit `;
styles.mobilenav = `fixed md:hidden bottom-0  w-full`;
