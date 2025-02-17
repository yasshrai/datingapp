"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { chatService } from "@/app/service/ChatService"
import { useSession } from "next-auth/react"
import { fetchPartnerSingle } from "../actions/fetchPartner"
import type { Partner } from "@/types/partner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatWindow from "./Chatwindow"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Chat {
  partner: string
  lastMessage: string
}

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const [filteredChats, setFilteredChats] = useState<Chat[]>([])
  const [partners, setPartners] = useState<{ [key: string]: Partner | null }>({})
  const { data: session } = useSession()
  const [showChatWindow, setShowChatWindow] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const userEmail = session?.user?.email

  useEffect(() => {
    const fetchChatsAndPartners = async () => {
      if (userEmail) {
        try {
          const data = await chatService.getUserChats(userEmail)
          const chatList = Object.values(data || {})
          setChats(chatList)
          setFilteredChats(chatList)

          const partnerDetails = await Promise.all(
            chatList.map(async (chat) => {
              const partner = await fetchPartnerSingle(chat.partner)
              return { email: chat.partner, details: partner }
            }),
          )

          const partnerMap = partnerDetails.reduce(
            (acc, { email, details }) => {
              acc[email] = details
              return acc
            },
            {} as { [key: string]: Partner | null },
          )

          setPartners(partnerMap)
        } catch (error) {
          console.error("Error fetching chats and partners:", error)
        }
      }
    }

    fetchChatsAndPartners()
  }, [userEmail])

  useEffect(() => {
    const filtered = chats.filter(
      (chat) =>
        partners[chat.partner]?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredChats(filtered)
  }, [searchQuery, chats, partners])

  const handlePartnerSelect = (partner: Partner | null) => {
    setSelectedPartner(partner)
    setShowChatWindow(true)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      <ul className="space-y-4 overflow-auto min-h-[70vh] max-h-[70vh]  md:max-h-[50vh] custom-scrollbar">
        {filteredChats.map((chat, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 cursor-pointer hover:bg-zinc-900 p-2 rounded"
            onClick={() => handlePartnerSelect(partners[chat.partner])}
          >
            <Avatar>
              {partners[chat.partner]?.photos?.[0] ? (
                <AvatarImage src={partners[chat.partner]?.photos[0]} alt={partners[chat.partner]?.name || "User"} />
              ) : (
                <AvatarFallback>{partners[chat.partner]?.name?.[0] || chat.partner[0]}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <strong>{partners[chat.partner]?.name || chat.partner}</strong>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
      <Dialog open={showChatWindow} onOpenChange={setShowChatWindow}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chat with {selectedPartner?.name || "Partner"}</DialogTitle>
          </DialogHeader>
          {selectedPartner && <ChatWindow partner={selectedPartner} />}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ChatList

