import { motion } from 'framer-motion';
import TopAppBar from '../../components/layout/TopAppBar';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function HealthRiskFactorsPage() {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopAppBar showBack title={t('health.riskFactors')} rightIcon={null} />
      <main className="px-6 pb-28 pt-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >

          {/* Risk Factors Section */}
          <motion.section variants={item}>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-[1.75rem] font-semibold tracking-tight text-on-surface leading-tight">{t('health.riskFactors')}</h3>
              <span className="text-[0.75rem] font-medium tracking-widest text-on-surface-variant uppercase">{t('health.analysisDate')}</span>
            </div>
            <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden flex mb-6 shadow-inner">
              <div className="h-full bg-red-700" style={{width: '25%'}} />
              <div className="h-full bg-orange-500" style={{width: '45%'}} />
              <div className="h-full bg-emerald-500" style={{width: '30%'}} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* High Risk */}
              <div className="col-span-2 bg-surface-container-lowest rounded-xl shadow-sm p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center bg-red-700/10 text-red-700"><span className="material-symbols-outlined text-[28px]">bloodtype</span></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-on-surface">{t('health.fbs')}</h4>
                    <span className="bg-red-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{t('health.highRisk')}</span>
                  </div>
                  <p className="text-[3.5rem] font-bold text-red-700 my-1">112 <span className="text-lg font-medium text-on-surface-variant ml-2">mg/dL</span></p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{t('health.fbsDesc')}</p>
                </div>
              </div>
              {/* Caution Cards */}
              <div className="bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-sm">bedtime</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">{t('health.caution')}</span>
                </div>
                <h4 className="font-semibold text-on-surface">{t('health.sleepHRV')}</h4>
                <div className="text-2xl font-bold text-on-surface">42<span className="text-xs font-normal ml-1">ms</span></div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full"><div className="bg-orange-500 h-full rounded-full" style={{width: '60%'}} /></div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500 text-sm">monitor_weight</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">{t('health.caution')}</span>
                </div>
                <h4 className="font-semibold text-on-surface">{t('health.bmiOverweight')}</h4>
                <div className="text-2xl font-bold text-on-surface">26.4</div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full"><div className="bg-orange-500 h-full rounded-full" style={{width: '75%'}} /></div>
              </div>
              {/* Low Risk */}
              <div className="col-span-2 bg-surface-container-lowest rounded-xl shadow-sm p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center bg-emerald-500/10 text-emerald-600"><span className="material-symbols-outlined text-[28px]">sunny</span></div>
                  <div>
                    <h4 className="font-semibold text-on-surface">{t('health.vitD')}</h4>
                    <p className="text-sm text-on-surface-variant">{t('health.vitDDesc')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-on-surface">45<span className="text-xs font-normal ml-1">ng/mL</span></div>
                  <div className="text-emerald-600 text-xs font-semibold">{t('health.radarLegend.optimal')}</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Available Assessments ── */}
          <motion.section className="space-y-4" variants={item}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold tracking-tight text-on-surface">{t('health.availableAssessments')}</h3>
              <div className="px-3 py-1 bg-primary-fixed/30 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                <span className="text-xs font-bold text-primary">{t('health.aiReady')}</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: 'biotech', title: t('health.assessProfile'), desc: t('health.assessProfileDesc'), spark: 250, extra: t('health.estResult'), iconBg: 'bg-primary/10 text-primary' },
                { icon: 'cardiology', title: t('health.assessCardio'), desc: t('health.assessCardioDesc'), spark: 120, extra: t('health.realtimeSync'), iconBg: 'bg-primary/10 text-primary' },
                { icon: 'nutrition', title: t('health.assessMeta'), desc: t('health.assessMetaDesc'), spark: 85, iconBg: 'bg-primary/10 text-primary' },
                { icon: 'hourglass_empty', title: t('health.assessBioAge'), desc: t('health.assessBioAgeDesc'), spark: 400, iconBg: 'bg-primary/10 text-primary' },
              ].map((a, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-primary/5 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${a.iconBg} flex items-center justify-center`}>
                      <span className="material-symbols-outlined">{a.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">{a.title}</h4>
                      <p className="text-xs text-on-surface-variant">{a.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-primary font-bold">
                      <span>{a.spark}</span>
                      <span className="text-[10px] tracking-tighter">SPARK</span>
                    </div>
                    {a.extra && <span className="text-[10px] text-on-surface-variant">{a.extra}</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Digital Health Twin CTA ── */}
          <motion.section className="relative vitality-gradient text-white rounded-2xl p-6 overflow-hidden shadow-xl" variants={item}>
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-1">{t('health.twinTitle')}</h4>
              <p className="text-sm opacity-90 mb-4 leading-snug">{t('health.digitalTwinInfo')}</p>
              <button className="bg-white text-primary px-6 py-2.5 rounded-full font-bold text-sm active:scale-95 transition-transform shadow-lg">{t('health.initiateSync')}</button>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl" />
          </motion.section>

          {/* ── Historical Reports ── */}
          <motion.section className="space-y-4" variants={item}>
            <h3 className="text-lg font-semibold text-on-surface">{t('health.historicalReports')}</h3>
            <div className="space-y-1">
              {[
                { name: 'Annual Wellness 2023', hash: '0x7a...4f2' },
                { name: 'Cardio Profile Sept 23', hash: '0x3b...e9a' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-1 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">description</span>
                    <span className="font-medium">{r.name}</span>
                  </div>
                  <span className="text-xs font-mono bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded">{r.hash}</span>
                </div>
              ))}
            </div>
          </motion.section>

        </motion.div>
      </main>
    </div>
  );
}
