import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/utils/LanguageContext';

export default function QuickActions({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const actions = [
    { icon: 'check_circle', label: t('quickActions.healthCheckin'), spark: '+15 SPARK', color: 'vitality-gradient text-white' },
    { icon: 'photo_camera', label: t('quickActions.uploadReport'), spark: '+100-200 SPARK', color: 'vitality-gradient text-white' },
    { icon: 'edit_note', label: t('quickActions.recordData'), spark: '+5-10 SPARK', color: 'bg-surface-container-high text-on-surface' },
    { icon: 'nutrition', label: t('quickActions.recordDiet'), spark: '+5-10 SPARK', color: 'bg-tertiary/10 text-tertiary' },
    { icon: 'medication', label: t('quickActions.medicationLog'), spark: '+10 SPARK', color: 'bg-error-container text-on-error-container' },
    { icon: 'assignment', label: t('quickActions.fillQuestionnaire'), spark: t('quickActions.pendingItems'), color: 'bg-surface-container-high text-on-surface' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          {/* 遮罩背景动画 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* 底部面板滑动抽屉动画 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-surface rounded-t-3xl pt-4 pb-8 px-6 shadow-2xl overflow-hidden"
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-bold text-center text-on-surface mb-6">{t('quickActions.title')}</h2>
            
            {/* AI Consultation Prompt Row */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate('/ai-consultation');
                onClose();
              }}
              className="w-full vitality-gradient p-4 rounded-2xl flex items-center gap-4 mb-6 shadow-xl relative overflow-hidden group active:brightness-95 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all" />
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner">
                <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: '"FILL" 1'}}>medical_services</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-headline font-black text-lg leading-tight uppercase tracking-widest">{t('quickActions.aiConsultation')}</h3>
                <p className="text-white/70 font-label text-[10px] uppercase tracking-wider mt-0.5">{t('quickActions.startDiagnostic')}</p>
              </div>
              <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">chevron_right</span>
            </motion.button>
            
            <div className="grid grid-cols-3 gap-4">
              {actions.map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors"
                >
                  <div className={`w-14 h-14 rounded-full ${action.color} flex items-center justify-center shadow-sm`}>
                    <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: '"FILL" 1'}}>{action.icon}</span>
                  </div>
                  <span className="text-sm font-semibold text-on-surface text-center leading-tight">{action.label}</span>
                  <span className="font-label text-xs tracking-tighter text-primary">{action.spark}</span>
                </motion.button>
              ))}
            </div>
            
            <button onClick={onClose} className="w-full mt-6 text-center text-sm font-medium text-on-surface-variant py-2 active:text-on-surface">
              {t('quickActions.collapse')} <span className="material-symbols-outlined text-sm align-middle">expand_more</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
