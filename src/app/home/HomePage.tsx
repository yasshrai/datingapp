'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { Heart, User, Menu, LogOut, Search, HeartIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"
import PartnerCard from "./Partnercard"
import { SearchDialog } from '@/components/SearchDialog'
import axios from 'axios'
import { Partner } from '@/types/partner'
import { ResponseData } from "@/types/responseData"
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get<ResponseData>("/api/users");
        setPartners(response.data.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

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
          <Button variant="ghost" className="text-white" onClick={()=>router.push("/updateprofile")}>
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
              <Button variant="ghost" onClick={()=>router.push("/updateprofile")}>
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
              <Button variant="ghost" className='w-full' onClick={()=> router.push("/likes")}>
                <HeartIcon className='text-black' fill='black' /><p className='text-sm font-bold '>Likes</p>
              </Button>
            </div>
          </div>
          <AnimatePresence mode="wait" custom={direction}>
            {partners.length > 0 && (
              <PartnerCard
                key={partners[currentPartnerIndex].id}
                partner={partners[currentPartnerIndex]}
                onNext={nextPartner}
                onPrev={prevPartner}
                direction={direction}
              />
            )}
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

