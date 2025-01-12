import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"
import CompletedProfile from "@/model/CompletedProfile";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        await dbConnect();
        const completedProfile = await CompletedProfile.findOne({ email });

        if (completedProfile) {
            return NextResponse.json({ 
                message: 'Profile is completed', 
                profile: completedProfile 
            }, { status: 200 });
        } else {
            return NextResponse.json({ 
                message: 'Profile is not completed' 
            }, { status: 404 });
        }
    } catch (error) {
        console.error('Error checking profile:', error);
        return NextResponse.json({ 
            error: 'Internal Server Error' 
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        if (!body.email) {
            return NextResponse.json({ error: 'email is required' }, { status: 400 });
        }
        const completedProfile = await CompletedProfile.create(body);
        return NextResponse.json(completedProfile, { status: 201 });
    }
    catch (e) {
        console.error({ e });
        if (e instanceof Error && 'code' in e && e.code === 11000) {
            return NextResponse.json({ error: 'User profile already exists' }, { status: 409 });
        }

        return NextResponse.json({ error: 'Failed to create completed profile' }, { status: 500 });
    }
}

