'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.number().min(18, { message: "You must be at least 18 years old." }).max(100, { message: "Age must be less than 100." }),
  course: z.string().min(2, { message: "Course is required." }),
  college: z.string().min(2, { message: "College is required." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }).max(500, { message: "Bio must be less than 500 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000, { message: "Description must be less than 1000 characters." }),
  diet: z.enum(["vegetarian", "non-vegetarian"]),
  lookingFor: z.enum(["long-term", "short-term", "friendship"]),
  smoker: z.enum(["yes", "no"]),
  drinker: z.enum(["yes", "no"]),
  communicationPreference: z.enum(["calling", "messaging"]),
  photos: z.array(z.string()).min(3, { message: "Please upload at least 3 photos." }).max(3, { message: "You can upload a maximum of 3 photos." }),
})

export default function ProfileCompletion() {
  const router = useRouter()
  const [photos, setPhotos] = useState<string[]>([])

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      age: 18,
      course: "",
      college: "",
      bio: "",
      description: "",
      diet: "vegetarian",
      lookingFor: "long-term",
      smoker: "no",
      drinker: "no",
      communicationPreference: "messaging",
      photos: [],
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      // Here you would typically send this data to your backend
      console.log(values)
      
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Profile completed",
        description: "Your profile has been successfully created.",
      })

      // Redirect to the home page
      router.push('/home')
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem completing your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newPhotos = files.map(file => URL.createObjectURL(file))
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos].slice(0, 3))
    form.setValue('photos', [...photos, ...newPhotos].slice(0, 3))
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input placeholder="Your course" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <FormControl>
                  <Input placeholder="Your college" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="A short bio about yourself" {...field} />
                </FormControl>
                <FormDescription>
                  A brief introduction about yourself (max 500 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe yourself in detail" {...field} />
                </FormControl>
                <FormDescription>
                  A more detailed description about yourself, your interests, and what you're looking for (max 1000 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diet</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your diet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non-vegetarian">Non-vegetarian</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lookingFor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Looking for</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="What are you looking for?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="long-term">Long-term relationship</SelectItem>
                    <SelectItem value="short-term">Short-term relationship</SelectItem>
                    <SelectItem value="friendship">Friendship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smoker"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you smoke?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="drinker"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you drink?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="communicationPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Communication Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred communication method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="calling">Calling</SelectItem>
                    <SelectItem value="messaging">Messaging</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="mb-2"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {photos.map((photo, index) => (
                        <img key={index} src={photo} alt={`Uploaded photo ${index + 1}`} className="w-full h-32 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Please upload 3 photos of yourself.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Complete Profile</Button>
        </form>
      </Form>
    </div>
  )
}

