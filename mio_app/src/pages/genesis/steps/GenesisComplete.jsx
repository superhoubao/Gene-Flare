import { motion } from 'framer-motion';

/**
 * Step 6: Genesis Complete
 * Celebration and redirect to Health Plan.
 */
export default function GenesisComplete({ onFinish }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-screen px-8 text-center"
    >
      <div className="relative mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-32 h-32 -m-4 border-2 border-dashed border-emerald-500/30 rounded-full"
        />
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]">
          <span className="material-symbols-outlined text-5xl text-white font-bold" style={{ fontFamily: "'Material Symbols Outlined'" }}>
            auto_awesome
          </span>
        </div>
      </div>

      <h2 className="text-3xl font-black text-white mb-4">Genesis Journey Complete!</h2>
      <p className="text-white/60 mb-12 leading-relaxed">
        Your genomic identity is now active. You've earned your initial Spark rewards. 
        Ready to turn your health data into assets?
      </p>

      <div className="space-y-4 w-full max-w-xs">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFinish}
          className="w-full py-4 rounded-2xl bg-white text-emerald-950 text-sm font-black uppercase tracking-[0.2em] shadow-xl"
        >
          Start My First Plan
        </motion.button>
        
        <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
          Daily tasks await in the Health Plan center
        </p>
      </div>

      {/* Decorative Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          animate={{
            x: [0, (i - 2.5) * 100],
            y: [0, (i % 2 === 0 ? -1 : 1) * 150],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{ top: '40%', left: '50%' }}
        />
      ))}
    </motion.div>
  );
}
