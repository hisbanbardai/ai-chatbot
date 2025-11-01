export type TConversation = {
  id: string;
  title: string;
  messages: string[];
};

export type TConversations = TConversation[];

export type TConversationContext = {
  conversations: TConversations;
  handleCreateConversation: () => void;
  selectedConversation: TConversation;
  handleSelectConversation: (id: string) => void;
  handleEditConversationTitle: () => void;
  isEditing: boolean;
  handleSaveConversationTitle: (id: string) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConversation: (id: string) => void;
  updateConversation: (message: string) => void;
};
