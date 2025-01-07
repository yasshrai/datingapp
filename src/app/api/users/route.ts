import { NextResponse } from 'next/server'
import dbConnect from "@/lib/mongodb"
import User from "@/model/User"

export async function GET() {
    try {
        await dbConnect()
        const users = await User.find({}).limit(10)
        return NextResponse.json({ users })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
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

