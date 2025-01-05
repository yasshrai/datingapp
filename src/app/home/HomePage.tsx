'use client'

import { useState } from 'react'
import Link from 'next/link'
import {  AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, User, Menu,LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"
import PartnerCard from './Partnercard'


export interface Partner {
  id: number
  name: string
  age: number
  course: string
  college: string
  year: number
  bio: string
  description: string
  diet: string
  interests: string[]
  photos: string[]
}


const partners: Partner[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    bio: "moody",
    age: 22,
    course: 'Computer Science',
    college: 'renaissnace university',
    year: 3,
    description: 'Passionate about coding and AI. Love to explore new technologies and push the boundaries of what\'s possible with software.',
    diet: 'Vegetarian',
    interests: ['Technology', 'Music', 'Hiking', 'Photography'],
    photos: ['https://images.pexels.com/photos/1105058/pexels-photo-1105058.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/792326/pexels-photo-792326.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1564868/pexels-photo-1564868.jpeg?auto=compress&cs=tinysrgb&w=600']
  },
  {
    id: 2,
    name: 'Bob Smith',
    age: 23,
    bio: "foody",
    course: 'Business Administration',
    college: 'renaissnace university',
    year: 1,
    description: 'Aspiring entrepreneur with a love for startups and innovation. Always looking for new business ideas and networking opportunities.',
    diet: 'Non-vegetarian',
    interests: ['Entrepreneurship', 'Sports', 'Travel', 'Reading'],
    photos: ['https://images.pexels.com/photos/220474/pexels-photo-220474.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600']
  },
  {
    id: 3,
    name: 'pat Smith',
    age: 23,
    bio: "foody",
    course: 'Business Administration',
    college: 'renaissnace university',
    year: 1,
    description: 'Aspiring entrepreneur with a love for startups and innovation. Always looking for new business ideas and networking opportunities.',
    diet: 'Non-vegetarian',
    interests: ['Entrepreneurship', 'Sports', 'Travel', 'Reading'],
    photos: ['https://media.istockphoto.com/id/624129686/photo/portrait-boy.jpg?s=612x612&w=0&k=20&c=bzU5INObuqZyjRv-WlzJNG-GY96D1i5NsrbZg1cm-34=', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600']
  },
]


export default function HomePage() {
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const nextPartner = () => {
    setDirection('left')
    setCurrentPartnerIndex((prevIndex) => (prevIndex + 1) % partners.length)
  }

  const prevPartner = () => {
    setDirection('right')
    setCurrentPartnerIndex((prevIndex) => (prevIndex - 1 + partners.length) % partners.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r bg-neutral-900">
      <header className="p-4 flex justify-between items-center">
        <Link href="/home" className="text-2xl font-bold text-white flex items-center">
          <Heart className="mr-2 text-pink-500" />
          Campus Connection
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" className="text-white">
            <MessageCircle className="mr-2" /> Messages
          </Button>
          <Button variant="ghost" className="text-white">
            <User className="mr-2" /> Likes
          </Button>
          <Button onClick={() => signOut({ redirectTo: "/signup" })}>
            <LogOut className='mr-2' /> Logout
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost">
                <MessageCircle className="mr-2" /> Messages
              </Button>
              <Button variant="ghost">
                <User className="mr-2" /> Likes
              </Button>
              <Button onClick={() => signOut({ redirectTo: "/signup" })}>
                <LogOut className='mr-2' /> Logout
              </Button>

            </nav>
          </SheetContent>
        </Sheet>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <PartnerCard
              key={partners[currentPartnerIndex].id}
              partner={partners[currentPartnerIndex]}
              onNext={nextPartner}
              onPrev={prevPartner}
              direction={direction}
            />
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

