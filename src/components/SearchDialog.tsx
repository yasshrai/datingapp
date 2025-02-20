"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Partner } from "@/types/partner"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  partners: Partner[]
  onSelectPartner: (partner: Partner) => void
}

export function SearchDialog({ isOpen, onClose, partners, onSelectPartner }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([])
  const [courseFilter, setCourseFilter] = useState('all')
  const [collegeFilter, setCollegeFilter] = useState('all')
  const [smokerFilter, setSmokerFilter] = useState('any')
  const [drinkerFilter, setDrinkerFilter] = useState('any')
  const [lookingForFilter, setLookingForFilter] = useState('any')
  const [hobbyFilter, setHobbyFilter] = useState('all')
  
  const router = useRouter()

  useEffect(() => {
    const filtered = partners.filter(partner =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (courseFilter === 'all' || partner.course === courseFilter) &&
      (collegeFilter === 'all' || partner.college === collegeFilter) &&
      (smokerFilter === 'any' || partner.smoker === smokerFilter) &&
      (drinkerFilter === 'any' || partner.drinker === drinkerFilter) &&
      (lookingForFilter === 'any' || partner.lookingFor === lookingForFilter) &&
      (hobbyFilter === 'all' || partner.hobby === hobbyFilter)
    )
    setFilteredPartners(filtered)
  }, [searchTerm, partners, courseFilter, collegeFilter, smokerFilter, drinkerFilter, lookingForFilter, hobbyFilter])

  const uniqueCourses = Array.from(new Set(partners.map((p) => p.course)))
  const uniqueColleges = Array.from(new Set(partners.map((p) => p.college)))
  const uniqueHobbies = Array.from(new Set(partners.map((p) => p.hobby)))

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
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Courses</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={collegeFilter} onValueChange={setCollegeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Colleges</SelectItem>
              {uniqueColleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={smokerFilter} onValueChange={setSmokerFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Smoker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="yes">Smoker</SelectItem>
              <SelectItem value="no">Non Smoker</SelectItem>
            </SelectContent>
          </Select>
          <Select value={drinkerFilter} onValueChange={setDrinkerFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Drinker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="yes">Drinker</SelectItem>
              <SelectItem value="no">Non Drinker</SelectItem>
            </SelectContent>
          </Select>
          <Select value={lookingForFilter} onValueChange={setLookingForFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Looking For" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="long-term">Long-term</SelectItem>
              <SelectItem value="short-term">Short-term</SelectItem>
              <SelectItem value="friendship">Friendship</SelectItem>
            </SelectContent>
          </Select>
          <Select value={hobbyFilter} onValueChange={setHobbyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Hobby" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Hobbies</SelectItem>
              {uniqueHobbies.map((hobby) => (
                <SelectItem key={hobby} value={hobby}>{hobby}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[300px]">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-2 hover:bg-zinc-900 cursor-pointer"
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
