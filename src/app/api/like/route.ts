import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { Like } from '@/model/Like';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  await dbConnect()

  try {
    const session = await auth()
    const Useremail = session?.user?.email
    const likes = await Like.find({ likedEmail: Useremail })
    return NextResponse.json({data:likes})
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json({ error: 'Error fetching likes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { liker,likerEmail, likedEmail } = await request.json();

    if (!likerEmail || !likedEmail || !liker) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const alreadyLiked = await Like.findOne({liker,likerEmail,likedEmail});
    if (alreadyLiked){
      return NextResponse.json({error:"already liked"},{status:500})
    }
    const newLike = new Like({
      liker,
      likerEmail,
      likedEmail,
    });

    await newLike.save();

    revalidatePath('/api/likes');
    return NextResponse.json(newLike, { status: 201 });
  } catch (error) {
    console.error('Error creating like:', error);
    return NextResponse.json({ error: 'Error creating like' }, { status: 500 });
  }
}