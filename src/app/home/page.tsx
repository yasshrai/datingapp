import HomePage from "./HomePage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation"


export default async function ProtectedHomePage() {
  const session = await auth()
  if (!session) { 

    return redirect("/") 
  }
  return <HomePage />
}

