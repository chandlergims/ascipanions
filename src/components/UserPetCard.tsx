'use client';

import { useState, useEffect } from 'react';

interface UserPetCardProps {
  pet: any;
}

export default function UserPetCard({ pet }: UserPetCardProps) {
  const [petFrame, setPetFrame] = useState(0);

  useEffect(() => {
    if (pet?.ascii && pet.ascii.length > 1) {
      const interval = setInterval(() => {
        setPetFrame(prev => (prev + 1) % pet.ascii.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [pet]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'from-gray-500 to-gray-600';
      case 'Uncommon': return 'from-green-500 to-green-600';
      case 'Rare': return 'from-blue-500 to-blue-600';
      case 'Epic': return 'from-purple-500 to-purple-600';
      case 'Legendary': return 'from-yellow-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div 
      className="relative p-6 w-64 h-64 flex flex-col rounded-lg transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: '#1e1e1e',
        border: '1px solid #2a2a2a',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
      }}
    >
          {/* Color Rarity Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-bold rounded border-2 ${
              pet.rarity === 'Common' ? 'bg-gray-600 border-gray-400 text-gray-100' :
              pet.rarity === 'Uncommon' ? 'bg-green-600 border-green-400 text-green-100' :
              pet.rarity === 'Rare' ? 'bg-blue-600 border-blue-400 text-blue-100' :
              pet.rarity === 'Epic' ? 'bg-purple-600 border-purple-400 text-purple-100' :
              pet.rarity === 'Legendary' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-300 text-yellow-100' :
              'bg-gray-600 border-gray-400 text-gray-100'
            }`}>
              {pet.rarity}
            </span>
          </div>

          {/* Animal Type Badge */}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-bold rounded border ${
              pet.type === 'Cat' ? 'bg-slate-600 border-slate-400 text-slate-100' :
              pet.type === 'Dog' ? 'bg-green-600 border-green-400 text-green-100' :
              pet.type === 'Bird' ? 'bg-teal-600 border-teal-400 text-teal-100' :
              pet.type === 'Squirrel' ? 'bg-orange-600 border-orange-400 text-orange-100' :
              pet.type === 'Misotope' ? 'bg-purple-600 border-purple-400 text-purple-100' :
              'bg-gray-600 border-gray-400 text-gray-100'
            }`}>
              {pet.type}
            </span>
          </div>
      
      {/* Twitter Username */}
      {pet.twitterUsername && (
        <div className="absolute bottom-2 left-2">
          <span className="text-xs text-blue-400 font-medium">
            @{pet.twitterUsername}
          </span>
        </div>
      )}

      {/* Fee Distribution */}
      <div className="absolute bottom-2 right-2">
        <div className="text-right">
          <div className="font-bold text-xs">
            <span className="text-yellow-400">
              {pet.type === 'Cat' ? '0.5%' :
               pet.type === 'Dog' ? '1.0%' :
               pet.type === 'Bird' ? '2.0%' :
               pet.type === 'Squirrel' ? '4.0%' :
               pet.type === 'Misotope' ? '5.0%' : '0.5%'}
            </span>
            <span className="text-gray-500 mx-1">×</span>
            <span className="text-green-400">
              {pet.rarity === 'Common' ? '1x' :
               pet.rarity === 'Uncommon' ? '1.5x' :
               pet.rarity === 'Rare' ? '1.75x' :
               pet.rarity === 'Epic' ? '1.9x' :
               pet.rarity === 'Legendary' ? '2x' : '1x'}
            </span>
          </div>
        </div>
      </div>
      
      {/* ASCII Art */}
      <div className="flex-1 flex items-center justify-center mt-8">
        <pre className={`text-xs font-mono ${pet.color} whitespace-pre font-normal leading-tight`}>
          {pet.ascii && pet.ascii.length > 1 ? pet.ascii[petFrame] : pet.ascii?.[0] || ''}
        </pre>
      </div>
    </div>
  );
}
