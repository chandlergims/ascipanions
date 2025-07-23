import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pet from '@/models/Pet';

const colors = [
  { name: 'text-white', rarity: 'Common', weight: 25 },
  { name: 'text-gray-300', rarity: 'Common', weight: 25 },
  { name: 'text-green-400', rarity: 'Uncommon', weight: 20 },
  { name: 'text-emerald-400', rarity: 'Uncommon', weight: 15 },
  { name: 'text-blue-400', rarity: 'Rare', weight: 10 },
  { name: 'text-cyan-400', rarity: 'Rare', weight: 8 },
  { name: 'text-purple-400', rarity: 'Epic', weight: 6 },
  { name: 'text-indigo-400', rarity: 'Epic', weight: 5 },
  { name: 'text-yellow-400', rarity: 'Legendary', weight: 3 },
  { name: 'text-orange-400', rarity: 'Legendary', weight: 2 },
  { name: 'text-pink-400', rarity: 'Legendary', weight: 1 }
];

const petTypes = [
  {
    name: 'Cat',
    weight: 30, // Most common
    animations: {
      basic: [
        ` /\\_/\\
( o.o )
 > ^ <`,
        ` /\\_/\\
( -.- )
 > ^ <`,
        ` /\\_/\\
( o.o )
 > ^ <`,
        ` /\\_/\\
( ^.^ )
 > ^ <`
      ]
    }
  },
  {
    name: 'Dog',
    weight: 25, // Common
    animations: {
      basic: [
        ` /^ ^\\
/ 0 0 \\
V\\ Y /V
 / - \\
|    \\
|| (__)`,
        ` /^ ^\\
/ - - \\
V\\ Y /V
 / - \\
|    \\
|| (__)`,
        ` /^ ^\\
/ 0 0 \\
V\\ Y /V
 / - \\
|    \\
|| (__)`,
        ` /^ ^\\
/ ^ ^ \\
V\\ Y /V
 / - \\
|    \\
|| (__)`
      ]
    }
  },
  {
    name: 'Bird',
    weight: 20, // Uncommon
    animations: {
      basic: [
        `(•>
/ )`,
        `(->
/ )`,
        `(•>
/ )`,
        `(^>
/ )`
      ]
    }
  },
  {
    name: 'Squirrel',
    weight: 15, // Rare
    animations: {
      basic: [
        `     ,_     _
     |\\_,-~/
     / _  _ |    ,--.
    (  @  @ )   / ,-'
     \\  _T_/-._( (
     /         \`. \\
    |         _  \\ |
     \\ \\ ,  /      |
      || |-_\\__   /
     ((_/\`(____,-'`,
        `     ,_     _
     |\\_,-~/
     / _  _ |    ,--.
    (  -  - )   / ,-'
     \\  _T_/-._( (
     /         \`. \\
    |         _  \\ |
     \\ \\ ,  /      |
      || |-_\\__   /
     ((_/\`(____,-'`,
        `     ,_     _
     |\\_,-~/
     / _  _ |    ,--.
    (  @  @ )   / ,-'
     \\  _T_/-._( (
     /         \`. \\
    |         _  \\ |
     \\ \\ ,  /      |
      || |-_\\__   /
     ((_/\`(____,-'`,
        `     ,_     _
     |\\_,-~/
     / _  _ |    ,--.
    (  ^  ^ )   / ,-'
     \\  _T_/-._( (
     /         \`. \\
    |         _  \\ |
     \\ \\ ,  /      |
      || |-_\\__   /
     ((_/\`(____,-'`
      ]
    }
  },
  {
    name: 'Misotope',
    weight: 10, // Very rare
    animations: {
      basic: [
        `  /|\\
 (•_•)
 /| |\\
/_| |_\\`,
        `  /|\\
 (-_-)
 /| |\\
/_| |_\\`,
        `  /|\\
 (•_•)
 /| |\\
/_| |_\\`,
        `  /|\\
 (^_^)
 /| |\\
/_| |_\\`
      ]
    }
  }
];

function getRandomPetType() {
  const totalWeight = petTypes.reduce((sum, pet) => sum + pet.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const pet of petTypes) {
    random -= pet.weight;
    if (random <= 0) {
      return pet;
    }
  }
  
  return petTypes[0]; // fallback
}

function getRandomColor() {
  const totalWeight = colors.reduce((sum, color) => sum + color.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const color of colors) {
    random -= color.weight;
    if (random <= 0) {
      return color;
    }
  }
  
  return colors[0]; // fallback
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { userId, solanaWallet, twitterUsername } = await request.json();
    
    console.log('Generation request:', { userId, solanaWallet, twitterUsername }); // Debug log
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!solanaWallet) {
      return NextResponse.json({ error: 'Solana wallet address is required' }, { status: 400 });
    }

    // Allow infinite pet generation for testing - removed restriction

    const selectedColor = getRandomColor();
    const selectedPetType = getRandomPetType();

    const newPet = new Pet({
      userId,
      name: selectedPetType.name,
      type: selectedPetType.name,
      ascii: selectedPetType.animations.basic,
      color: selectedColor.name,
      rarity: selectedColor.rarity,
      level: 1,
      experience: 0,
      solanaWallet: solanaWallet,
      twitterUsername: twitterUsername
    });

    await newPet.save();
    
    console.log('Saved pet:', newPet); // Debug log

    return NextResponse.json({ 
      success: true, 
      pet: newPet,
      message: `Generated a ${selectedColor.rarity} ${selectedPetType.name}!`
    });

  } catch (error) {
    console.error('Error generating pet:', error);
    return NextResponse.json({ error: 'Failed to generate pet' }, { status: 500 });
  }
}
