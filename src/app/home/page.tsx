import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import HomePage from "./HomePage"
import ProfileCompletion from "./profile-completion"

async function isProfileComplete(userId: string): Promise<boolean> {
  console.log(userId)
  await new Promise(resolve => setTimeout(resolve, 100))
  return false
}

export default async function ProtectedHomePage() {
  const session = await auth()
  if (!session) {
    return redirect("/")
  }

  const profileComplete = await isProfileComplete("hi")

  if (!profileComplete) {
    return <ProfileCompletion />
  }

  return <HomePage />
}

