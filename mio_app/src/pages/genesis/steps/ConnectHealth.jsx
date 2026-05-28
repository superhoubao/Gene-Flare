import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SOURCES = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    icon: 'favorite',
    color: '#f43f5e',
    dataTypes: ['Steps', 'Heart Rate', 'Sleep', 'Activity'],
    description: 'Sync your daily health metrics',
  },
  {
    id: 'wearable',
    name: 'Wearable Device',
    icon: 'watch',
    color: '#8b5cf6',
    dataTypes: ['SpO2', 'Stress', 'ECG'],
    description: 'Connect smart watch or fitness band',
  },
  {
    id: 'medical',
    name: 'Medical Records',
    icon: 'local_hospital',
    color: '#06b6d4',
    dataTypes: ['Lab Results', 'Prescriptions'],
    description: 'Import your clinical data',
    locked: true,
  },
];

/**
 * Step 1: Connect Health Sources
 * User authorizes health data providers.
 */
export default function ConnectHealth({ onNext, onSkip }) {
  const [connected, setConnected] = useState({});
  const [syncing, setSyncing] = useState(null);

  const handleNext = () => {
    localStorage.setItem('device_connected', 'true');
    onNext();
  };

  const handleSkip = () => {
    localStorage.setItem('device_connected', 'true');
    onSkip();
  };

  const handleConnect = (sourceId) => {
    if (connected[sourceId] || syncing) return;
    setSyncing(sourceId);

    // Simulate authorization + sync
    setTimeout(() => {
      setConnected((prev) => ({ ...prev, [sourceId]: true }));
      setSyncing(null);
    }, 2000);
  };

  const connectedCount = Object.values(connected).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      className="flex flex-col min-h-screen px-6 py-12"
    >
      {/* Header */}
      <div className="text-center mb-10 pt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-400/20 flex items-center justify-center mx-auto mb-6"
        >
          <span className="material-symbols-outlined text-rose-400 text-3xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>
            favorite
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-black tracking-tight text-white mb-2"
        >
          Connect Your Health
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-white/40 font-medium"
        >
          Link your health data for personalized insights
        </motion.p>
      </div>

      {/* Source cards */}
      <div className="flex-1 space-y-4 mb-8">
        {SOURCES.map((source, i) => {
          const isConnected = connected[source.id];
          const isSyncing = syncing === source.id;

          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              onClick={() => !source.locked && handleConnect(source.id)}
              className={`relative overflow-hidden rounded-2xl border p-5 transition-all cursor-pointer ${
                source.locked
                  ? 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed'
                  : isConnected
                  ? 'border-emerald-400/30 bg-emerald-400/5'
                  : 'border-white/8 bg-white/5 active:scale-[0.98]'
              }`}
            >
              {/* Syncing progress bar */}
              <AnimatePresence>
                {isSyncing && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, ease: 'linear' }}
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-300 origin-left"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${source.color}12`, border: `1px solid ${source.color}25` }}
                >
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ color: source.color, fontFamily: "'Material Symbols Outlined'" }}
                  >
                    {source.icon}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white">{source.name}</h3>
                    {source.locked && (
                      <span className="text-[10px] font-bold text-white/30 bg-white/5 px-2 py-0.5 rounded-full uppercase">Soon</span>
                    )}
                  </div>
                  <p className="text-xs text-white/30 font-medium mb-3">{source.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {source.dataTypes.map((dt) => (
                      <span key={dt} className="text-[10px] font-bold text-white/20 bg-white/5 px-2 py-1 rounded-lg">
                        {dt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 mt-1">
                  {isConnected ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-emerald-400 text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>check</span>
                    </motion.div>
                  ) : isSyncing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 rounded-full border-2 border-white/10 border-t-emerald-400"
                    />
                  ) : !source.locked ? (
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/30 text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>add</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={connectedCount === 0 && !syncing}
          className="relative w-full overflow-hidden rounded-2xl py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: connectedCount > 0 ? 'linear-gradient(135deg, #1b8b8b 0%, #29b5b5 60%, #53cdcd 100%)' : 'rgba(255,255,255,0.08)' }}
        >
          <span className="relative flex items-center justify-center gap-2">
            {connectedCount > 0 ? 'Continue' : 'Connect a source to continue'}
            {connectedCount > 0 && <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>}
          </span>
        </motion.button>

        <button
          onClick={handleSkip}
          className="w-full text-center text-xs font-bold text-white/20 hover:text-white/40 transition-colors tracking-wider py-2"
        >
          Skip this step →
        </button>
      </div>
    </motion.div>
  );
}
