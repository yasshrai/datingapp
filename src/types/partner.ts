export interface Partner {
    id: number
    name: string
    age: number
    course: string
    college: string
    year: number
    bio: string
    description: string
    religion: string
    diet: 'vegetarian' | 'non-vegetarian'
    lookingFor: 'long-term' | 'short-term' | 'friendship'
    smoker: 'yes' | 'no'
    drinker: 'yes' | 'no'
    communicationPreference: 'calling' | 'messaging'
    interests: string[]
    photos: string[]
}
