import { useContext } from "react";
import { ConversationContext } from "./contexts/ConversationContext";

export const useConversationContext = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      "You are trying to use Conversation Context inside a component that is not wrapped by ConversationContextProvider"
    );
  }

  return context;
};
