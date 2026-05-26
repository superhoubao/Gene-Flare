import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Step 0.5: Identity Activation (DID Generation)
 * High-fidelity biometric scan simulation.
 */
export default function ActivateDID({ onNext }) {
  const [status, setStatus] = useState('ready'); // 'ready', 'scanning', 'verifying', 'completed'
  const [progress, setProgress] = useState(0);
  const [did, setDid] = useState('');

  // Generate a mock DID address
  const mockDid = "did:flare:z8u3v2x9w1m0k7n5p4";

  const startScan = () => {
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
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
    >
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-black text-white mb-2">Identity Activation</h2>
        <p className="text-sm text-white/40">Secure your decentralized identity on the Flare network.</p>
      </div>

      {/* Biometric Scanner UI */}
      <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-500/40 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Scan Animation */}
        <AnimatePresence>
          {status === 'scanning' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100%', opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 overflow-hidden rounded-full"
            >
              <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#10b981] relative animate-scan-move" />
              <div className="w-full h-full bg-emerald-500/10 backdrop-blur-[2px]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Icon/Result */}
        <div className="relative z-10">
          {status === 'ready' && (
            <span className="material-symbols-outlined text-emerald-400/30 text-[80px]" style={{ fontFamily: "'Material Symbols Outlined'" }}>
              face_6
            </span>
          )}
          {status === 'scanning' && (
            <div className="text-center">
              <p className="text-3xl font-black text-emerald-400 font-mono">{progress}%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/50 mt-2">Biometrics Analysis</p>
            </div>
          )}
          {status === 'verifying' && (
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">Securing DID Vault</p>
            </motion.div>
          )}
          {status === 'completed' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4">
                <span className="material-symbols-outlined text-3xl font-bold" style={{ fontFamily: "'Material Symbols Outlined'" }}>check</span>
              </div>
              <p className="text-xs font-mono text-emerald-400/80 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 truncate max-w-[200px]">
                {did}
              </p>
            </motion.div>
          )}
        </div>

        {/* Particle/Glow Effect during scanning */}
        {status === 'scanning' && (
          <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl animate-pulse" />
        )}
      </div>

      {/* Button */}
      <div className="w-full max-w-sm">
        {status === 'ready' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startScan}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/20"
          >
            Activate My DID
          </motion.button>
        )}
        
        {status === 'completed' && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="w-full py-4 rounded-2xl bg-white text-emerald-900 text-sm font-black uppercase tracking-[0.2em] shadow-xl"
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
