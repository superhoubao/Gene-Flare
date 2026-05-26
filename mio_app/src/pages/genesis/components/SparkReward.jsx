import { motion, AnimatePresence } from 'framer-motion';

/**
 * Full-screen Spark reward overlay.
 * Shows when user completes a step and earns Spark.
 */
export default function SparkReward({ amount, visible, onDone }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            // Auto-dismiss after 2s
            setTimeout(onDone, 2000);
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          {/* Radial glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute w-40 h-40 rounded-full bg-amber-400/30 blur-3xl"
          />

          {/* Spark particles burst */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * 120,
                  y: Math.sin(angle) * 120,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              />
            );
          })}

          {/* Amount display */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-amber-400"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.11 23a.69.69 0 01-.67-.89l2.06-7.62H7.7a.68.68 0 01-.58-1.06L13.4 1.37A.67.67 0 0114.5 1.8l-2.08 7.62h4.87a.68.68 0 01.57 1.06L11.6 22.63a.67.67 0 01-.49.37z" />
              </svg>
            </motion.div>

            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-amber-300 tracking-tight"
            >
              +{amount} Spark
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
