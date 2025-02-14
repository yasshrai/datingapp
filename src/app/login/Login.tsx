"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"

const Login = () => {
  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-purple-950 to-indigo-950 border-0 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-white">
          <div className="relative inline-block">
            <Heart className="inline-block mr-2 text-pink-500 animate-pulse" size={32} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
          </div>
          Campus Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-gray-300">Connect with your love</p>
        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            onClick={() => signIn("google", { redirectTo: "/home" })}
            className="bg-white text-purple-950 hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 font-semibold py-3 rounded-full shadow-md"
          >
            Continue With Google
          </Button>
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-400">By continuing, you agree to our</span>
          <br />
          <a href="#" className="text-sm text-pink-400 hover:text-pink-300 transition-colors duration-200">
            Terms of Service
          </a>
          <span className="text-sm text-gray-400"> and </span>
          <a href="#" className="text-sm text-pink-400 hover:text-pink-300 transition-colors duration-200">
            Privacy Policy
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default Login

