import { useState } from "react";
import sendIcon from "../assets/Send.svg";
import { useConversationContext } from "../hooks";

export default function ChatInput() {
  const { updateConversation, selectedConversation } = useConversationContext();
  const [userMessage, setUserMessage] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [error, setError] = useState("");

  async function fetchAiMsg(message: string) {
    setIsAiTyping(true);
    setError("");
    try {
      const response = await fetch(
        "https://ai-chatbot-backend.hisbanbardai.workers.dev/chat",
        {
          method: "POST",
          body: JSON.stringify({
            message: message,
            chat: selectedConversation.messages,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      updateConversation(data.message);
      setIsAiTyping(false);
    } catch (error) {
      console.error("Error while sending message:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }

      setIsAiTyping(false);
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userMessage) return;

    updateConversation(userMessage);
    await fetchAiMsg(userMessage);
    setUserMessage("");
    setIsAiTyping(false);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="-mt-1 bg-[#242627] relative">
        <input
          type="text"
          name="chat-input"
          id="chat-input"
          placeholder="Ask simplechat.ai anything"
          className="text-[#F6FCFD] placeholder:text-[#6D727580] w-full border-2 border-[#6D7275] px-4 py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          disabled={isAiTyping}
        />
        <button className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-2.5">
          <img className="w-5" src={sendIcon} alt="send-message-icon" />
        </button>
      </form>

      {error ? (
        <div className="flex gap-4">
          <p className="text-red-400">{error}</p>
          <button
            className="text-gray-400 cursor-pointer underline"
            onClick={() =>
              fetchAiMsg(
                selectedConversation.messages[
                  selectedConversation.messages.length - 1
                ]
              )
            }
          >
            Retry
          </button>
        </div>
      ) : null}
    </>
  );
}
