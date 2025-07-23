export default function RarityScale() {
  return (
    <div className="mb-3">
      {/* Header - No Background */}
      <div className="text-center mb-3">
        <h3 className="text-sm font-bold mb-1" style={{ color: '#e6e6e6' }}>Asciipanions</h3>
        <p style={{ color: '#aaa' }} className="text-xs max-w-xl mx-auto mb-1">
          Claim a rare ASCII pet (1 per wallet) to start earning a share of fees from the liquidity pool.
        </p>
        <p style={{ color: '#aaa' }} className="text-xs max-w-xl mx-auto mb-1">
          The rarer your pet, the bigger your share of the rewards.
        </p>
        <div className="text-xs font-bold" style={{ color: '#ffffff' }}>
          <p>Minimum 0.1% token ownership required.</p>
        </div>

        {/* Rewards Formula - Keep Background */}
        <div 
          className="rounded p-2 text-center max-w-xs mx-auto mt-2"
          style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.6)'
          }}
        >
          <h4 style={{ color: '#e6e6e6' }} className="font-semibold mb-1 text-xs">Reward Formula</h4>
          <div className="text-xs">
            <span className="text-yellow-400 font-mono font-bold">Animal</span>
            <span className="text-gray-500 mx-1">×</span>
            <span className="text-green-400 font-mono font-bold">Rarity</span>
            <span className="text-gray-500 mx-1">=</span>
            <span className="text-white font-mono font-bold">Total LP Share</span>
          </div>
        </div>
      </div>


    </div>
  );
}
