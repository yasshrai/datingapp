"use client"

import { useState, useEffect } from "react"
import { confessionService, type Confession } from "@/app/service/ConfessionService"

export default function ConfessionWall() {
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [likes, setLikes] = useState<Record<number, number>>({})

  useEffect(() => {
    const unsubscribe = confessionService.subscribeToConfessions(setConfessions)
    return () => unsubscribe()
  }, [])

  const toggleLike = (index: number) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }))
    setLikes((prev) => ({
      ...prev,
      [index]: liked[index] ? (prev[index] || 0) - 1 : (prev[index] || 0) + 1,
    }))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <h1 className="text-4xl font-extrabold text-white tracking-tight">Confession Wall</h1>

      <div className="grid gap-6 w-full max-w-3xl mt-10">
        {confessions.map((confession, index) => (
          <div
            key={index}
            className="relative p-6 rounded-xl bg-stone-950 backdrop-blur-md shadow-lg border border-white/10 text-white transition hover:scale-[1.015] hover:shadow-2xl duration-300"
          >
            <p className="text-left text-lg font-medium mb-4">{confession.message}</p>

            <div className="absolute bottom-4 left-5 text-xs text-gray-400">
              {new Date(confession.timestamp).toLocaleString("en-US", {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="text-right text-sm font-semibold text-gray-300 mt-2">
              {`- ${confession.name}`}
            </div>

            <div className="flex items-center gap-4 justify-end mt-4">
              <button
                onClick={() => toggleLike(index)}
                className="transition-all duration-300 transform hover:scale-110"
              >
                <i
                  className={`ri-poker-hearts-${liked[index] ? "fill" : "line"} ${
                    liked[index] ? "text-red-500" : "text-gray-400"
                  } text-xl transition-all duration-300`}
                ></i>
              </button>
              <span className="text-white text-sm">{likes[index] || 0}</span>
              <button className="text-gray-400 hover:text-white transition">
                <i className="ri-chat-1-line text-lg" />
              </button>
              <button className="text-gray-400 hover:text-white transition">
                <i className="ri-share-forward-line text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
