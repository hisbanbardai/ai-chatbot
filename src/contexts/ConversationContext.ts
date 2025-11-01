import { createContext } from "react";
import type { TConversationContext } from "../types";

export const ConversationContext = createContext<TConversationContext | null>(
  null
);
