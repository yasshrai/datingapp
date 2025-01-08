// app/api/upload-photos/route.ts
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const formData = await request.formData()
  const photoUrls = []

  for (let i = 0; i < 3; i++) {
    const file = formData.get(`photo${i}`) as File | null
    if (file) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${file.name}`
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
      await writeFile(filepath, buffer)
      photoUrls.push(`/uploads/${filename}`)
    }
  }

  return NextResponse.json({ photoUrls })
}