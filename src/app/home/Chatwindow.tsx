import { useState, useEffect, useRef } from "react";
import type { Partner } from "@/types/partner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatService } from "@/app/service/ChatService";
import { useSession } from "next-auth/react";
import { Send } from "lucide-react";

export default function ChatWindow({ partner }: { partner: Partner }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { data: session } = useSession();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.user?.email && partner.email) {
      const unsubscribe = chatService.subscribeToChat(session.user.email, partner.email, (updatedMessages) => {
        setMessages(updatedMessages);
      });

      return () => unsubscribe();
    }
  }, [session?.user?.email, partner.email]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Instantly sets scroll to bottom without animation
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && session?.user?.email && partner.email) {
      chatService.sendMessage(session.user.email, partner.email, { sender: session.user.email, text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[70vh] max-h-[70vh] md:max-h-[50vh] rounded-lg shadow-lg bg-zinc-950">
      <div className="w-full flex flex-row gap-3 p-4 border-b border-zinc-800 ">
        <img src={partner.photos[0]} className="size-10 rounded-xl" alt={partner.name} />
        <h2 className="text-xl font-semibold text-zinc-100">{partner.name}</h2>
      </div>
      <div ref={messagesContainerRef} className="w-full flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.sender === session?.user?.email ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble  z-3 rounded-lg ${
                message.sender === session?.user?.email ? "bg-stone-950 text-zinc-100" : "bg-neutral-300 text-black"
              }`}
            >
              <p className="text-sm font-semibold mb-1 text-zinc-400">
                {message.sender === session?.user?.email ? "You" : partner.name}
              </p>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2 bg-zinc-800 text-zinc-100 border-zinc-700 focus:ring-zinc-600 focus:border-zinc-600 placeholder-zinc-500"
        />
        <Button type="submit" size="icon" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
