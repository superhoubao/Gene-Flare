import { motion } from 'framer-motion';

const MISSIONS = [
  { icon: 'favorite', label: 'Connect Health', spark: 100, color: '#f43f5e' },
  { icon: 'person', label: 'Health Profile', spark: 120, color: '#8b5cf6' },
  { icon: 'psychology', label: 'AI Assessment', spark: 150, color: '#06b6d4' },
  { icon: 'token', label: 'First Mint', spark: 130, color: '#f59e0b' },
];

/**
 * Step 0: Welcome Gate
 * Shows overview of the Genesis Journey missions.
 */
export default function WelcomeGate({ onNext, onSkip }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center"
    >
      {/* Hero icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
        className="relative w-24 h-24 mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-600/20 border border-emerald-400/30 flex items-center justify-center backdrop-blur-xl">
          <span className="material-symbols-outlined text-emerald-400 text-4xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>
            rocket_launch
          </span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3 mb-10"
      >
        <h1 className="text-4xl font-black tracking-tight text-white">
          Your Gene Journey
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Begins Now
          </span>
        </h1>
        <p className="text-sm font-medium text-white/40 max-w-[30ch] mx-auto leading-relaxed">
          Complete the Genesis Missions to unlock your full health potential and earn Spark rewards.
        </p>
      </motion.div>

      {/* Mission cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm space-y-3 mb-10"
      >
        {MISSIONS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}30` }}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: m.color, fontFamily: "'Material Symbols Outlined'" }}
              >
                {m.icon}
              </span>
            </div>
            <span className="flex-1 text-sm font-bold text-white/70 text-left">{m.label}</span>
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                <path d="M11.11 23a.69.69 0 01-.67-.89l2.06-7.62H7.7a.68.68 0 01-.58-1.06L13.4 1.37A.67.67 0 0114.5 1.8l-2.08 7.62h4.87a.68.68 0 01.57 1.06L11.6 22.63a.67.67 0 01-.49.37z" />
              </svg>
              <span className="text-xs font-black text-amber-300">+{m.spark}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Total spark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-amber-400/10 border border-amber-400/20"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24">
          <path d="M11.11 23a.69.69 0 01-.67-.89l2.06-7.62H7.7a.68.68 0 01-.58-1.06L13.4 1.37A.67.67 0 0114.5 1.8l-2.08 7.62h4.87a.68.68 0 01.57 1.06L11.6 22.63a.67.67 0 01-.49.37z" />
        </svg>
        <span className="text-sm font-black text-amber-300">500 Spark</span>
        <span className="text-xs font-medium text-amber-300/50">available to earn</span>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="w-full max-w-sm space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="relative w-full overflow-hidden rounded-2xl py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl"
          style={{ background: 'linear-gradient(135deg, #065f46 0%, #10b981 60%, #34d399 100%)' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          />
          <span className="relative flex items-center justify-center gap-2">
            Begin Genesis
            <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
          </span>
        </motion.button>

        <button
          onClick={onSkip}
          className="text-xs font-bold text-white/20 hover:text-white/40 transition-colors tracking-wider"
        >
          Skip for now →
        </button>
      </motion.div>
    </motion.div>
  );
}
