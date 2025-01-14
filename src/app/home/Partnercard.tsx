import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { useState } from "react"
import { MessageCircle, ThumbsUp, PersonStandingIcon, X, Activity, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Partner } from "./HomePage"

export default function PartnerCard({ partner, onNext, onPrev, direction }: { partner: Partner, onNext: () => void, onPrev: () => void, direction: 'left' | 'right' | null }) {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
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
  const currentDetails = (() => {
    switch (currentPhotoIndex) {
      case 0:
        return { title: `${partner.name}, ${partner.age}`, subtitle: `${partner.course} - ${partner.college}, Year ${partner.year}` };
      case 1:
        return { title: "Description", subtitle: partner.description };
      case 2:
        return { title: "Interests", subtitle: partner.interests.join(", ") };
      default:
        return { title: "", subtitle: "" };
    }
  })();

  console.log('showDetails:', showDetails);
  console.log('Rendering PartnerCard, showDetails:', showDetails);

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
        <Card className="relative">
          <CardContent
            className="p-0 relative aspect-[3/4]"
            {...handlers}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target === e.currentTarget || target.tagName === 'IMG') {
                setShowDetails(true);
              }
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentPhotoIndex}
                src={partner.photos[currentPhotoIndex]}
                alt={`${partner.name}'s photo ${currentPhotoIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : partner.photos.length - 1))
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentPhotoIndex((prev) => (prev < partner.photos.length - 1 ? prev + 1 : 0))
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 pb-16 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-2xl font-semibold text-white pb-4">{currentDetails.title}</h3>
              <p className="text-sm text-white/80">{currentDetails.subtitle}</p>
            </div>
          </CardContent>
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center z-10">
            <div className='flex justify-center bg-zinc-900 rounded-full px-2 py-1 shadow-lg'>
              <Button onClick={onPrev} variant={'outline'} className="bg-zinc-950 hover:bg-gray-900 size-12 rounded-full mr-2">
                <X className="w-6 h-6" />
              </Button>
              <Button onClick={onNext} variant={"outline"} className="bg-red-700 hover:bg-red-600 size-12 rounded-full">
                <ThumbsUp className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
      <div className="flex justify-self-center mt-6 gap-1">
        <Button className="bg-zinc-900 hover:bg-gray-900 rounded-full p-6 w-32 outline outline-1 " variant={"outline"}>
          <PersonStandingIcon className="h-6 w-6" />
          <p>people</p>
        </Button>
        <Button className="bg-zinc-900 hover:bg-gray-900 rounded-full p-6 outline outline-1 " variant={"outline"}>
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button className="bg-zinc-900 hover:bg-gray-900 rounded-full p-6 w-32  outline outline-1 " variant={"outline"}>
          <Activity className="h-6 w-6" />
          <p>confession</p>
        </Button>
      </div>
      {/* Dialog for details */}
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

      {/* Dialog for full-size image */}
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

