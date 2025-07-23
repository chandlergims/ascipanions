import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pet from '@/models/Pet';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();
    
    const { userId } = await params;
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const pet = await (Pet as any).findOne({ userId });

    if (!pet) {
      return NextResponse.json({ pet: null });
    }

    return NextResponse.json({ pet });

  } catch (error) {
    console.error('Error fetching pet:', error);
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}
