"use client"

import { formatDate } from "@/utils/formateDate"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
export interface Like {
  liker: string
  likerEmail: string
  likedEmail: string
  createdAt: string
}

interface LikedListProps {
  likes: Like[]
}

export default function LikedList({ likes }: LikedListProps) {
  const router = useRouter()
  if (likes.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No likes found for this email.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md md:max-w-2xl mx-auto h-[90vh] md:h-[80vh] bg-zinc-950">
      <CardHeader>
        <CardTitle>Likes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(90vh-5rem)] md:h-[calc(80vh-5rem)] pr-4">
          <ul className="space-y-4">
            {likes.map((like, index) => (
              <li key={index}>
                <Card>
                  <CardContent className="flex items-center space-x-4 p-4 bg-zinc-950">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${like.liker}`} alt={like.liker} />
                      <AvatarFallback>{like.liker.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1" onClick={()=> router.push(`/user/${like.likerEmail}`)}>
                      <p className="text-sm font-medium leading-none">{like.liker}</p>
                      <p className="text-sm text-muted-foreground">{like.likerEmail}</p>
                      <p className="text-xs text-muted-foreground">
                        Liked on: {formatDate(like.createdAt)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

