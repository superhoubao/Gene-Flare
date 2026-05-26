import { motion } from 'framer-motion';

/**
 * Horizontal step progress indicator.
 * Shows current step out of total with animated segments.
 */
export default function StepProgress({ current, total }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-1 rounded-full"
          initial={false}
          animate={{
            width: i === current ? 28 : 8,
            backgroundColor:
              i < current
                ? '#10b981'
                : i === current
                ? '#34d399'
                : 'rgba(255,255,255,0.1)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}
