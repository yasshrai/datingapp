"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { useState } from "react"
import { Send, ThumbsUp, X, ChevronLeft, ChevronRight, HeartIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Partner } from "@/types/partner"
import { likePartner } from "@/app/actions/likeuser"
import { useToast } from "@/hooks/use-toast"
import ChatWindow from "@/app/home/Chatwindow";

export default function PartnerCardSingle({ partner }: { partner: Partner }) {
    const [showDetails, setShowDetails] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [showChatWindow, setShowChatWindow] = useState(false)
    const { toast } = useToast()

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

    return (
        <><main className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <Card className="relative">
                    <CardContent
                        className="p-0 relative aspect-[3/4]"
                        onClick={() => setShowDetails(true)}
                    >
                        <img
                            src={partner.photos[currentPhotoIndex] || "/placeholder.svg"}
                            alt={`${partner.name}'s photo ${currentPhotoIndex + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
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
                            <Button
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    try {
                                        await likePartner(partner.email);
                                        toast({
                                            className: "bg-green-700",
                                            description: "You liked " + partner.name,
                                        })
                                    } catch (error) {
                                        toast({
                                            className: "bg-red-700",
                                            description: "You already liked " + partner.name,
                                        })
                                    }
                                }}
                                variant={"outline"}
                                className="bg-red-700 hover:bg-red-600 size-12 rounded-full"
                            >
                                <ThumbsUp className="w-6 h-6" />
                            </Button>
                            <Button
                                className="bg-zinc-950 hover:bg-gray-900 size-12 rounded-full"
                                variant={"outline"}
                                onClick={() => setShowChatWindow(true)}
                            >
                                <Send className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </Card>
                <div className="flex justify-self-center mt-6 gap-1">

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
                                        src={photo || "/placeholder.svg"}
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
            </div>
        </main>
        </>
    )
}

