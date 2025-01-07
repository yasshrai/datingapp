import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
let cachedConnection: typeof mongoose | null = null

async function dbConnect(): Promise<typeof mongoose> {
  if (cachedConnection) {
    return cachedConnection
  }

  try {
    const connection = await mongoose.connect(uri, {
      bufferCommands: false,
    })
    cachedConnection = connection
    return connection
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export default dbConnect

