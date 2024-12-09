export default function OGImage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#09090B]">
      <div 
        className="w-[1200px] h-[630px] bg-[#09090B] flex flex-col items-center justify-center gap-6 p-20 font-mono relative overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
        
        {/* Content */}
        <div className="relative space-y-6 text-center">
          {/* Title */}
          <div className="flex items-center justify-center gap-4 text-8xl font-bold text-white">
            DropSight <span className="text-7xl">🎯</span>
          </div>
          
          {/* Description */}
          <p className="text-4xl text-zinc-400 max-w-4xl">
            Look up cross-VM account associations on Flow blockchain
          </p>
          
          {/* Network badges */}
          <div className="flex gap-4 justify-center mt-8">
            {/* Mainnet badge */}
            <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-6 py-2 rounded-lg text-2xl">
              mainnet
              <div className="w-2 h-2 rounded-full bg-current" />
            </div>
            
            {/* Testnet badge */}
            <div className="flex items-center gap-2 bg-blue-500/10 text-blue-500 px-6 py-2 rounded-lg text-2xl">
              testnet
              <div className="w-2 h-2 rounded-full bg-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 