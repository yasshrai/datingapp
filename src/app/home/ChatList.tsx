"use client"

import { useEffect, useState } from "react"
import { chatService } from "@/app/service/ChatService"
import { useSession } from "next-auth/react"
import { fetchPartnerSingle } from "../actions/fetchPartner"
import type { Partner } from "@/types/partner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Chat {
  partner: string
  lastMessage: string
}

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const [partners, setPartners] = useState<{ [key: string]: Partner | null }>({})
  const { data: session } = useSession()
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

  return (
    <div>
      <ul className="space-y-4">
        {chats.map((chat, index) => (
          <li key={index} className="flex items-center space-x-4 cursor-pointer hover:bg-zinc-900 p-2 rounded">
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
    </div>
  )
}

export default ChatList

