import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import HomePage from "./HomePage"
import ProfileCompletion from "./profile-completion"

async function checkProfileComplete(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/completeprofile?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch profile status');
    }
    const data = await response.json();
    return data.message === 'Profile is completed';
  } catch (error) {
    console.error('Error checking profile status:', error);
    return false;
  }
}


export default async function ProtectedHomePage() {
  const session = await auth()
  if (!session || !session.user?.email) {
    return redirect("/")
  }

  const profileComplete = await checkProfileComplete(session.user.email)

  if (!profileComplete) {
    return <ProfileCompletion />
  }

  return <HomePage />
}

