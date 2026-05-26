import { motion, AnimatePresence } from 'framer-motion';

/**
 * Global Premium Modal
 * Features: Glassmorphism, smooth animations, localized backdrop.
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  type = 'default' // 'default' | 'danger'
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-[#02150d]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {/* Glossy edge effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />

            <div className="relative text-center space-y-6">
              {/* Icon / Decorative element */}
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="material-symbols-outlined text-emerald-400 text-3xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                  {type === 'danger' ? 'logout' : 'info'}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight text-white">{title}</h3>
                <p className="text-sm font-medium text-white/40 leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-lg ${
                    type === 'danger' 
                      ? 'bg-gradient-to-r from-red-600 to-rose-500' 
                      : 'bg-gradient-to-r from-emerald-600 to-teal-500'
                  }`}
                >
                  {confirmText}
                </motion.button>
                
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
                >
                  {cancelText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
