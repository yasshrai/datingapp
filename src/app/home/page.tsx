'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { Heart, MessageCircle, User, Menu, ThumbsUp, PersonStandingIcon, X, Sparkles, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"

interface Partner {
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

function PartnerCard({ partner, onNext, onPrev, direction }: { partner: Partner, onNext: () => void, onPrev: () => void, direction: 'left' | 'right' | null }) {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    trackMouse: true
  })

  const variants = {
    enter: (direction: 'left' | 'right') => {
      return {
        x: direction === 'right' ? -300 : 300,
        opacity: 0
      }
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => {
      return {
        x: direction === 'right' ? 300 : -300,
        opacity: 0
      }
    }
  }

  return (
    <>
      <motion.div
        key={partner.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative aspect-[3/4] cursor-pointer" {...handlers} onClick={() => setShowDetails(true)}>
            <img
              src={partner.photos[0]}
              alt={`${partner.name}'s main photo`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-2xl font-semibold text-white pb-4">{partner.name}, {partner.age}</h3>
              <p className="text-sm text-white/80">{partner.course} - {partner.college}, Year {partner.year}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <div className="mt-4 flex justify-center">
        <div className=' flex justify-center bg-gray-700 rounded-full gap-1 w-30 h-15' >
        <Button onClick={onPrev} variant={'outline'} className="bg-zinc-950 hover:bg-gray-900  size-12 rounded-full ">
          <X className="" />
        </Button>
        <Button onClick={onNext} variant={"outline"} className="bg-red-700 hover:bg-gray-900  size-12 rounded-full">
          <ThumbsUp className="" />
        </Button>
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <Button className="bg-zinc-950 hover:bg-gray-900 rounded-full p-5" variant={"outline"}>
          <MessageCircle className="h-6 w-6" />
          <p>message</p>
        </Button>
        <Button className="bg-zinc-950 hover:bg-gray-900 rounded-full p-5" variant={"outline"}>
          <Sparkles className="h-6 w-6" />
          <p>confession</p>
        </Button>
        <Button className="bg-zinc-950 hover:bg-gray-900 rounded-full p-5" variant={"outline"}>
          <PersonStandingIcon className="h-6 w-6" />
          <p>people</p>
        </Button>
        
        
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{partner.name}, {partner.age}</DialogTitle>
            <DialogDescription>{partner.course} - {partner.college}, Year {partner.year}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              {partner.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${partner.name}'s photo ${index + 1}`}
                  className="w-full h-24 object-cover cursor-pointer rounded"
                  onClick={() => setSelectedImage(photo)}
                />
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p>{partner.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {partner.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">{interest}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Diet</h4>
              <p>{partner.diet}</p>
            </div>
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-0">
          <div className="relative w-full h-full">
            <img
              src={selectedImage || ''}
              alt="Full size"
              className="w-full h-full object-contain"
            />
            <Button
              className="absolute top-2 right-2"
              size="icon"
              variant="ghost"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

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
    <div className="min-h-screen bg-gradient-to-r bg-zinc-950">
      <header className="p-4 flex justify-between items-center">
        <Link href="/home" className="text-2xl font-bold text-white flex items-center">
          <Heart className="mr-2 text-pink-500" />
          Love Connect
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" className="text-white">
            <MessageCircle className="mr-2" /> Messages
          </Button>
          <Button variant="ghost" className="text-white">
            <User className="mr-2" /> Likes
          </Button>
          <Button onClick={() => signOut({redirectTo:"/signup"})}>
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
              <Button onClick={() => signOut({redirectTo:"/signup"})}>
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

