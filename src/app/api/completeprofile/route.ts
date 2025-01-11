import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"
import CompletedProfile from "@/model/CompletedProfile";
import { NextRequest } from "next/server";

export async function GET() {
    try {
        await dbConnect()
        const users = await CompletedProfile.find({})
        return NextResponse.json({ users })
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

}
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        if (!body.email) {
            return NextResponse.json({ error: 'userId and email are required' }, { status: 400 });
        }
        const completedProfile = await CompletedProfile.create(body);
        return NextResponse.json(completedProfile, { status: 201 });
    }
     catch (e) {
        console.error({e});
        if (e instanceof Error && 'code' in e && e.code === 11000) {
            return NextResponse.json({ error: 'User profile already exists' }, { status: 409 });
        }

        return NextResponse.json({ error: 'Failed to create completed profile' }, { status: 500 });
    }
}

