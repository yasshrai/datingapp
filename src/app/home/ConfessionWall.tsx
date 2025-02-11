"use client"

import { useState, useEffect } from "react"
import { confessionService, type Confession } from "@/app/service/ConfessionService"
import { HeartIcon, LaughIcon, Frown } from "lucide-react"

export default function ConfessionWall() {
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [reactions, setReactions] = useState<Record<number, string>>({})

  useEffect(() => {
    const unsubscribe = confessionService.subscribeToConfessions(setConfessions)
    return () => unsubscribe()
  }, [])

  const handleReaction = (index: number, emoji: string) => {
    setReactions((prev) => ({ ...prev, [index]: emoji }))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <h1 className="text-4xl font-extrabold text-white">Confession Wall</h1>

      <div className="grid gap-6 w-full max-w-3xl mt-8">
        {confessions.map((confession, index) => (
          <div
            key={index}
            className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 text-white"
          >
            <div className="absolute top-4 left-4 text-sm font-semibold text-gray-300">
              {confession.name}
            </div>
            <div className="text-center text-lg mt-6 font-medium">
              {confession.message}
            </div>
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              {new Date(confession.timestamp).toLocaleString("en-US", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Emoji Reactions */}
            <div className="mt-4 flex justify-center space-x-3">
              <button onClick={() => handleReaction(index, "❤️")}>
                <HeartIcon className="w-6 h-6 text-red-400 hover:scale-110 transition" />
              </button>
              <button onClick={() => handleReaction(index, "😂")}>
                <LaughIcon className="w-6 h-6 text-gray-200 hover:scale-110 transition" />
              </button>
              <button onClick={() => handleReaction(index, "😢")}>
                <Frown className="w-6 h-6 text-gray-400 hover:scale-110 transition" />
              </button>
            </div>

            {reactions[index] && (
              <div className="text-center mt-2 text-lg">{reactions[index]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
