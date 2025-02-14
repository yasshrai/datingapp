"use client"

import { useEffect, useState } from "react"
import { chatService } from "@/app/service/ChatService"
import { useSession } from "next-auth/react"
import { fetchPartnerSingle } from "../actions/fetchPartner"
import type { Partner } from "@/types/partner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatWindow from "./Chatwindow"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Chat {
  partner: string
  lastMessage: string
}

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const [partners, setPartners] = useState<{ [key: string]: Partner | null }>({})
  const { data: session } = useSession()
  const [showChatWindow, setShowChatWindow] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const userEmail = session?.user?.email

  useEffect(() => {
    const fetchChatsAndPartners = async () => {
      if (userEmail) {
        try {
          const data = await chatService.getUserChats(userEmail)
          const chatList = Object.values(data || {})
          setChats(chatList)

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

  const handlePartnerSelect = (partner: Partner | null) => {
    setSelectedPartner(partner)
    setShowChatWindow(true)
  }

  return (
    <div>
      <ul className="space-y-4">
        {chats.map((chat, index) => (
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

