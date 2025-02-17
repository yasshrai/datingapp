"use server"

import dbConnect from "@/lib/mongodb"
import User from "@/model/User"
import { Partner } from "@/types/partner"


export async function fetchPartner(email: string) {
  await dbConnect()
  const decodedEmail = decodeURIComponent(email)
  const userdetails = await User.find({ email: decodedEmail })
  return userdetails
}


export async function fetchPartnerSingle(email: string): Promise<Partner | null> {
  await dbConnect()
  const decodedEmail = decodeURIComponent(email)
  const userDetails = await User.findOne({ email: decodedEmail })

  if (!userDetails) return null
  return {
    id: userDetails._id?.toString(),
    name: userDetails.name,
    email: userDetails.email,
    age: userDetails.age,
    course: userDetails.course,
    college: userDetails.college,
    year: userDetails.year,
    bio: userDetails.bio,
    description: userDetails.description,
    religion: userDetails.religion,
    diet: userDetails.diet,
    lookingFor: userDetails.lookingFor,
    smoker: userDetails.smoker,
    drinker: userDetails.drinker,
    communicationPreference: userDetails.communicationPreference,
    interests: userDetails.interests,
    photos: userDetails.photos,
  }
}