import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Step 4: First Mint
 * User mints their first health R-NFT using Spark.
 */
export default function FirstMint({ sparkBalance, onNext }) {
  const MINT_COST = 80;
  const GENE_REWARD = 50;

  const [phase, setPhase] = useState('preview'); // 'preview' | 'minting' | 'success'
  const [mintProgress, setMintProgress] = useState(0);
  const [mintStage, setMintStage] = useState('scanning');

  const handleMint = () => {
    setPhase('minting');
  };

  useEffect(() => {
    if (phase !== 'minting') return;
    const timer = setInterval(() => {
      setMintProgress((prev) => {
        if (prev >= 100) {
          if (mintStage === 'scanning') {
            setMintStage('encrypting');
            return 0;
          }
          if (mintStage === 'encrypting') {
            setMintStage('finalizing');
            return 0;
          }
          if (mintStage === 'finalizing') {
            clearInterval(timer);
            setTimeout(() => setPhase('success'), 300);
            return 100;
          }
        }
        return prev + (mintStage === 'finalizing' ? 1.8 : 3);
      });
    }, 50);
    return () => clearInterval(timer);
  }, [phase, mintStage]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12"
    >
      <AnimatePresence mode="wait">
        {/* ── Preview Phase ── */}
        {phase === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm space-y-8 text-center"
          >
            {/* Header */}
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-400/20 flex items-center justify-center mx-auto mb-6"
              >
                <span className="material-symbols-outlined text-amber-400 text-3xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                  token
                </span>
              </motion.div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-2">Mint Your First R-NFT</h2>
              <p className="text-sm text-white/40 font-medium">Turn your health data into an on-chain asset</p>
            </div>

            {/* NFT Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-[3/4] w-full rounded-3xl bg-gradient-to-br from-[#0a3d3d] via-emerald-950 to-[#04120d] p-6 border border-white/15 overflow-hidden shadow-2xl"
            >
              {/* Metallic sheen */}
              <motion.div
                animate={{ x: [-400, 600] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">Genesis R-NFT</p>
                    <h3 className="text-xl font-black text-white tracking-tight">#0001</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>verified</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="material-symbols-outlined text-emerald-400/60" style={{ fontSize: 80, fontFamily: "'Material Symbols Outlined'" }}>
                      genetics
                    </span>
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-left">
                      <p className="text-[9px] font-bold text-white/30 uppercase">Health Score</p>
                      <p className="text-lg font-black text-white">78</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-white/30 uppercase">Data Points</p>
                      <p className="text-lg font-black text-emerald-400">24</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-[9px] text-white/20 font-medium">did:flare:genesis · {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cost breakdown */}
            <div className="rounded-2xl bg-white/5 border border-white/8 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40 font-medium">Mint Cost</span>
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M11.11 23a.69.69 0 01-.67-.89l2.06-7.62H7.7a.68.68 0 01-.58-1.06L13.4 1.37A.67.67 0 0114.5 1.8l-2.08 7.62h4.87a.68.68 0 01.57 1.06L11.6 22.63a.67.67 0 01-.49.37z" />
                  </svg>
                  <span className="text-sm font-black text-amber-300">-{MINT_COST} Spark</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40 font-medium">You'll Receive</span>
                <span className="text-sm font-black text-emerald-400">+{GENE_REWARD} GENE</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40 font-medium">Your Balance</span>
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M11.11 23a.69.69 0 01-.67-.89l2.06-7.62H7.7a.68.68 0 01-.58-1.06L13.4 1.37A.67.67 0 0114.5 1.8l-2.08 7.62h4.87a.68.68 0 01.57 1.06L11.6 22.63a.67.67 0 01-.49.37z" />
                  </svg>
                  <span className="text-sm font-bold text-amber-300/60">{sparkBalance} Spark</span>
                </div>
              </div>
            </div>

            {/* Mint button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMint}
              className="relative w-full overflow-hidden rounded-2xl py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #92400e 0%, #f59e0b 60%, #fbbf24 100%)' }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                Mint Now
                <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>token</span>
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* ── Minting Phase ── */}
        {phase === 'minting' && (
          <motion.div
            key="minting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-10"
          >
            <div className="relative w-48 h-48">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-amber-400/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 rounded-full border border-emerald-400/20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-amber-400 text-4xl mb-2" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                  {mintStage === 'scanning' ? 'sensors' : mintStage === 'encrypting' ? 'lock' : 'deployed_code'}
                </span>
                <span className="text-2xl font-black text-white">{Math.round(mintProgress)}%</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-black text-white uppercase tracking-wider">
                {mintStage === 'scanning' ? 'Scanning Data...' : mintStage === 'encrypting' ? 'Encrypting...' : 'Finalizing...'}
              </h2>
              <p className="text-xs text-white/30 font-medium tracking-wider uppercase">
                {mintStage === 'scanning' ? 'Verifying health records' : mintStage === 'encrypting' ? 'Zero-knowledge proof generation' : 'Writing to blockchain'}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Success Phase ── */}
        {phase === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto"
            >
              <span className="material-symbols-outlined text-emerald-400 text-4xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                check_circle
              </span>
            </motion.div>

            <div>
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">Minted!</h2>
              <p className="text-sm text-white/40 font-medium">Your first R-NFT is now on-chain</p>
            </div>

            <div className="flex justify-center gap-4">
              <div className="rounded-2xl bg-amber-400/10 border border-amber-400/20 px-5 py-3 text-center">
                <p className="text-[10px] font-bold text-amber-300/50 uppercase">Spent</p>
                <p className="text-lg font-black text-amber-300">-{MINT_COST}</p>
                <p className="text-[10px] font-bold text-amber-300/50">Spark</p>
              </div>
              <div className="rounded-2xl bg-emerald-400/10 border border-emerald-400/20 px-5 py-3 text-center">
                <p className="text-[10px] font-bold text-emerald-300/50 uppercase">Earned</p>
                <p className="text-lg font-black text-emerald-300">+{GENE_REWARD}</p>
                <p className="text-[10px] font-bold text-emerald-300/50">GENE</p>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="w-full rounded-2xl py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #1b8b8b 0%, #29b5b5 60%, #53cdcd 100%)' }}
            >
              <span className="flex items-center justify-center gap-2">
                Continue
                <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
