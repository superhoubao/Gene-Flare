import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Floating Spark balance counter with animated increment.
 * Displays at the top-right of the Genesis Journey.
 */
export default function SparkCounter({ count, prevCount = 0 }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (count > prevCount) {
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.5, ease: 'easeOut' },
      });
    }
  }, [count, prevCount, controls]);

  return (
    <motion.div
      animate={controls}
      className="flex items-center gap-2 rounded-full px-4 py-2 border border-amber-400/20 bg-amber-400/5 backdrop-blur-xl"
    >
      {/* Spark icon */}
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-amber-400"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.11 23a.69.69 0 01-.67-.89l2.06-7.62H7.7a.68.68 0 01-.58-1.06L13.4 1.37A.67.67 0 0114.5 1.8l-2.08 7.62h4.87a.68.68 0 01.57 1.06L11.6 22.63a.67.67 0 01-.49.37z" />
        </svg>
      </motion.div>

      <span className="text-sm font-black text-amber-300 tabular-nums tracking-tight">
        {count}
      </span>
      <span className="text-[10px] font-bold text-amber-300/50 uppercase tracking-wider">
        Spark
      </span>
    </motion.div>
  );
}
