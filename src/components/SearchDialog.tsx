'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Partner } from '@/types/partner'
import { useRouter } from 'next/navigation'
interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  partners: Partner[]
  onSelectPartner: (partner: Partner) => void
}

export function SearchDialog({ isOpen, onClose, partners, onSelectPartner }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([])
  const router = useRouter()

  useEffect(() => {
    const filtered = partners.filter(partner =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPartners(filtered)
  }, [searchTerm, partners])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Partners</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <ScrollArea className="h-[300px]">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => {
                onSelectPartner(partner)
                onClose()
                router.push(`/user/${partner.email}`)
              }}
            >
              {partner.name}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}