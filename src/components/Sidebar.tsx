import Logo from "./Logo";
import toggleIcon from "../assets/Off.svg";
import createIcon from "../assets/Add_round_fill.svg";
import Conversation from "./Conversation";
import type { TConversation } from "../types";
import { useConversationContext } from "../hooks";

export default function Sidebar({
  handleSidebarToggle,
}: {
  handleSidebarToggle: () => void;
}) {
  const { conversations, handleCreateConversation } = useConversationContext();

  return (
    <div className="bg-[#141718] text-[#B3B7B9] h-full  pt-6 px-5 absolute top-0 left-0 w-[350px]">
      <header className="flex justify-between mb-8">
        <div>
          <Logo />
        </div>
        <div onClick={handleSidebarToggle} className="cursor-pointer">
          <img className="w-7" src={toggleIcon} alt="sidebar-toggle-icon" />
        </div>
      </header>
      <button
        onClick={handleCreateConversation}
        className="flex border-2 border-[rgba(109,114,117,0.2)] py-3 px-3 rounded-lg gap-4 items-center cursor-pointer mb-6 w-full"
      >
        <img src={createIcon} alt="create-chat-icon" />
        <p>New Chat</p>
      </button>
      <p className="text-white mb-4">Conversations</p>
      <div>
        {conversations.map((conversation: TConversation) => (
          <Conversation key={conversation?.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}
