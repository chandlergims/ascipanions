'use client';

import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [timeToNextReward, setTimeToNextReward] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setHours(now.getHours() + 1, 0, 0, 0);
      
      const diff = nextHour.getTime() - now.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeToNextReward(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-[#121212] border-b border-white/10 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold hover:text-gray-300 transition-colors">
              Asciipanions
            </Link>
          </div>


          {/* Right Side - Timer, How it works, Authentication */}
          <div className="flex items-center space-x-6">
            {/* Reward Timer */}
            <div className="text-center">
              <div className="text-xs text-gray-400">Next Rewards</div>
              <div className="text-sm font-mono font-bold text-green-400">{timeToNextReward}</div>
            </div>

            {/* How it works link */}
            <Link href="/rewards" className="text-white font-bold text-sm hover:scale-105 transition-all duration-300">
              How it works?
            </Link>


            {/* X link */}
            <a 
              href="https://x.com/Asciipanions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-bold text-sm hover:scale-105 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
              </svg>
            </a>

            {/* Authentication */}
            {authenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                  <span>
                    {user?.twitter?.username ? `@${user.twitter.username}` : 
                     user?.email?.address || 
                     (user?.wallet?.address ? user.wallet.address.slice(0, 6) + '...' + user.wallet.address.slice(-4) : 'User')}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-1 w-20 bg-[#1e1e1e] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#2a2a2a]">
                  <button
                    onClick={logout}
                    className="block w-full text-center px-2 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#2a2a2a] rounded-md cursor-pointer transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={login}
                className="bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
