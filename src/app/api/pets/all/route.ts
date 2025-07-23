import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pet from '@/models/Pet';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Fetch all pets from the database
    const pets = await (Pet as any).find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      pets: pets 
    });
  } catch (error) {
    console.error('Error fetching all pets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pets' },
      { status: 500 }
    );
  }
}
