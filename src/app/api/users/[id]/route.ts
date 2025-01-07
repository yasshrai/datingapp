import { NextResponse } from 'next/server'
import dbConnect from "@/lib/mongodb"
import User from "@/model/User"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const user = await User.findById(params.id)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json({ user })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const body = await request.json()
        const user = await User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json({ user })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect()
        const user = await User.findByIdAndDelete(params.id)
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'User deleted successfully' })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}

