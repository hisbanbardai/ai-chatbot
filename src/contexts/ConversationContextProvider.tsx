import { useEffect, useState } from "react";
import { ConversationContext } from "./ConversationContext";
import type {
  TConversation,
  TConversationContext,
  TConversations,
} from "../types";

const initialData = function () {
  const conversations = localStorage.getItem("conversations");

  if (conversations) {
    return JSON.parse(conversations);
  } else {
    const defaultData = [
      {
        id: Math.random().toString().slice(1),
        title: "How are you",
        messages: [
          "Hey my name is Clara!, How are you?",
          "Hi, Clara. I am doing well. I just got back fromt the gym. How about yourself?",
        ],
      },
    ];
    localStorage.setItem("conversations", JSON.stringify(defaultData));
    return defaultData;
  }
};

export default function ConversationContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [conversations, setConversations] = useState(initialData);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  const selectedConversation = conversations.find(
    (conversation: TConversation) => conversation.id === selectedConversationId
  );

  function handleSelectConversation(id: string) {
    setSelectedConversationId(id);
  }

  function updateConversation(message: string) {
    setConversations((prev: TConversations) => {
      return prev.map((conversation) => {
        if (conversation.id === selectedConversationId) {
          const shouldUpdateTitle = conversation.title === "Untitled";

          const updatedConversation = {
            ...conversation,
            title: shouldUpdateTitle ? message : conversation.title,
            messages: [...conversation.messages, message],
          };

          return updatedConversation;
        }
        return conversation;
      });
    });
  }

  function handleCreateConversation() {
    const newConv = {
      id: Math.random().toString().slice(2),
      title: "Untitled",
      messages: [],
    };

    setConversations((prev: TConversations) => [newConv, ...prev]);
    setSelectedConversationId(newConv.id);
  }

  function handleEditConversationTitle() {
    setIsEditing(true);
  }

  function handleSaveConversationTitle(title: string) {
    setConversations((prev: TConversations) =>
      prev.map((conversation) =>
        conversation.id === selectedConversation?.id
          ? { ...conversation, title: title }
          : conversation
      )
    );

    setIsEditing(false);
  }

  function handleDeleteConversation(id: string) {
    setConversations((prev: TConversations) =>
      prev.filter((conversation) => conversation.id !== id)
    );

    setSelectedConversationId(null);
  }

  const value: TConversationContext = {
    conversations,
    handleCreateConversation,
    selectedConversation,
    handleSelectConversation,
    handleEditConversationTitle,
    isEditing,
    handleSaveConversationTitle,
    setIsEditing,
    handleDeleteConversation,
    updateConversation,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}
