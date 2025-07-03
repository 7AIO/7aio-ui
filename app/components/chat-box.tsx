import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "assistant" | "human";
  message: string;
}

export const ChatLog = ({
  role,
  message,
}: {
  role: "system" | "assistant" | "human" | string;
  message: string;
}) => {
  if (role === "system") return null;
  
  if (role === "assistant")
    return (
      <div className="flex w-full justify-start">
        <div className="max-w-[80%] flex items-start">
          <div className="relative bg-cyan-300 rounded-2xl rounded-tl-none px-4 py-2">
            <div
              className="absolute left-0 top-0 w-2 h-2 bg-cyan-300 -translate-x-full"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              }}
            />
            <p className="text-sm whitespace-pre-wrap">
              {message}
            </p>
          </div>
        </div>
      </div>
    );

  if (role === "human")
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-[80%] flex items-end">
          <div className="relative bg-blue-300 rounded-2xl rounded-tr-none px-4 py-2">
            <div
              className="absolute right-0 top-0 w-2 h-2 bg-blue-300 translate-x-full"
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 0)",
              }}
            />
            <p className="text-sm whitespace-pre-wrap">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
    
  return null;
};

export function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      message: "Hi! I'm your AI learning assistant. How can I help you today? 👋",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "human", message: newMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        message: "Thanks for your message! I'm a demo response. 🤖"
      }]);
    }, 1000);
    
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-full border-2">
      <CardContent className="p-4">
        <ScrollArea className="h-[200px] min:h-[250px] px-2 mb-4">
          <div className="flex flex-col space-y-4" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <ChatLog
                key={idx}
                role={msg.role}
                message={msg.message}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-end space-x-2 mt-4">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-[50px] max-h-[100px] flex-1 resize-none rounded-lg text-sm"
          />
          <Button 
            onClick={handleSendMessage}
            size="icon" 
            className="h-[50px] w-[50px] rounded-lg"
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
