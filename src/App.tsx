import { useState } from "react";
import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import toggleIcon from "./assets/Off.svg";
import { useConversationContext } from "./hooks";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedConversation } = useConversationContext();

  function handleSidebarToggle() {
    setIsOpen((prev) => !prev);
  }

  const mainWidth = isOpen ? "w-[calc(100%-350px)] ml-auto" : "";

  return (
    <div className={`grid grid-cols-[1fr] grid-rows-[200px_1fr] relative`}>
      <header className="w-full h-[200px] col-start-1 col-end-2 row-start-1 row-end-2 relative">
        <div
          onClick={handleSidebarToggle}
          className="cursor-pointer absolute top-3 left-2 bg-[#242627] p-2 rounded-lg"
        >
          <img className="w-7" src={toggleIcon} alt="sidebar-toggle-icon" />
        </div>
        <Hero />
      </header>

      {isOpen ? (
        <div className="col-start-1 col-end-2 row-start-1 row-end-3">
          <Sidebar handleSidebarToggle={handleSidebarToggle} />
        </div>
      ) : null}

      <main
        className={`min-h-[calc(100vh-200px)] ${mainWidth} bg-[#242627] col-start-1 col-end-2 row-start-2 row-end-3 `}
      >
        <div className="w-[800px] h-[500px] bg-[#242627] mx-auto relative">
          <Chat />
          {selectedConversation ? <ChatInput /> : null}
        </div>
      </main>
    </div>
  );
}

export default App;
