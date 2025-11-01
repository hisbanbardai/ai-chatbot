import { useEffect, useRef } from "react";
import AiMessage from "./AiMessage";
import UserMessage from "./UserMessage";
import { useConversationContext } from "../hooks";

export default function Chat() {
  const { selectedConversation } = useConversationContext();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [selectedConversation?.messages]);

  return (
    <div
      ref={chatContainerRef}
      className="h-full border-2 border-[rgba(109,114,117,0.2)] text-[#F6FCFD] mx-auto -mt-[130px] rounded-md overflow-y-scroll no-scrollbar pb-8 pr-4"
    >
      {!selectedConversation ? (
        <p className="flex justify-center items-center h-full text-2xl text-gray-400">
          Create a new chat or select an existing one!
        </p>
      ) : (
        selectedConversation.messages.map((message: string, index: number) =>
          index % 2 === 0 ? (
            <UserMessage
              key={`${selectedConversation.id}-${index}`}
              message={message}
            />
          ) : (
            <AiMessage
              key={`${selectedConversation.id}-${index}`}
              message={message}
            />
          )
        )
      )}
    </div>
  );
}
