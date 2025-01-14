'use server'

import { auth } from "@/lib/auth"

export async function likePartner( email: String) {
  const session = await auth()
  const userEmail = session?.user?.email

  if (!userEmail) {
    throw new Error('User not authenticated')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ liker: session.user?.name, likerEmail: userEmail, likedEmail: email }),
  })

  if (!response.ok) {
    throw new Error('Failed to like partner')
  }

  return response.json()
}

