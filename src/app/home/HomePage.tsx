'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, User, Menu, LogOut, Search, HeartIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"
import PartnerCard from "./Partnercard"
import { SearchDialog } from '@/components/SearchDialog'

export interface Partner {
  id: number
  name: string
  age: number
  course: string
  college: string
  year: number
  bio: string
  description: string
  religion: string
  diet: 'vegetarian' | 'non-vegetarian'
  lookingFor: 'long-term' | 'short-term' | 'friendship'
  smoker: 'yes' | 'no'
  drinker: 'yes' | 'no'
  communicationPreference: 'calling' | 'messaging'
  interests: string[]
  photos: string[]
}

const partners: Partner[] = [
  {
    id: 1,
    religion: "hindu",
    name: 'Alice Johnson',
    bio: "moody",
    age: 22,
    course: 'Computer Science',
    college: 'renaissnace university',
    year: 3,
    description: 'Passionate about coding and AI. Love to explore new technologies and push the boundaries of what\'s possible with software.',
    diet: 'vegetarian',
    lookingFor: 'long-term',
    smoker: 'no',
    drinker: 'no',
    communicationPreference: 'messaging',
    interests: ['Technology', 'Music', 'Hiking', 'Photography'],
    photos: ['https://images.pexels.com/photos/1105058/pexels-photo-1105058.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/792326/pexels-photo-792326.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1564868/pexels-photo-1564868.jpeg?auto=compress&cs=tinysrgb&w=600']
  },
  {
    id: 2,
    name: 'Bob Smith',
    age: 23,
    bio: "foody",
    religion: "hindu",
    course: 'Business Administration',
    college: 'renaissnace university',
    year: 1,
    description: 'Aspiring entrepreneur with a love for startups and innovation. Always looking for new business ideas and networking opportunities.',
    diet: 'non-vegetarian',
    lookingFor: 'short-term',
    smoker: 'yes',
    drinker: 'yes',
    communicationPreference: 'calling',
    interests: ['Entrepreneurship', 'Sports', 'Travel', 'Reading'],
    photos: ['https://images.pexels.com/photos/220474/pexels-photo-220474.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600']
  },
  {
    id: 3,
    name: 'Pat Smith',
    age: 23,
    bio: "foody",
    religion: "hindu",
    course: 'Business Administration',
    college: 'renaissnace university',
    year: 1,
    description: 'Aspiring entrepreneur with a love for startups and innovation. Always looking for new business ideas and networking opportunities.',
    diet: 'non-vegetarian',
    lookingFor: 'friendship',
    smoker: 'no',
    drinker: 'no',
    communicationPreference: 'messaging',
    interests: ['Entrepreneurship', 'Sports', 'Travel', 'Reading'],
    photos: ['https://media.istockphoto.com/id/624129686/photo/portrait-boy.jpg?s=612x612&w=0&k=20&c=bzU5INObuqZyjRv-WlzJNG-GY96D1i5NsrbZg1cm-34=', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600']
  },
]

export default function HomePage() {
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)

  const nextPartner = () => {
    setDirection('left')
    setCurrentPartnerIndex((prevIndex) => (prevIndex + 1) % partners.length)
  }

  const prevPartner = () => {
    setDirection('right')
    setCurrentPartnerIndex((prevIndex) => (prevIndex - 1 + partners.length) % partners.length)
  }

  const handleSelectPartner = (partner: Partner) => {
    const index = partners.findIndex(p => p.id === partner.id)
    if (index !== -1) {
      setCurrentPartnerIndex(index)
    }
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
            <User className="mr-2" /> Profile
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
                <User className="mr-2" /> Profile
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
          <div className='flex justify-evenly mb-3'>
            <div className='w-28 h-8 flex items-center justify-center bg-black text-white text-sm rounded-lg'>
              <Button className='bg-transparent' onClick={() => setIsSearchDialogOpen(true)}>
                <Search className='text-white' fill='black' /><p className='text-sm font-bold'>SEARCH</p>
              </Button>
            </div>
            <div className='w-28 h-8 flex items-center justify-center bg-pink-500 text-black text-sm rounded-lg'>
              <Button variant="ghost" className='w-full'>
                <HeartIcon className='text-black' fill='black' /><p className='text-sm font-bold '>Likes</p>
              </Button>
            </div>
          </div>
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

      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
        partners={partners}
        onSelectPartner={handleSelectPartner}
      />
    </div>
  )
}

