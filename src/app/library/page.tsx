'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const petTypes = [
  {
    name: 'Cat',
    weight: 30,
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
    weight: 25,
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
    weight: 20,
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
    weight: 15,
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
    weight: 10,
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

const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

export default function LibraryPage() {
  const [animationFrames, setAnimationFrames] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const intervals: {[key: string]: NodeJS.Timeout} = {};
    
    petTypes.forEach((pet, petIndex) => {
      colors.forEach((color, colorIndex) => {
        const key = `${pet.name}-${color.name}`;
        intervals[key] = setInterval(() => {
          setAnimationFrames(prev => ({
            ...prev,
            [key]: (prev[key] || 0 + 1) % pet.animations.basic.length
          }));
        }, 800);
      });
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, []);

  const getAnimalShare = (animalType: string) => {
    switch (animalType) {
      case 'Cat': return '0.5%';
      case 'Dog': return '1.0%';
      case 'Bird': return '2.0%';
      case 'Squirrel': return '4.0%';
      case 'Misotope': return '5.0%';
      default: return '0.5%';
    }
  };

  const getRarityMultiplier = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '1x';
      case 'Uncommon': return '1.5x';
      case 'Rare': return '1.75x';
      case 'Epic': return '1.9x';
      case 'Legendary': return '2x';
      default: return '1x';
    }
  };

  const generateCombinations = () => {
    const combinations: any[] = [];
    
    petTypes.forEach(pet => {
      colors.forEach(color => {
        combinations.push({
          pet,
          color,
          key: `${pet.name}-${color.name}`
        });
      });
    });

    // Sort by rarity order, then by animal weight (rarest first)
    return combinations.sort((a, b) => {
      const rarityA = rarityOrder.indexOf(a.color.rarity);
      const rarityB = rarityOrder.indexOf(b.color.rarity);
      
      if (rarityA !== rarityB) {
        return rarityB - rarityA; // Legendary first
      }
      
      return a.pet.weight - b.pet.weight; // Rarest animals first within same rarity
    });
  };

  const combinations = generateCombinations();

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-4">Pet Library</h1>
          <p className="text-gray-400 text-sm">All possible pet combinations ordered by rarity</p>
        </div>

        {/* Legend */}
        <div className="mb-8 p-4 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]">
          <h3 className="text-lg font-semibold mb-3">Rarity Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {rarityOrder.reverse().map(rarity => (
              <div key={rarity} className="text-center">
                <div className={`font-bold ${
                  rarity === 'Common' ? 'text-gray-300' :
                  rarity === 'Uncommon' ? 'text-green-400' :
                  rarity === 'Rare' ? 'text-blue-400' :
                  rarity === 'Epic' ? 'text-purple-400' :
                  'text-yellow-400'
                }`}>
                  {rarity}
                </div>
                <div className="text-gray-500 text-xs">
                  {rarity === 'Legendary' ? 'Ultra Rare' :
                   rarity === 'Epic' ? 'Very Rare' :
                   rarity === 'Rare' ? 'Rare' :
                   rarity === 'Uncommon' ? 'Uncommon' : 'Common'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pet Rows */}
        <div className="space-y-8">
          {petTypes.map((pet) => (
            <div key={pet.name}>
              <h3 className="text-xl font-bold mb-4">{pet.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {colors.map((color) => {
                  const key = `${pet.name}-${color.name}`;
                  return (
                    <div
                      key={key}
                      className="relative p-5 h-64 flex flex-col transition-all duration-300 hover:scale-105 rounded-lg"
                      style={{
                        backgroundColor: '#1e1e1e',
                        border: '1px solid #2a2a2a',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      {/* Color Rarity Badge */}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-bold rounded border-2 ${
                          color.rarity === 'Common' ? 'bg-gray-600 border-gray-400 text-gray-100' :
                          color.rarity === 'Uncommon' ? 'bg-green-600 border-green-400 text-green-100' :
                          color.rarity === 'Rare' ? 'bg-blue-600 border-blue-400 text-blue-100' :
                          color.rarity === 'Epic' ? 'bg-purple-600 border-purple-400 text-purple-100' :
                          color.rarity === 'Legendary' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-300 text-yellow-100' :
                          'bg-gray-600 border-gray-400 text-gray-100'
                        }`}>
                          {color.rarity}
                        </span>
                      </div>

                      {/* Animal Type Badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 text-xs font-bold rounded border ${
                          pet.name === 'Cat' ? 'bg-slate-600 border-slate-400 text-slate-100' :
                          pet.name === 'Dog' ? 'bg-green-600 border-green-400 text-green-100' :
                          pet.name === 'Bird' ? 'bg-teal-600 border-teal-400 text-teal-100' :
                          pet.name === 'Squirrel' ? 'bg-orange-600 border-orange-400 text-orange-100' :
                          pet.name === 'Misotope' ? 'bg-purple-600 border-purple-400 text-purple-100' :
                          'bg-gray-600 border-gray-400 text-gray-100'
                        }`}>
                          {pet.name}
                        </span>
                      </div>

                      {/* Fee Distribution */}
                      <div className="absolute bottom-2 right-2">
                        <div className="text-right">
                          <div className="font-bold text-xs">
                            <span className="text-yellow-400">
                              {pet.name === 'Cat' ? '0.5%' :
                               pet.name === 'Dog' ? '1.0%' :
                               pet.name === 'Bird' ? '2.0%' :
                               pet.name === 'Squirrel' ? '4.0%' :
                               pet.name === 'Misotope' ? '5.0%' : '0.5%'}
                            </span>
                            <span className="text-gray-500 mx-1">×</span>
                            <span className="text-green-400">
                              {color.rarity === 'Common' ? '1x' :
                               color.rarity === 'Uncommon' ? '1.5x' :
                               color.rarity === 'Rare' ? '1.75x' :
                               color.rarity === 'Epic' ? '1.9x' :
                               color.rarity === 'Legendary' ? '2x' : '1x'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* ASCII Art */}
                      <div className="flex-1 flex items-center justify-center mt-8">
                        <pre className={`text-xs font-mono ${color.name} whitespace-pre font-normal leading-tight`}>
                          {pet.animations.basic[animationFrames[key] || 0]}
                        </pre>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Total Combinations: {combinations.length}</p>
          <p>Animals: {petTypes.length} | Color Variants: {colors.length}</p>
        </div>
      </div>
    </main>
  );
}
