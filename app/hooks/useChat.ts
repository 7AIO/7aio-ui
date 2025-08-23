import { useState, useCallback, useEffect } from "react";
import type { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
// import { threadId } from "worker_threads";
import api, { API_URL } from "~/lib/api";
import { ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID } from '~/lib/voice';

export interface ChatMessage {
  role: "assistant" | "human";
  message: string;
}

interface apiThread {
  threadId: string;
}

interface apiHistoryMessage {
  actor: "ai" | "human";
  message: string;
  date: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadIds, setThreadIds] = useState<string[]>([]);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const createNewChat = useCallback(() => {
    const newId = uuidv4();
    setThreadIds((prev) => [newId, ...prev]);
    setCurrentThreadId(newId);
  }, []);

  const getInitialMessage = () => [
    {
      role: "assistant" as const,
      message:
        "Hi! I'm your AI learning assistant. How can I help you today? 👋",
    },
  ];

  const fetchThreadIds = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const response = await api.get("/api/ai/chat-histories/thread-ids");
      const threads: apiThread[] = response.data.data;
      const ids = threads.map((t) => t.threadId);
      setThreadIds(ids);

      if (ids.length > 0) {
        if (!currentThreadId) {
          setCurrentThreadId(ids[0]);
        }
      } else {
        const newId = uuidv4();
        setThreadIds([newId]);
        setCurrentThreadId(newId);
      }
    } catch (error) {
      console.error("Error fetching thread IDs:", error);
      const newId = uuidv4();
      setThreadIds([newId]);
      setCurrentThreadId(newId);
    } finally {
      setLoadingHistory(false);
    }
  }, [currentThreadId]);

  useEffect(() => {
    if (!currentThreadId) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/ai/chat-histories/${currentThreadId}`
        );
        const history: apiHistoryMessage[] = response.data.data;
        const formattedMessage: ChatMessage[] = history.map((h) => ({
          role: h.actor === "ai" ? "assistant" : "human",
          message: h.message,
        }));
        setMessages(
          formattedMessage.length > 0 ? formattedMessage : getInitialMessage()
        );
      } catch (error) {
        console.warn(
          `No history for thread ${currentThreadId}. Creating new thread`
        );
        setMessages(getInitialMessage());
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentThreadId]);

  const playElevenLabsAudio = async (text: string) => {
    setIsPlayingAudio(true);
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate audio from ElevenLabs");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => setIsPlayingAudio(false);
    } catch (error) {
      console.error("Error playing ElevenLabs audio:", error);
      setIsPlayingAudio(false);
    }
  };

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      // Add user message
      const userMessage: ChatMessage = {
        role: "human",
        message,
      };
      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);

      if (currentThreadId && !threadIds.includes(currentThreadId)) {
        setThreadIds((prev) => [currentThreadId, ...prev]);
      }

      try {
        let assistantMessage = "";

        try {
          const response = await api.post(
            "/api/ai/response/streaming",
            {
              message,
              threadId: currentThreadId,
            },
            {
              responseType: "stream",
              adapter: "fetch",
            }
          );

          const stream = response.data;
          const reader = stream
            .pipeThrough(new TextDecoderStream())
            .getReader();

          setMessages((prev) => [...prev, { role: "assistant", message: "" }]);

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            console.log("Received:", value);
            assistantMessage += value;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                message: assistantMessage,
              };
              return newMessages;
            });
          }
        } catch (error) {
          console.error(
            "Trying again with fallback stream for compability mode "
          );
          const response = await fetch(`${API_URL}/api/ai/response/streaming`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              message,
              threadId: currentThreadId,
            }),
          });

          if (!response.ok || !response.body) {
            throw new Error(
              `Failed to stream data: ${
                error instanceof Error ? error.message : error
              }`
            );
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          setMessages((prev) => [...prev, { role: "assistant", message: "" }]);

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            assistantMessage += decoder.decode(value, { stream: true });

            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                message: assistantMessage,
              };
              return newMessages;
            });
          }
        }
        // Once the AI response is complete, generate and play the audio
        if (assistantMessage) {
          await playElevenLabsAudio(assistantMessage);
        }
      } catch (error) {
        console.error("Streaming failed:", error);
        const errorMessage: ChatMessage = {
          role: "assistant",
          message: "Sorry, I couldn't get a response. Please try again.",
        };
        setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
      } finally {
        setLoading(false);
      }
    },
    [currentThreadId, threadIds]
  );

  return {
    messages,
    threadIds,
    currentThreadId,
    loading,
    loadingHistory,
    sendMessage,
    setCurrentThreadId,
    fetchThreadIds,
    createNewChat,
    isPlayingAudio,
  };
};
