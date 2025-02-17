import { database } from "@/app/firebase/config"
import { ref, push, set, onValue, off, update, get, Database } from "firebase/database"

// Function to encode email for Firebase-safe paths (Base64)
const encodeEmail = (email: string): string => {
  console.log("hi", email)
  return Buffer.from(email).toString("base64").replace(/=/g, "") // Encode
}

// Function to decode email back to its original form
const decodeEmail = (encoded: string): string => {
  return Buffer.from(encoded, "base64").toString("utf-8") // Decode
}

// Function to generate chat ID
const generateChatId = (email1: string, email2: string): string => {
  const sanitizedEmail1 = encodeEmail(email1)
  const sanitizedEmail2 = encodeEmail(email2)
  return `chats/${[sanitizedEmail1, sanitizedEmail2].sort().join("_")}`
}

export const chatService = {
  sendMessage: async (email1: string, email2: string, message: { sender: string; text: string }) => {
    const chatId = generateChatId(email1, email2)
    const chatRef = ref(database, `${chatId}/messages`)
    const newMessageRef = push(chatRef)

    await set(newMessageRef, message)

    // Save metadata for chat list
    const userChatUpdates: any = {}
    const timestamp = Date.now()

    userChatUpdates[`userChats/${encodeEmail(email1)}/${chatId}`] = {
      partner: encodeEmail(email2), // Store encoded partner email
      lastMessage: message.text,
      timestamp,
    }
    userChatUpdates[`userChats/${encodeEmail(email2)}/${chatId}`] = {
      partner: encodeEmail(email1), // Store encoded partner email
      lastMessage: message.text,
      timestamp,
    }

    return update(ref(database), userChatUpdates)
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



  getUserChats: async (email: string) => {
    const encodedEmail = encodeEmail(email);
    const userChatsRef = ref(database, `userChats/${encodedEmail}`);
    const snapshot = await get(userChatsRef);

    if (!snapshot.exists()) {
      console.log(`No chats found for user: ${email}`);
      return []; // Return an empty array instead of an empty object
    }

    const rawChats = snapshot.val();
    console.log("Raw Chats:", rawChats);

    const data = Object.values(rawChats)[0]
    // Extract chat data properly
    const userChats = Object.entries(data!).map(([chatId, chatData]: any) => ({
      chatId,
      partner: decodeEmail(chatData.partner),
      lastMessage: chatData.lastMessage,
      timestamp: chatData.timestamp,
    }));

    // Sort chats by timestamp (latest first)
    return userChats.sort((a, b) => b.timestamp - a.timestamp);
  }
}