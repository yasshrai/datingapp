'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r dark:bg-zinc-950">
      <header className="p-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <Heart className="mr-2 text-pink-500" />
            Campus Connection
          </Link>
        </motion.div>
        <nav>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-4"
          >
            <Button asChild variant="outline" className="text-white hover:text-pink-300">
              <Link href="/login">Login</Link>
            </Button>
          </motion.div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Find Your Perfect Match
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-xl md:text-2xl text-pink-300 mb-8"
          >
            <TypeAnimation
              sequence={[
                'Love is just a click away',
                2000,
                'Discover your soulmate',
                2000,
                'Start your romantic journey',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
              <Link href="/signup">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <footer className="p-4 text-center text-white">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          © 2023 Love Connect. All rights reserved.
        </motion.p>
      </footer>
    </div>
  )
}

