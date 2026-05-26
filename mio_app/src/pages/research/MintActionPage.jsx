import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function MintActionPage() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Stages: 'transaction_approval' -> 'scanning' -> 'encrypting' -> 'finalizing' -> 'success'
  const [stage, setStage] = useState('transaction_approval');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage === 'transaction_approval' || stage === 'success') return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (stage === 'scanning') {
            setStage('encrypting');
            return 0;
          }
          if (stage === 'encrypting') {
            setStage('finalizing');
            return 0;
          }
          if (stage === 'finalizing') {
            setStage('success');
            clearInterval(timer);
            return 100;
          }
          return 100;
        }
        return prev + (stage === 'finalizing' ? 1.5 : 2.5);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [stage]);

  const renderTransactionApproval = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center space-y-8 w-full max-w-sm"
    >
      <div className="w-full bg-[#151526]/80 backdrop-blur-2xl rounded-[32px] p-6 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-tertiary/20 blur-[50px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tertiary to-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl font-bold">account_balance_wallet</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Smart Contract Interaction</h3>
            <p className="text-white/40 text-[10px] font-mono tracking-wider">Flare Network</p>
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-4 mb-6 border border-white/5 space-y-4 relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Action</span>
            <span className="text-white text-xs font-black uppercase tracking-widest">Mint R-NFT</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Asset ID</span>
            <span className="text-primary text-xs font-mono">{packId || 'R-NFT #0821'}</span>
          </div>
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Est. Gas Fee</span>
            <div className="text-right">
              <span className="text-white text-xs font-bold block">0.0012 FLR</span>
              <span className="text-white/30 text-[9px] font-mono block">≈ $0.04 USD</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStage('scanning')}
          className="relative z-10 w-full py-4 rounded-xl bg-white text-primary font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Confirm in Wallet
        </motion.button>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-xl font-black text-white tracking-tight uppercase">Signature Required</h2>
        <p className="text-primary/50 text-[0.7rem] font-medium tracking-widest uppercase">Please approve the transaction</p>
      </div>
    </motion.div>
  );

  const renderScanning = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-12"
    >
      <div className="relative w-64 h-64">
        {/* Radar Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-primary shadow-[0_0_20px_rgba(83, 205, 205,0.3)]"
        />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ y: [0, 256, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_#53cdcd]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-5xl text-primary mb-2 animate-pulse">sensors</span>
          <span className="text-3xl font-black text-white">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Broadcasting Tx</h2>
        <p className="text-primary/50 text-[0.85rem] font-medium tracking-widest uppercase">Waiting for network nodes</p>
      </div>
    </motion.div>
  );

  const renderEncrypting = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center space-y-12"
    >
      <div className="relative">
        <div className="w-48 h-48 rounded-3xl border-2 border-tertiary/30 flex items-center justify-center bg-[#151526]/80 backdrop-blur-xl relative overflow-hidden">
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-tertiary/20 to-transparent"
          />
          <span className="material-symbols-outlined text-7xl text-tertiary relative z-10" style={{ fontVariationSettings: '"FILL" 1' }}>lock</span>
        </div>
        
        {/* Particle Stream */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 1, 0] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 w-1 h-8 bg-tertiary/40 rounded-full blur-[1px]"
            style={{ left: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">{t('mintWorkflow.encrypting')}</h2>
        <p className="text-primary/50 text-[0.85rem] font-medium tracking-widest uppercase">{t('mintWorkflow.encryptingDetail')}</p>
      </div>
    </motion.div>
  );

  const renderFinalizing = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-12"
    >
      <div className="flex gap-4">
        {[0, 1, 2].map(i => (
          <motion.div 
            key={i}
            animate={{ 
              y: [0, -20, 0],
              backgroundColor: ['rgba(83, 205, 205,0.1)', 'rgba(83, 205, 205,0.4)', 'rgba(83, 205, 205,0.1)']
            }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            className="w-12 h-16 rounded-lg border border-tertiary/30 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#53cdcd]" />
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white tracking-tight uppercase">{t('mintWorkflow.finalizing')}</h2>
        <p className="text-primary/50 text-[0.85rem] font-medium tracking-widest uppercase">{t('mintWorkflow.finalizingDetail')}</p>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center space-y-8 max-w-md w-full"
    >
      {/* The NFT Certificate Card */}
      <div className="relative w-full aspect-[4/5] perspective-1000 group">
        <motion.div 
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-full rounded-[40px] bg-gradient-to-br from-[#125858] via-[#151526] to-[#0a0a14] p-8 border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(83,205,205,0.1)] relative overflow-hidden"
        >
          {/* Metallic Sheen */}
          <motion.div 
            animate={{ x: [-500, 1000] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
          />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-tertiary mb-1">{t('mintWorkflow.metadata.authenticated')}</p>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{packId || 'R-NFT #0821'}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined text-white text-2xl">verified</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Owner DID</p>
                <p className="text-[11px] font-mono text-tertiary/70 truncate tracking-tight">did:flare:7e2f...91a2</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t('mintWorkflow.metadata.integrity')}</p>
                  <p className="text-xl font-black text-white">99.98%</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{t('mintWorkflow.metadata.reward')}</p>
                  <p className="text-xl font-black text-tertiary">Tier S</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[9px] text-white/30 font-medium leading-tight">
                {t('mintWorkflow.metadata.disclaimer')}
              </p>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-[40px]" />
        </motion.div>
      </div>

      <div className="text-center space-y-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">{t('mintWorkflow.success')}</h2>
          <p className="text-tertiary/50 text-[0.9rem] mt-2">{t('mintWorkflow.successDetail')}</p>
        </div>
        
        <button 
          onClick={() => navigate('/research/collection', { replace: true })}
          className="relative z-50 w-full py-5 rounded-full bg-tertiary text-[#0a0a14] text-sm font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(83,205,205,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          {t('mintWorkflow.inventory')}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      
      <AnimatePresence mode="wait">
        {stage === 'transaction_approval' && renderTransactionApproval()}
        {stage === 'scanning' && renderScanning()}
        {stage === 'encrypting' && renderEncrypting()}
        {stage === 'finalizing' && renderFinalizing()}
        {stage === 'success' && renderSuccess()}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
      `}} />
    </div>
  );
}
