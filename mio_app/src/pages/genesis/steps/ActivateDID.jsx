import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Step 0.5: Identity Activation (DID Generation)
 * High-fidelity biometric scan simulation with Web3 Wallet integration.
 */
export default function ActivateDID({ onNext }) {
  // Status flow: 'ready' -> 'connecting' -> 'signing' -> 'scanning' -> 'verifying' -> 'completed'
  const [status, setStatus] = useState('ready'); 
  const [progress, setProgress] = useState(0);
  const [did, setDid] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Generate a mock DID address
  const mockDid = "did:flare:z8u3v2x9w1m0k7n5p4";
  
  // Wallet configurations
  const wallets = [
    { id: 'metamask', name: 'MetaMask', icon: '🦊', color: 'from-[#F6851B] to-[#E2761B]' },
    { id: 'okx', name: 'OKX Wallet', icon: '⬛', color: 'from-gray-800 to-black' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '🔗', color: 'from-blue-500 to-blue-600' }
  ];

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setStatus('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setStatus('signing');
    }, 1500);
  };

  const handleSign = () => {
    // Proceed to biometric scan after signing
    setStatus('scanning');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('verifying');
        setTimeout(() => {
          setDid(mockDid);
          setStatus('completed');
          localStorage.setItem('did_verified', 'true');
        }, 1500);
      }
    }, 40);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 relative"
    >
      <div className="mb-12 text-center relative z-10">
        <h2 className="text-2xl font-black text-white mb-2">Identity Activation</h2>
        <p className="text-sm text-white/40">Secure your decentralized identity on the Flare network.</p>
      </div>

      {/* Biometric Scanner UI / Wallet Connect UI */}
      <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
        
        {/* Only show scanner rings if not in wallet selection */}
        <AnimatePresence>
          {status !== 'ready' && status !== 'connecting' && status !== 'signing' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/60 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan Animation */}
        <AnimatePresence>
          {status === 'scanning' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100%', opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 overflow-hidden rounded-full"
            >
              <div className="w-full h-1 bg-primary shadow-[0_0_20px_#53cdcd] relative animate-scan-move" />
              <div className="w-full h-full bg-primary/10 backdrop-blur-[2px]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Center Icon / Result */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          
          {/* Wallet Selection View */}
          <AnimatePresence mode="wait">
            {(status === 'ready' || status === 'connecting' || status === 'signing') && (
              <motion.div 
                key="wallet-ui"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-80 p-6 rounded-3xl bg-[#151526]/80 border border-white/10 shadow-2xl backdrop-blur-xl absolute"
              >
                {status === 'ready' && (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-black uppercase text-white/50 mb-2 text-center tracking-widest">Select Web3 Wallet</p>
                    {wallets.map(w => (
                      <motion.button
                        key={w.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleWalletSelect(w)}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${w.color} flex items-center justify-center text-lg`}>
                          {w.icon}
                        </div>
                        <span className="font-bold text-white text-sm">{w.name}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
                
                {status === 'connecting' && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary mb-4"
                    />
                    <p className="text-sm font-bold text-white">Connecting to {selectedWallet?.name}...</p>
                    <p className="text-xs text-white/40 mt-1">Please authorize in your extension</p>
                  </div>
                )}

                {status === 'signing' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedWallet?.icon}</span>
                        <span className="font-bold text-white/80 text-sm">Signature Request</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <p className="text-[10px] text-white/40 font-mono mb-1">Message:</p>
                      <p className="text-xs text-white/80 font-mono break-all leading-relaxed">
                        I authorize MIO to bind my biometric signature to this decentralized identity.
                        Nonce: 0x8a92...f21b
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSign}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-tertiary to-secondary text-[#0a0a14] font-black uppercase text-xs tracking-widest shadow-lg"
                    >
                      Sign & Bind Identity
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Existing Biometric View */}
            {status === 'scanning' && (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center absolute">
                <p className="text-3xl font-black text-primary font-mono">{progress}%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/70 mt-2">Biometrics Analysis</p>
              </motion.div>
            )}
            
            {status === 'verifying' && (
              <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute">
                <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">Securing DID Vault</p>
              </motion.div>
            )}
            
            {status === 'completed' && (
              <motion.div key="completed" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center absolute">
                <div className="w-16 h-16 rounded-full bg-tertiary text-[#0a0a14] flex items-center justify-center shadow-[0_0_30px_rgba(83,205,205,0.4)] mb-4">
                  <span className="material-symbols-outlined text-3xl font-bold" style={{ fontFamily: "'Material Symbols Outlined'" }}>check</span>
                </div>
                <p className="text-xs font-mono text-tertiary/90 bg-tertiary/10 px-3 py-1 rounded-full border border-tertiary/20 truncate max-w-[200px]">
                  {did}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Particle/Glow Effect during scanning */}
        {status === 'scanning' && (
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        )}
      </div>

      {/* Button */}
      <div className="w-full max-w-sm relative z-10 mt-8">
        {status === 'completed' && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="w-full py-4 rounded-2xl bg-white text-[#0a0a14] text-sm font-black uppercase tracking-[0.2em] shadow-xl"
          >
            Claim Spark & Continue
          </motion.button>
        )}

        {(status === 'scanning' || status === 'verifying') && (
          <div className="w-full py-4 text-center opacity-40">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">Please hold still...</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-move {
          0% { top: 0% }
          50% { top: 100% }
          100% { top: 0% }
        }
        .animate-scan-move {
          position: absolute;
          animation: scan-move 2s infinite ease-in-out;
        }
      `}} />
    </motion.div>
  );
}
