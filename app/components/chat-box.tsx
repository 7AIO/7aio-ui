import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Bot, LogIn, Send } from "lucide-react";
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useChat, type ChatMessage } from "~/hooks/useChat";
import { Link } from "react-router";
import type { IUser } from "~/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const ChatLog = ({
  role,
  message,
  picture,
}: {
  role: "assistant" | "human";
  message: string;
  picture?: string;
}) => {
  if (role === "assistant")
    return (
      <div className="flex w-full justify-start">
        <div className="max-w-[80%] flex items-start">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback className="bg-primary/20 text-primary">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="relative bg-secondary/70 rounded-2xl rounded-tl-none px-4 py-2 text-slate-200">
            <div
              className="absolute left-0 top-0 w-2 h-2 bg-secondary/70 -translate-x-full"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              }}
            />
            <p className="text-sm whitespace-pre-wrap">{message}</p>
          </div>
        </div>
      </div>
    );

  if (role === "human")
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-[80%] flex items-end">
          <div className="relative bg-primary/70 rounded-2xl rounded-br-none px-4 py-2 text-white">
            <div
              className="absolute right-0 top-0 w-2 h-2 bg-primary/70 translate-x-full"
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 0)",
              }}
            />
            <p className="text-sm whitespace-pre-wrap">{message}</p>
          </div>
          <Avatar className="h-8 w-8 ml-3">
            <AvatarImage src={picture} alt="User avatar" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
      </div>
    );

  return null;
};

export function ChatBox({ user }: { user: IUser }) {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTop =
        scrollAreaViewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="bg-card/50 w-full border-2 border-violet-500/30">
      <CardContent className="p-4">
        <ScrollArea className="h-[250px] px-2 mb-4" ref={scrollAreaViewportRef}>
          <div
            className="flex flex-col space-y-4"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, idx) => (
              <ChatLog
                key={idx}
                role={msg.role}
                message={msg.message}
                picture={msg.role === "human" ? user?.picture : undefined}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-end space-x-2 mt-4">
          <Textarea
            ref={inputRef}
            aria-label="Chat Message Input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-[50px] max-h-[100px] flex-1 resize-none rounded-lg text-sm"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            variant="default"
            className="size-12 rounded-lg bg-primary hover:bg-primary/90"
            disabled={!newMessage.trim()}
            aria-label="Send Message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export const ChatBoxCTA = () => (
  <Card className="bg-card/50 w-full border-2 text-center border-violet-500/30">
    <CardContent className="p-6 flex flex-col items-center gap-4">
      <h3 className="text-xl font-semibold text-slate-100">
        Unlock the AI Assistant
      </h3>
      <p className="text-slate-300 max-w-md">
        Login to start a conversation with your personal AI learning assistant
        and get instant help.
      </p>
      <Button
        asChild
        className="bg-button-gradient hover:scale-105 transform transition-all duration-200 glow-effect"
      >
        <Link to="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login to Chat
        </Link>
      </Button>
    </CardContent>
  </Card>
);
