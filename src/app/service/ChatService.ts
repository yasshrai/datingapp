import { database } from "@/app/firebase/config"
import { ref, push, set, onValue, off } from "firebase/database"

// Function to sanitize email for Firebase paths
const sanitizeEmail = (email: string): string => {
  return email.replace(/[.#$[\]]/g, "_")
}

// Function to generate chat ID
const generateChatId = (email1: string, email2: string): string => {
  const sanitizedEmail1 = sanitizeEmail(email1)
  const sanitizedEmail2 = sanitizeEmail(email2)
  return `chats/${[sanitizedEmail1, sanitizedEmail2].sort().join("_")}`
}

export const chatService = {
  sendMessage: (email1: string, email2: string, message: { sender: string; text: string }) => {
    const chatId = generateChatId(email1, email2)
    const chatRef = ref(database, `${chatId}/messages`)
    const newMessageRef = push(chatRef)
    console.log(newMessageRef)
    return set(newMessageRef, message)
  },

  subscribeToChat: (email1: string, email2: string, callback: (messages: any[]) => void) => {
    const chatId = generateChatId(email1, email2)
    const chatRef = ref(database, `${chatId}/messages`)

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val()
      const messages = data ? Object.values(data) : []
      callback(messages)
    })

    return () => off(chatRef)
  },
}

