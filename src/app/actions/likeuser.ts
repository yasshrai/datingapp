'use server'

import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/model/User"

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


export async function fetchPartner(email: string) {
  await dbConnect()
  const decodedEmail = decodeURIComponent(email)
  const userdetails = await User.find({ email: decodedEmail })
  return userdetails
}

