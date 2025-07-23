export default function RarityScale() {
  return (
    <div className="mb-8">
      {/* Header - No Background */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-4" style={{ color: '#e6e6e6' }}>Asciipanions</h3>
        
        <div className="space-y-2 mb-4">
          <p style={{ color: '#aaa' }} className="text-sm max-w-2xl mx-auto">
            Claim a rare ASCII pet (1 per wallet) to start earning a share of fees from the liquidity pool.
          </p>
          <p style={{ color: '#aaa' }} className="text-sm max-w-2xl mx-auto">
            Rewards are automatically distributed if the above thresholds are met.
          </p>
        </div>
        
        <div className="text-sm font-bold mb-4" style={{ color: '#ffffff' }}>
          <p>Minimum 0.1% token ownership required.</p>
        </div>

        {/* Rewards Formula - Keep Background */}
        <div 
          className="rounded p-3 text-center max-w-sm mx-auto"
          style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
          }}
        >
          <h4 style={{ color: '#e6e6e6' }} className="font-semibold mb-2 text-sm">Reward Formula</h4>
          <div className="text-sm">
            <span className="text-yellow-400 font-mono font-bold">Animal</span>
            <span className="text-gray-500 mx-2">×</span>
            <span className="text-green-400 font-mono font-bold">Rarity</span>
            <span className="text-gray-500 mx-2">=</span>
            <span className="text-white font-mono font-bold">Total LP Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
