'use client';

import { useState, useEffect } from 'react';

interface Pet {
  _id: string;
  type: string;
  rarity: string;
  ascii: string[];
  color: string;
  level: number;
  userId: string;
  twitterUsername?: string;
}

interface PetLibraryProps {
  refreshTrigger?: number;
}

export default function PetLibrary({ refreshTrigger }: PetLibraryProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [frame, setFrame] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const petsPerPage = 30;

  const fetchAllPets = async () => {
    try {
      const response = await fetch('/api/pets/all');
      if (response.ok) {
        const data = await response.json();
        setPets(data.pets || []);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPets();
  }, []);

  // Refresh pets when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchAllPets();
    }
  }, [refreshTrigger]);


  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => prev + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Filter pets based on search query
  const filteredPets = pets.filter(pet => {
    if (!searchQuery) return true;
    return pet.twitterUsername?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate pagination with filtered results
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const startIndex = (currentPage - 1) * petsPerPage;
  const endIndex = startIndex + petsPerPage;
  const currentPets = filteredPets.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-left">Asciipanions</h2>
        <div className="text-center text-gray-400">Loading pets...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-left">Asciipanions</h2>
      
      {/* Pagination Controls - Top */}
      {pets.length > petsPerPage && (
        <div className="flex justify-between items-center mb-4">
          {/* Pagination Info */}
          <div>
            <span className="text-gray-400 text-sm">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPets.length)} of {filteredPets.length} pets
            </span>
          </div>
          
          {/* Pagination Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="p-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:text-blue-400 cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: currentPage === 1 ? '#6b7280' : '#e6e6e6',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ transform: 'rotate(180deg)' }}>
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
            
            {/* Current Page Display */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {currentPage}
              </span>
              <span className="text-white text-sm">
                of {totalPages}
              </span>
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:text-blue-400 cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: currentPage === totalPages ? '#6b7280' : '#e6e6e6',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Twitter @"
            className="w-full pl-10 pr-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
            style={{
              backgroundColor: '#2a2a2a',
              border: 'none',
            }}
          />
        </div>
        {searchQuery && (
          <div className="mt-1 text-xs text-gray-500">
            {filteredPets.length} result{filteredPets.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {currentPets.map((pet) => (
          <div
            key={pet._id}
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
{pet.ascii && pet.ascii.length > 1 ? pet.ascii[frame % pet.ascii.length] : pet.ascii?.[0] || ''}
              </pre>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
