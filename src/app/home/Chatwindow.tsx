import { useState, useEffect, useRef } from "react"
import type { Partner } from "@/types/partner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { chatService } from "@/app/service/ChatService"
import { useSession } from "next-auth/react"
import { Send } from "lucide-react"

export default function ChatWindow({ partner }: { partner: Partner }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { data: session } = useSession()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (session?.user?.email && partner.email) {
      const unsubscribe = chatService.subscribeToChat(session.user.email, partner.email, (updatedMessages) => {
        setMessages(updatedMessages)
      })

      return () => unsubscribe()
    }
  }, [session?.user?.email, partner.email])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && session?.user?.email && partner.email) {
      chatService.sendMessage(session.user.email, partner.email, { sender: session.user.email, text: newMessage })
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-zinc-950 rounded-lg shadow-lg">
      <div className="bg-zinc-900 p-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold text-zinc-100">{partner.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === session?.user?.email ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === session?.user?.email ? "bg-zinc-800 text-zinc-100" : "bg-zinc-900 text-zinc-200"
              }`}
            >
              <p className="text-sm font-semibold mb-1 text-zinc-400">
                {message.sender === session?.user?.email ? "You" : partner.name}
              </p>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
  )
}

