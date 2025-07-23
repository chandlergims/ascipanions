'use client';

import { useState } from 'react';
import AsciiHeader from '@/components/AsciiHeader';
import RarityScale from '@/components/RarityScale';
import UserPetSection from '@/components/UserPetSection';
import PetLibrary from '@/components/PetLibrary';

export default function Home() {
  const [refreshLibrary, setRefreshLibrary] = useState(0);

  const handlePetGenerated = () => {
    setRefreshLibrary(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-2">
        <RarityScale />
        <AsciiHeader />
        <UserPetSection onPetGenerated={handlePetGenerated} />
        <PetLibrary refreshTrigger={refreshLibrary} />
      </div>
    </main>
  );
}
