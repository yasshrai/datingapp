import { database } from "@/app/firebase/config"
import { ref, push, set, onValue, off, query, orderByChild, limitToLast } from "firebase/database"

export interface Confession {
  name: string
  message: string
  timestamp: string
}

export const confessionService = {
  addConfession: (confession: Confession) => {
    const confessionsRef = ref(database, "confessions")
    const newConfessionRef = push(confessionsRef)
    return set(newConfessionRef, confession)
  },

  subscribeToConfessions: (callback: (confessions: Confession[]) => void, limit = 20) => {
    const confessionsRef = ref(database, "confessions")
    const recentConfessionsQuery = query(confessionsRef, orderByChild("timestamp"), limitToLast(limit))

    onValue(recentConfessionsQuery, (snapshot) => {
      const data = snapshot.val()
      const confessions = data ? Object.values(data).reverse() : []
      callback(confessions as Confession[])
    })

    return () => off(confessionsRef)
  },
}

