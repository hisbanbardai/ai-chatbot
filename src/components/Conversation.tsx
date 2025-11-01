import chatIcon from "../assets/Chat_fill.svg";
import editIcon from "../assets/Edit.svg";
import deleteIcon from "../assets/Trash.svg";
import doneIcon from "../assets/Done_round.svg";
import closeIcon from "../assets/Close_round.svg";
import type { TConversation } from "../types";
import { useConversationContext } from "../hooks";

export default function Conversation({
  conversation,
}: {
  conversation: TConversation;
}) {
  const {
    handleSelectConversation,
    selectedConversation,
    handleEditConversationTitle,
    isEditing,
    handleSaveConversationTitle,
    setIsEditing,
    handleDeleteConversation,
  } = useConversationContext();

  const isSelected = selectedConversation?.id === conversation.id;

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedTitle = formData.get("edit-title-input");

    if (!updatedTitle) return;

    handleSaveConversationTitle(updatedTitle as string);
  }

  return (
    <div
      className={`flex justify-between ${
        isSelected ? "bg-[#242627]" : ""
      } gap-2 px-4 py-3 rounded-lg mb-4 cursor-pointer`}
      onClick={() => handleSelectConversation(conversation.id)}
    >
      <div className="flex gap-2">
        <img src={chatIcon} alt="chat-icon" />
        {isSelected && isEditing ? (
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              className="w-full border pl-1 py-1"
              type="text"
              name="edit-title-input"
              defaultValue={conversation.title}
              required
            />
            <button type="submit" className="cursor-pointer">
              <img className="w-8" src={doneIcon} alt="save-title-icon" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="cursor-pointer"
            >
              <img
                className="w-8"
                src={closeIcon}
                alt="close-edit-title-icon"
              />
            </button>
          </form>
        ) : (
          <p>{conversation.title}</p>
        )}
      </div>
      {isSelected && !isEditing && (
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditConversationTitle();
            }}
            className="w-6 cursor-pointer"
          >
            <img src={editIcon} alt="edit-chat-icon" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteConversation(conversation.id);
            }}
            className="cursor-pointer"
          >
            <img src={deleteIcon} alt="delete-chat-icon" />
          </button>
        </div>
      )}
    </div>
  );
}
