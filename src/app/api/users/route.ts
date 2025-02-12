import { NextResponse } from 'next/server'
import dbConnect from "@/lib/mongodb"
import User from "@/model/User"
import { auth } from "@/lib/auth"

export async function GET() {
    try {
        const session = await auth()
        const Useremail = session?.user?.email
        await dbConnect();
        const users = await User.find({ email: { $ne: Useremail } });
        return NextResponse.json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch users',
            },
            { status: 500 }
        );
    }
}
export async function PUT(request: Request) {
    try {
      const session = await auth()
      const userEmail = session?.user?.email
      await dbConnect()
      const body = await request.json()
      const updatedUser = await User.findOneAndUpdate({ email: userEmail }, body, { new: true, runValidators: true })
      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      return NextResponse.json(updatedUser)
    } catch (error) {
      console.error("Error updating user:", error)
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }
  }
  
export async function POST(request: Request) {
    try {
        await dbConnect()
        const body = await request.json()
        const user = new User(body)
        await user.save()
        return NextResponse.json({ user }, { status: 201 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}

