"use client"

import { useState, useEffect } from "react"
import { confessionService, type Confession } from "@/app/service/ConfessionService"


export default function ConfessionWall() {
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [likes, setLikes] = useState<Record<number, number>>({});


  useEffect(() => {
    const unsubscribe = confessionService.subscribeToConfessions(setConfessions)
    return () => unsubscribe()
  }, [])

 
    const toggleLike = (index: number) => {
  setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
    setLikes((prev) => ({
    ...prev,
    [index]: liked[index] ? (prev[index] || 0) - 1 : (prev[index] || 0) + 1,
  }));
};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
    <h1 className="text-4xl font-extrabold text-white">Confession Wall</h1>

    <div className="grid gap-6 w-full max-w-3xl mt-8">
      {confessions.map((confession, index) => (
        <div
          key={index}
          className="relative p-6 rounded-xl  bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 text-white"
        >
          <div className="text-left text-lg font-medium">
            {confession.message}
          </div>

          <div className="absolute bottom-4 left-5 text-xs text-gray-400">
            {new Date(confession.timestamp).toLocaleString("en-US", {
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          <div className="text-right text-sm w-full font-semibold text-gray-300">
            {`- ${confession.name}`}
          </div>
          <div className="flex gap-2 justify-end -mb-4">
          <button 
            className="transition-all duration-300"
            onClick={() => {
           toggleLike(index);
            }}
          >
            <i
                className={`ri-poker-hearts-${liked[index] ? "fill text-red-500 scale-110" : "line text-gray-400"} h-10 w-10 transition-all duration-300`}
            ></i>
          </button>
           <span className="text-white text-sm">{likes[index] || 0}</span>
          <button>
            <i className="ri-chat-1-line"></i>
          </button>
          <button>
            <i className="ri-share-forward-line"></i>
          </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}                                                                                                             