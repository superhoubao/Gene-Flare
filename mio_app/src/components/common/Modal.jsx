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
            className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-surface-container-lowest p-8 tonal-elevation-2 border border-outline-variant/20"
          >
            {/* Glossy edge effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-surface-bright/50 to-transparent" />

            <div className="relative text-center space-y-6">
              {/* Icon / Decorative element */}
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center border ${
                type === 'danger' 
                  ? 'bg-error-container border-error/20 text-on-error-container' 
                  : 'bg-primary-container border-primary/20 text-on-primary-container'
              }`}>
                <span className="material-symbols-outlined text-3xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                  {type === 'danger' ? 'logout' : 'info'}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight text-on-surface">{title}</h3>
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg border transition-all ${
                    type === 'danger' 
                      ? 'bg-error text-on-error border-error/10 hover:opacity-90' 
                      : 'bg-primary text-on-primary border-primary/10 hover:opacity-90'
                  }`}
                >
                  {confirmText}
                </motion.button>
                
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
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
