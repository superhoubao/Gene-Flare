import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../components/utils/LanguageContext';
import TopAppBar from '../../components/layout/TopAppBar';
import { PageTransition } from '../../components/animations/PageTransition';

export default function AssetCompletenessPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const dataSources = [
    { name: t('health.devices.appleHealth'), icon: 'favorite', status: t('health.connected'), connected: true, desc: t('health.assetCompleteness.sourceDesc.dailySync') },
    { name: t('health.devices.googleFit'), icon: 'fitness_center', status: t('health.connected'), connected: true, desc: t('health.assetCompleteness.sourceDesc.ready') },
    { name: t('health.devices.geniusRing'), icon: 'panorama_fish_eye', status: t('health.disconnected'), connected: false, desc: t('health.assetCompleteness.sourceDesc.connect') },
    { name: t('health.devices.smartFabric'), icon: 'texture', status: t('health.disconnected'), connected: false, desc: t('health.assetCompleteness.sourceDesc.connect') },
  ];

  const timelineItems = [
    { title: t('health.assetCompleteness.timeline.autoSync'), detail: t('health.assetCompleteness.timeline.autoSyncDetail'), time: t('health.assetCompleteness.timeline.today'), dotColor: 'bg-slate-300' },
    { title: t('health.assetCompleteness.timeline.sleepData'), detail: t('health.assetCompleteness.timeline.sleepDataDetail'), time: t('health.assetCompleteness.timeline.yesterday'), dotColor: 'bg-slate-300' },
    { title: t('health.assetCompleteness.timeline.manualEntry'), detail: t('health.assetCompleteness.timeline.manualEntryDetail'), time: t('health.assetCompleteness.timeline.mar28'), dotColor: 'bg-slate-300' },
    { title: t('health.assetCompleteness.timeline.uploadedReport'), detail: t('health.assetCompleteness.timeline.uploadedReportDetail'), time: t('health.assetCompleteness.timeline.mar25'), dotColor: 'bg-emerald-500', isHighlight: true },
    { title: t('health.assetCompleteness.timeline.questionnaire'), detail: t('health.assetCompleteness.timeline.questionnaireDetail'), time: t('health.assetCompleteness.timeline.mar15'), dotColor: 'bg-slate-300' },
  ];

  return (
    <PageTransition>
      <TopAppBar title={t('home.sections.controlBoard.assetCompleteness')} showBack rightIcon={null} />
      
      <main className="px-6 pb-24 pt-6 space-y-8">
        {/* Header Stats */}
        <section className="aurora-panel relative overflow-hidden rounded-[38px] bg-[#04120d] p-8 text-white">
          <div className="relative z-10">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100/50">{t('health.assetCompleteness.currentIntegrity')}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <h1 className="text-[4rem] font-black tracking-tight leading-none text-emerald-400">67%</h1>
              <span className="text-xl font-bold text-emerald-100/60">/ 100</span>
            </div>
            <p className="mt-4 text-[0.9rem] leading-snug text-emerald-50/70 max-w-[28ch]">
              {t('health.assetCompleteness.heroDesc')}
            </p>
          </div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />
          <div className="runway-grid absolute inset-0 opacity-10" />
        </section>

        {/* Data Sources Carousel */}
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-[1.1rem] font-black tracking-tight text-slate-950 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">sensors</span>
              {t('health.dataSources')}
            </h2>
            <button className="text-[10px] font-black uppercase tracking-wider text-emerald-600">{t('health.assetCompleteness.manageAll')}</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-1 px-1">
            {dataSources.map((s, i) => (
              <motion.div 
                key={i}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 w-[140px] rounded-[30px] bg-white p-5 shadow-[0_12px_30px_-10px_rgba(0,80,46,0.08)] border border-slate-100"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${s.connected ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </div>
                <h3 className="text-[0.95rem] font-black text-slate-950 truncate">{s.name}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">{s.desc}</p>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.connected ? 'text-emerald-600 border-emerald-100 bg-emerald-50/50' : 'text-slate-400 border-slate-100 bg-slate-50'}`}>
                  {s.status}
                </span>
              </motion.div>
            ))}
            <div className="flex-shrink-0 w-[100px] flex flex-col items-center justify-center rounded-[30px] border-2 border-dashed border-slate-200 bg-slate-50/50">
              <span className="material-symbols-outlined text-slate-300 text-3xl">add</span>
            </div>
          </div>
        </section>

        {/* Breakdown Card */}
        <section className="rounded-[34px] bg-white p-7 shadow-[0_20px_48px_-12px_rgba(0,80,46,0.08)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">analytics</span>
            </div>
            <div>
              <h3 className="font-black text-slate-950 tracking-tight">{t('health.dataCompleteness')}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('health.assetCompleteness.signalDensity')}</p>
            </div>
          </div>

          <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '67%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: t('health.tags.wearable'), active: true },
              { label: t('health.tags.questionnaire'), active: true },
              { label: t('health.tags.physicalExam'), active: true },
              { label: t('health.tags.medLog'), active: false },
              { label: t('health.tags.genetics'), active: false },
              { label: t('health.tags.diet'), active: false },
            ].map((tag, i) => (
              <div key={i} className={`flex items-center gap-2 p-3 rounded-2xl border transition-all ${tag.active ? 'bg-emerald-50 border-emerald-100/50 text-emerald-950' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                <span className={`material-symbols-outlined text-sm ${tag.active ? 'text-emerald-600' : 'text-slate-300'}`}>
                  {tag.active ? 'check_circle' : 'circle'}
                </span>
                <span className="text-[0.85rem] font-bold">{tag.label}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white flex gap-3 items-start">
            <span className="material-symbols-outlined text-emerald-400">psychology</span>
            <div>
              <p className="text-sm font-bold mb-1 leading-tight">{t('health.assetCompleteness.aiAnalysis')}</p>
              <p className="text-[0.85rem] text-white/60 leading-snug">
                {t('health.medicationAd')}
              </p>
            </div>
          </div>
        </section>

        {/* Secondary Navigation */}
        <button 
          onClick={() => navigate('/research')}
          className="w-full rounded-[28px] bg-emerald-50 py-5 px-6 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-600">token</span>
            <span className="text-sm font-black text-emerald-950">{t('health.assetCompleteness.mintResearchNFT')}</span>
          </div>
          <span className="material-symbols-outlined text-emerald-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>

        {/* Health Data Timeline */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[1.1rem] font-black tracking-tight text-slate-950 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">history</span>
              {t('health.healthTimeline')}
            </h2>
          </div>
          
          <div className="space-y-0">
            {timelineItems.map((item, i) => (
              <div key={i} className="flex gap-4 pb-6 relative group">
                <div className="flex flex-col items-center">
                  <div className={`w-3.5 h-3.5 rounded-full ${item.dotColor} flex-shrink-0 mt-1.5 ring-4 ${item.isHighlight ? 'ring-emerald-500/20' : 'ring-transparent'}`} />
                  {i < 4 && <div className="w-0.5 flex-1 bg-slate-100 mt-2 mb-1" />}
                </div>
                <div className={`flex-1 rounded-[28px] p-5 transition-all duration-300 ${item.isHighlight ? 'bg-emerald-950 text-white shadow-xl shadow-emerald-900/10' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-[0.95rem] tracking-tight">{item.title}</h4>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${item.isHighlight ? 'bg-emerald-800 text-emerald-50' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>{item.time}</span>
                  </div>
                  <p className={`text-[0.85rem] mt-2 leading-snug ${item.isHighlight ? 'text-emerald-400 font-bold' : 'text-slate-500 font-medium'}`}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-2">
            <button className="w-full py-4 rounded-[22px] bg-slate-50 border border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
              {t('health.loadMore')}
            </button>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
