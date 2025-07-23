export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#e6e6e6' }}>Pet Generation & Rewards</h1>
          <p style={{ color: '#aaa' }} className="text-sm max-w-2xl mx-auto">
            Detailed breakdown of pet generation probabilities and reward multipliers
          </p>
        </div>

        {/* Multipliers Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          
          {/* Animal Base LP Share */}
          <div>
            <h2 style={{ color: '#e6e6e6' }} className="font-semibold mb-3 text-center text-lg">Animal Base LP Share</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-slate-600 text-slate-100">Cat</span>
                <span className="text-yellow-400 font-mono font-bold text-sm">0.5%</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-green-600 text-green-100">Dog</span>
                <span className="text-yellow-400 font-mono font-bold text-sm">1.0%</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-teal-600 text-teal-100">Bird</span>
                <span className="text-yellow-400 font-mono font-bold text-sm">2.0%</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-orange-600 text-orange-100">Squirrel</span>
                <span className="text-yellow-400 font-mono font-bold text-sm">4.0%</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-purple-600 text-purple-100">Misotope</span>
                <span className="text-yellow-400 font-mono font-bold text-sm">5.0%</span>
              </div>
            </div>
          </div>

          {/* Color Rarity Multipliers */}
          <div>
            <h2 style={{ color: '#e6e6e6' }} className="font-semibold mb-3 text-center text-lg">Color Rarity Multipliers</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-gray-600 text-gray-100">Common</span>
                <span className="text-green-400 font-mono font-bold text-sm">1x</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-green-600 text-green-100">Uncommon</span>
                <span className="text-green-400 font-mono font-bold text-sm">1.5x</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-blue-600 text-blue-100">Rare</span>
                <span className="text-green-400 font-mono font-bold text-sm">1.75x</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-purple-600 text-purple-100">Epic</span>
                <span className="text-green-400 font-mono font-bold text-sm">1.9x</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="px-3 py-1 text-sm font-bold rounded bg-gradient-to-r from-yellow-500 to-orange-500 text-yellow-100">Legendary</span>
                <span className="text-green-400 font-mono font-bold text-sm">2x</span>
              </div>
            </div>
          </div>

        </div>

        {/* Reward Formula */}
        <div className="text-center mb-8">
          <div 
            className="rounded p-4 text-center max-w-md mx-auto"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
            }}
          >
            <h3 style={{ color: '#e6e6e6' }} className="font-semibold mb-2 text-sm">Reward Formula</h3>
            <div className="text-sm">
              <span className="text-yellow-400 font-mono font-bold">Animal</span>
              <span className="text-gray-500 mx-2">×</span>
              <span className="text-green-400 font-mono font-bold">Rarity</span>
              <span className="text-gray-500 mx-2">=</span>
              <span className="text-white font-mono font-bold">Total LP Share</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Max LP pool share: <span className="text-yellow-400 font-mono font-bold">10%</span> (Legendary Misotope)
            </p>
          </div>
        </div>

        {/* Generation Probabilities Table */}
        <div className="mb-6">
          <h2 style={{ color: '#e6e6e6' }} className="font-semibold mb-4 text-center text-lg">Generation Probabilities</h2>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 text-sm min-w-full">
              {/* Header Row */}
              <div className="px-2 py-2 text-center font-bold text-gray-300 bg-gray-800 rounded">Animal</div>
              <div className="px-2 py-2 text-center font-bold text-gray-300 bg-gray-800 rounded">Common</div>
              <div className="px-2 py-2 text-center font-bold text-green-400 bg-gray-800 rounded">Uncommon</div>
              <div className="px-2 py-2 text-center font-bold text-blue-400 bg-gray-800 rounded">Rare</div>
              <div className="px-2 py-2 text-center font-bold text-purple-400 bg-gray-800 rounded">Epic</div>
              <div className="px-2 py-2 text-center font-bold text-yellow-400 bg-gray-800 rounded">Legendary</div>
              
              {/* Cat Row */}
              <div className="px-2 py-2 text-center bg-slate-600 text-slate-100 rounded font-bold">Cat</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">21.0%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">5.4%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">3.3%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">1.5%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">0.3%</div>
              
              {/* Dog Row */}
              <div className="px-2 py-2 text-center bg-green-600 text-green-100 rounded font-bold">Dog</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">17.5%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">4.5%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">2.8%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">1.3%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">0.25%</div>
              
              {/* Bird Row */}
              <div className="px-2 py-2 text-center bg-teal-600 text-teal-100 rounded font-bold">Bird</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">14.0%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">3.6%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">2.2%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">1.0%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">0.2%</div>
              
              {/* Squirrel Row */}
              <div className="px-2 py-2 text-center bg-orange-600 text-orange-100 rounded font-bold">Squirrel</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">10.5%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">2.7%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">1.7%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">0.75%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">0.15%</div>
              
              {/* Misotope Row */}
              <div className="px-2 py-2 text-center bg-purple-600 text-purple-100 rounded font-bold">Misotope</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">7.0%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">1.8%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">1.1%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">0.5%</div>
              <div className="px-2 py-2 text-center text-white font-mono bg-gray-900 rounded">0.1%</div>
            </div>
          </div>
        </div>


      </div>
    </main>
  );
}
