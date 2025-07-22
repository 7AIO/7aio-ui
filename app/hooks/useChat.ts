import { useState, useCallback } from "react";

export interface ChatMessage {
  role: "assistant" | "human";
  message: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      message: "Hi! I'm your AI learning assistant. How can I help you today? 👋",
    },
  ]);

  const sendMessage = useCallback((message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "human", message }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", message: "Thanks for your message! I'm a demo response. 🤖" }]);
    }, 1000);
  }, []);

  return { messages, sendMessage };
};

