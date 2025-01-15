import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from "@/model/User"


export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
    await dbConnect();
  const useremail = (await params).email;
  const user = await User.find({email:useremail})
  if (user) {
    return NextResponse.json(user)
  } else {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
}

