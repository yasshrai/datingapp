"use server"

import dbConnect from "@/lib/mongodb"
import User from "@/model/User"

export async function fetchPartner(email: string) {
    await dbConnect()
    const decodedEmail = decodeURIComponent(email)
    const userdetails = await User.find({ email: decodedEmail })
    return userdetails
  }