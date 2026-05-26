import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopAppBar from '../../components/layout/TopAppBar';
import HealthOverview from './HealthOverview';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function HealthScorePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Risk counts for the entry card
  const highRiskCount = 1;
  const mediumRiskCount = 2;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopAppBar showBack title={t('healthScorePage.title')} rightIcon={null} />
      <main className="px-6 pb-28 pt-6 space-y-8">

        {/* ── Health Score Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#003d22] via-primary to-[#007a48] p-6 text-white shadow-xl">
            {/* Decorative orbs */}
            <div className="absolute -right-12 -top-12 w-44 h-44 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-emerald-300/15 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-1">
                {t('healthScorePage.overallScore')}
              </p>

              {/* Large Score */}
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[72px] font-black leading-none tracking-tight">85</span>
                <span className="text-[36px] font-black leading-none text-emerald-300">A</span>
              </div>

              {/* Grade label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-wide">{t('healthScorePage.gradeLabel')}</span>
                </span>
              </div>

              {/* Score bar */}
              <div className="w-full max-w-[280px] mb-3">
                <div className="flex rounded-full overflow-hidden h-2.5 bg-white/10">
                  <div className="bg-red-400 transition-all" style={{ width: '10%' }} />
                  <div className="bg-orange-400 transition-all" style={{ width: '25%' }} />
                  <div className="bg-emerald-400 transition-all" style={{ width: '50%' }} />
                  <div className="bg-emerald-300 transition-all" style={{ width: '15%' }} />
                </div>
                <div className="flex justify-between mt-1.5 text-[8px] font-bold text-white/50 uppercase tracking-wider">
                  <span>{t('healthScorePage.poor')}</span>
                  <span>{t('healthScorePage.fair')}</span>
                  <span>{t('healthScorePage.good')}</span>
                  <span>{t('healthScorePage.excellent')}</span>
                </div>
              </div>

              <p className="text-[0.85rem] text-white/70 leading-snug max-w-[260px]">
                {t('healthScorePage.scoreDesc')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Risk Factors Entry Card ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => navigate('/health-risk-factors')}
            className="w-full text-left bg-surface-container-lowest rounded-2xl p-5 border border-slate-200 shadow-sm active:scale-[0.98] transition-transform duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-500 text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    warning
                  </span>
                </div>
                <div>
                  <h3 className="text-[1.05rem] font-black text-on-surface tracking-tight">{t('healthScorePage.riskEntry')}</h3>
                  <p className="text-xs text-on-surface-variant/60 font-medium">{t('health.analysisDate')}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant/40 text-xl">chevron_right</span>
            </div>

            {/* Risk counts */}
            <div className="flex gap-3">
              <div className="flex-1 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{t('health.highRisk')}</span>
                </div>
                <span className="text-2xl font-black text-red-700">{highRiskCount}</span>
              </div>
              <div className="flex-1 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{t('health.caution')}</span>
                </div>
                <span className="text-2xl font-black text-amber-700">{mediumRiskCount}</span>
              </div>
            </div>
          </button>
        </motion.section>

        {/* ── Health Overview (existing content) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <HealthOverview />
        </motion.div>

      </main>
    </div>
  );
}
