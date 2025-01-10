import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"
import CompletedProfile from "@/model/CompletedProfile";

export async function GET() {
    try {
        await dbConnect()
        const users = await CompletedProfile.find({})
        return NextResponse.json({ users })
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
    
}