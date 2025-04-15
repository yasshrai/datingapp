"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { UploadButton } from "@/utils/uploadthing"
import { useSession } from "next-auth/react"

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 years old." })
    .max(100, { message: "Age must be less than 100." }),
  course: z.string().min(2, { message: "Course is required." }),
  college: z.string().min(2, { message: "College is required." }),
  email: z.string().email(),
  year: z.string().min(1, { message: "Year is required" }),
  religion: z.string().min(2, { message: "Religion is required" }),
  bio: z
    .string()
    .min(4, { message: "Bio must be at least 4 characters." })
    .max(20, { message: "Bio must be less than 20 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(1000, { message: "Description must be less than 1000 characters." }),
  diet: z.enum(["vegetarian", "non-vegetarian"]),
  lookingFor: z.enum(["long-term", "short-term", "friendship"]),
  smoker: z.enum(["yes", "no"]),
  drinker: z.enum(["yes", "no"]),
  communicationPreference: z.enum(["calling", "messaging"]),
  photos: z.array(z.string()),
  interests: z.array(z.string()),
  gender: z.enum(["male", "female", "other"]),
  hobby: z.string()
    .min(2, { message: "Hobby is required." })
    .max(15, { message: "Hobby must be at most 15 characters." })
    .regex(/^\w+$/, { message: "Hobby must be a single word." }),

})
const courses = [
  "BCA",
  "BBA",
  "BCOM",
  "Btech",
  "agriculture",
  "BALLB",
  "BCOMLLB",
  "MCA",
  "MBA",
  "MCOM",
  "Mtech",
  "MALLB",
  "MCOMLLB",
  "Other",
]
const colleges = [
  "renaissnace university",
  "SVVV",
  "medicaps university",
  "Malwa Institute of Technology",
  "prestige university",
  "Other",
]

const religions = ["hinduism", "islam", "jainism", "christianity", "sikhism", "buddhism", "Atheist", "other"]

export default function ProfileCompletion() {
  const router = useRouter()
  const [photosurl, setPhotosUrl1] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState("")
  const { data: session, status } = useSession()
  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const addItem = (newUrl: string) => {
    if (photosurl.length < 3 && newUrl) {
      setPhotosUrl1((prevItems) => [...prevItems, newUrl])
    } else if (photosurl.length >= 3) {
      toast({
        title: "Limit reached",
        description: "You can only upload 3 photos.",
        variant: "destructive",
      })
    }
  }
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      age: 18,
      email: session?.user?.email!,
      course: "",
      college: "",
      year: "",
      religion: "",
      bio: "",
      description: "",
      diet: "vegetarian",
      lookingFor: "long-term",
      smoker: "no",
      drinker: "no",
      communicationPreference: "messaging",
      photos: [],
      gender: "male",
      hobby: "",
    },
  })
  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setDisabledButton(true)
    try {
      if (photosurl.length !== 3) {
        toast({
          title: "Incomplete",
          description: "Please upload exactly 3 photos before submitting.",
          variant: "destructive",
        })
        return
      }
      values.photos = photosurl
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Failed to create profile")
      const response2 = await fetch("/api/completeprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      })
      if (!response2.ok) throw new Error("Failed to create profile")
      toast({
        title: "Profile completed",
        description: "Your profile has been successfully created.",
      })
      form.reset()
      setPhotosUrl1([])
      setInterests([])
      router.push("/home")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem completing your profile. Please try again.",
        variant: "destructive",
      })
    }
    setDisabledButton(false)
  }
  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest])
      form.setValue("interests", [...interests, newInterest])
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    const updatedInterests = interests.filter((i) => i !== interest)
    setInterests(updatedInterests)
    form.setValue("interests", updatedInterests)
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...form.register("email")} // Still register for submission
                    readOnly // Make it read-only
                    value={session?.user?.email || ""}
                  />
                </FormControl>
                <FormDescription>This is your email address associated with your account.</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hobby"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobby</FormLabel>
                <FormControl>
                  <Input placeholder="Your hobby" {...field} />
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
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value))} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college} value={college}>
                        {college}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select study year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Year {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select your religion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {religions.map((religion) => (
                      <SelectItem key={religion} value={religion}>
                        {religion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <FormDescription>Write your Bio (max 20 characters).</FormDescription>
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
                  A more detailed description about yourself, your interests, and what you're looking for (max 1000
                  characters).
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
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
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
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Interests</FormLabel>
            <div className="flex space-x-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest"
              />
              <Button type="button" onClick={addInterest}>
                Add
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center"
                >
                  {interest}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0 text-secondary-foreground"
                    onClick={() => removeInterest(interest)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </FormItem>
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
            render={() => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, idx) => (
                      <UploadButton
                        key={idx}
                        className="h-40 w-40"
                        endpoint="imageUploader"
                        disabled={photosurl.length >= 3}
                        onClientUploadComplete={(res) => {
                          if (res && res[0]?.url) addItem(res[0].url)
                        }}
                        onUploadError={(error) => {
                          toast({
                            title: "Upload Error",
                            description: error.message,
                            variant: "destructive",
                          })
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {photosurl.map((url, index) => (
                    <img
                      key={index}
                      src={url || "/placeholder.svg"}
                      alt={`Uploaded photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
                <FormDescription>Please upload 3 photos of yourself.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={disabledButton}>
            Complete Profile
          </Button>
        </form>
      </Form>
    </div>
  )
}

