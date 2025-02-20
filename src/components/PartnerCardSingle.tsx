"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog"
import { Send, ThumbsUp, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Partner } from "@/types/partner"
import { likePartner } from "@/app/actions/likeuser"
import { useToast } from "@/hooks/use-toast"
import ChatWindow from "@/app/home/Chatwindow"

export default function PartnerCardSingle({ partner }: { partner: Partner }) {
    const [showDetails, setShowDetails] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [showChatWindow, setShowChatWindow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const currentDetails = (() => {
        switch (currentPhotoIndex) {
            case 0:
                return {
                    title: `${partner.name}, ${partner.age}`,
                    subtitle: `${partner.course} - ${partner.college}, Year ${partner.year}`,
                }
            case 1:
                return {
                    title: "Description",
                    subtitle: partner.description,
                }
            case 2:
                return {
                    title: "Interests",
                    subtitle: partner.interests.join(", "),
                }
            default:
                return {
                    title: "",
                    subtitle: "",
                }
        }
    })()

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsLoading(true)
        try {
            await likePartner(partner.email)
            toast({
                className: "bg-green-700",
                description: `You liked ${partner.name}`,
            })
        } catch (error) {
            toast({
                className: "bg-red-700",
                description: `You already liked ${partner.name}`,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <Card className="relative">
                    <CardContent
                        className="p-0 relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setShowDetails(true)}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={partner.photos[currentPhotoIndex] || "/placeholder.svg"}
                                alt={`${partner.name}'s photo ${currentPhotoIndex + 1}`}
                                className="object-cover transition-opacity duration-300"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                priority
                            />
                        </div>

                        {/* Navigation Controls */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : partner.photos.length - 1))
                                }}
                                aria-label="Previous photo"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentPhotoIndex((prev) => (prev < partner.photos.length - 1 ? prev + 1 : 0))
                                }}
                                aria-label="Next photo"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Photo Details */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 pb-16 bg-gradient-to-t from-black/70 to-transparent">
                            <h3 className="text-2xl font-semibold text-white pb-4">{currentDetails.title}</h3>
                            <p className="text-sm text-white/80">{currentDetails.subtitle}</p>
                        </div>
                    </CardContent>

                    {/* Action Buttons */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-center z-10">
                        <div className="flex justify-center bg-zinc-900 rounded-full px-2 py-1 shadow-lg gap-2">
                            <Button
                                onClick={handleLike}
                                variant="outline"
                                className="bg-red-700 hover:bg-red-600 size-12 rounded-full transition-colors"
                                disabled={isLoading}
                            >
                                <ThumbsUp className={`w-6 h-6 ${isLoading ? "animate-pulse" : ""}`} />
                                <span className="sr-only">Like {partner.name}</span>
                            </Button>
                            <Button
                                className="bg-zinc-950 hover:bg-gray-900 size-12 rounded-full transition-colors"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowChatWindow(true)
                                }}
                            >
                                <Send className="h-6 w-6" />
                                <span className="sr-only">Chat with {partner.name}</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Details Dialog */}
                <Dialog open={showDetails} onOpenChange={setShowDetails}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {partner.name}, {partner.age}
                            </DialogTitle>
                            <DialogDescription>
                                {partner.course} - {partner.college}, Year {partner.year}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 gap-2">
                                {partner.photos.map((photo, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <Image
                                            src={photo || "/placeholder.svg"}
                                            alt={`${partner.name}'s photo ${index + 1}`}
                                            className="object-cover cursor-pointer rounded"
                                            fill
                                            sizes="(max-width: 768px) 33vw, 150px"
                                            onClick={() => setSelectedImage(photo)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-muted-foreground">{partner.description}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Interests</h4>
                                <div className="flex flex-wrap gap-2">
                                    {partner.interests.map((interest, index) => (
                                        <Badge key={index} variant="secondary">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Diet</h4>
                                <p className="text-muted-foreground">{partner.diet}</p>
                            </div>
                        </div>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>

                {/* Chat Dialog */}
                <Dialog open={showChatWindow} onOpenChange={setShowChatWindow}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Chat with {partner.name}</DialogTitle>
                        </DialogHeader>
                        <ChatWindow partner={partner} />
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>

                {/* Full-size Image Dialog */}
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                    <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] p-0">
                        <div className="relative w-full h-full">
                            {selectedImage && (
                                <Image
                                    src={selectedImage || "/placeholder.svg"}
                                    alt="Full size view"
                                    className="w-full h-full object-contain"
                                    width={1200}
                                    height={800}
                                    priority
                                />
                            )}
                            <Button
                                className="absolute top-2 right-2"
                                size="icon"
                                variant="ghost"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close full size view</span>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    )
}

