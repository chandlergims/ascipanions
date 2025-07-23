'use client';

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import UserPetCard from './UserPetCard';

interface UserPetSectionProps {
  onPetGenerated?: () => void;
}

export default function UserPetSection({ onPetGenerated }: UserPetSectionProps) {
  const { authenticated, user, login } = usePrivy();
  const [userPet, setUserPet] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const [solanaWallet, setSolanaWallet] = useState('');
  const [walletError, setWalletError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Extract Twitter username from Privy user object
  const getTwitterUsername = (user: any) => {
    // Try multiple ways to get Twitter username
    if (user.twitter?.username) return user.twitter.username;
    
    // Check linkedAccounts for Twitter OAuth
    const twitterAccount = user.linkedAccounts?.find((acc: any) => 
      acc.type === 'twitter_oauth' || acc.type === 'twitter'
    );
    if (twitterAccount?.username) return twitterAccount.username;
    
    // Check if there's a subject field with Twitter info
    if (twitterAccount?.subject) return twitterAccount.subject;
    
    return null;
  };

  // Validate Solana wallet address
  const validateSolanaWallet = (address: string) => {
    // Basic Solana address validation
    if (!address) {
      return 'Wallet address is required';
    }
    
    // Solana addresses are base58 encoded and typically 32-44 characters
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    if (!solanaRegex.test(address)) {
      return 'Invalid Solana wallet address format';
    }
    
    return '';
  };

  // Fetch user's pet when authenticated
  useEffect(() => {
    if (authenticated && user) {
      console.log('User object:', user); // Debug log
      fetchUserPet();
    }
  }, [authenticated, user]);

  const fetchUserPet = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userId = user.id || user.wallet?.address || user.email?.address;
      const response = await fetch(`/api/pets/${userId}`);
      const data = await response.json();
      setUserPet(data.pet);
    } catch (error) {
      console.error('Error fetching pet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePet = async () => {
    if (!user) return;
    
    // Validate Solana wallet address
    const validationError = validateSolanaWallet(solanaWallet);
    if (validationError) {
      setWalletError(validationError);
      return;
    }
    
    setWalletError('');
    setIsGenerating(true);
    setMessage('');
    
    try {
      const userId = user.id || user.wallet?.address || user.email?.address;
      const response = await fetch('/api/pets/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId,
          solanaWallet: solanaWallet.trim(),
          twitterUsername: getTwitterUsername(user)
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserPet(data.pet);
        setMessage(data.message);
        onPetGenerated?.(); // Notify parent component
      } else {
        setMessage(data.error || 'Failed to generate pet');
      }
    } catch (error) {
      console.error('Error generating pet:', error);
      setMessage('Failed to generate pet');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#e6e6e6' }}>Your Pet</h2>
        <div className="flex justify-center">
          <div 
            className="relative p-6 w-64 h-48 flex flex-col rounded-lg"
            style={{
              backgroundColor: '#1e1e1e',
              border: '1px solid #2a2a2a',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: '#e6e6e6' }}>
              Get Your ASCII Pet!
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={login}
                className="bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const generateNewPet = async () => {
    if (!user) return;
    
    setIsGenerating(true);
    setMessage('');
    
    try {
      const userId = user.id || user.wallet?.address || user.email?.address;
      const response = await fetch('/api/pets/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId,
          solanaWallet: userPet?.solanaWallet || 'test-wallet-' + Date.now(),
          twitterUsername: getTwitterUsername(user)
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserPet(data.pet);
        setMessage(data.message);
        onPetGenerated?.(); // Notify parent component
      } else {
        setMessage(data.error || 'Failed to generate pet');
      }
    } catch (error) {
      console.error('Error generating pet:', error);
      setMessage('Failed to generate pet');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#e6e6e6' }}>Your Pet</h2>
      
      <div className="flex justify-center items-start gap-6">
        {isLoading ? (
          // Skeleton loading state
          <div 
            className="relative p-5 w-64 h-64 flex flex-col rounded-lg animate-pulse"
            style={{
              backgroundColor: '#1e1e1e',
              border: '1px solid #2a2a2a',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Skeleton Badges */}
            <div className="absolute top-2 right-2">
              <div className="w-16 h-6 bg-gray-600 rounded"></div>
            </div>
            <div className="absolute top-2 left-2">
              <div className="w-12 h-6 bg-gray-600 rounded"></div>
            </div>
            
            {/* Skeleton ASCII Art */}
            <div className="flex-1 flex items-center justify-center mt-8">
              <div className="w-20 h-16 bg-gray-600 rounded"></div>
            </div>
            
            {/* Skeleton Bottom Info */}
            <div className="absolute bottom-2 left-2">
              <div className="w-16 h-4 bg-gray-600 rounded"></div>
            </div>
            <div className="absolute bottom-2 right-2">
              <div className="w-12 h-4 bg-gray-600 rounded"></div>
            </div>
          </div>
        ) : userPet ? (
          <UserPetCard pet={userPet} />
        ) : (
          <div 
            className="relative p-6 w-72 flex flex-col rounded-lg"
            style={{
              backgroundColor: '#1e1e1e',
              border: '1px solid #2a2a2a',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
            }}
          >
            <h3 className="text-lg font-semibold mb-6 text-center" style={{ color: '#e6e6e6' }}>
              Generate Your Pet!
            </h3>
            
            <div className="space-y-4">
              <div>
                <p style={{ color: '#aaa' }} className="text-xs mb-2">
                  Solana Wallet Address
                </p>
                <input
                  type="text"
                  value={solanaWallet}
                  onChange={(e) => {
                    setSolanaWallet(e.target.value);
                    setWalletError('');
                  }}
                  placeholder="Enter wallet address"
                  className="w-full px-3 py-2 text-sm rounded border bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                  style={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #4a4a4a',
                  }}
                />
                
                {walletError && (
                  <p className="text-xs text-red-400 mt-1">
                    {walletError}
                  </p>
                )}
              </div>

              
              <button
                onClick={generatePet}
                disabled={isGenerating}
                className="w-full px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isGenerating ? '#4a4a4a' : '#3a3a3a',
                  border: '1px solid #4a4a4a',
                  color: '#e6e6e6'
                }}
                onMouseEnter={(e) => {
                  if (!isGenerating) {
                    e.currentTarget.style.backgroundColor = '#4a4a4a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isGenerating) {
                    e.currentTarget.style.backgroundColor = '#3a3a3a';
                  }
                }}
              >
                {isGenerating ? 'Generating...' : 'Generate Pet'}
              </button>
              
              {message && (
                <p className={`text-xs text-center ${message.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
