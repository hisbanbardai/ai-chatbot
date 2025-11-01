import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ConversationContextProvider from "./contexts/ConversationContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConversationContextProvider>
      <App />
    </ConversationContextProvider>
  </StrictMode>
);
