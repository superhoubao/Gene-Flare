import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TopAppBar from '../components/layout/TopAppBar';
import avatarBoy from '../assets/avatar_boy_v2.png';
import heroVideo from '../assets/hero_video.mp4';
import { PageTransition } from '../components/animations/PageTransition';
import {
  executingPlans,
  homepageRecommendedPlans,
  institutionPlans,
  personalTaskQueue,
  researchSignals,
} from '../data/plans';
import { useLanguage } from '../components/utils/LanguageContext';

export default function HomePage() {
  const navigate = useNavigate();
  const [planSummaryOpen, setPlanSummaryOpen] = useState(false);
  const { t } = useLanguage();
  const highlightedInstitutionPlans = (institutionPlans || []).slice(0, 2);
  const recommendedCount = (homepageRecommendedPlans || []).length;

  // Genesis Journey banner state
  const genesisCompleted = localStorage.getItem('genesisCompleted') === 'true';
  const genesisSkipped = localStorage.getItem('genesisSkipped') === 'true';
  const genesisStep = Number(localStorage.getItem('genesisStep') || 0);
  // 只要没完成，且 (点过skip OR 有过进度)，就显示
  const showGenesisBanner = !genesisCompleted && (genesisSkipped || genesisStep > 0);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const resolveCopy = (path, fallback) => {
    const value = t(path);
    return value === path ? fallback : value;
  };

  const planTitle = (plan) => resolveCopy(`home.healthTasks.plans.${plan.id}`, plan.title);

  return (
    <PageTransition>
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-[0.75] scale-[1.01] contrast-[1.1] brightness-[0.9]"
          src={heroVideo}
        />
        {/* Deep immersive gradients - Adjusted for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(0,0,0,0.2)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <TopAppBar 
        transparent
        avatarSrc={avatarBoy} 
      />

      <main className="relative z-10 pt-16 pb-32">
        {/* Main Content Animation Container */}
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 35, mass: 1 }}
          className="space-y-12"
        >
          {/* Genesis Journey Banner */}
          {showGenesisBanner && !bannerDismissed && (
            <motion.section
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6"
            >
              <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-400/10 via-emerald-400/5 to-transparent backdrop-blur-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-amber-400 text-xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>rocket_launch</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">Continue Genesis Journey</p>
                    <p className="text-xs text-white/40 font-medium mt-0.5">
                      Step {genesisStep}/4 · Earn up to 500 Spark
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/genesis')}
                    className="shrink-0 px-4 py-2 rounded-xl bg-amber-400/20 border border-amber-400/30 text-xs font-black text-amber-300 uppercase tracking-wider"
                  >
                    Resume
                  </motion.button>
                  <button
                    onClick={() => setBannerDismissed(true)}
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-white/20 hover:text-white/40"
                  >
                    <span className="material-symbols-outlined text-sm" style={{ fontFamily: "'Material Symbols Outlined'" }}>close</span>
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* Hero Section */}
          <section className="px-6 text-center lg:text-left lg:max-w-[1400px] lg:mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block rounded-full bg-emerald-500/25 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300 backdrop-blur-xl border border-emerald-400/20 mb-8 shadow-[0_0_20px_rgba(41, 181, 181,0.2)]">
                {t('home.sections.hero.tag')}
              </span>
              <h1 className="text-[3.4rem] font-black leading-[0.88] tracking-[-0.07em] text-white lg:text-[5.5rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {t('home.sections.hero.title').split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
              <p className="mt-8 max-w-[44ch] mx-auto lg:mx-0 text-xl font-medium leading-relaxed text-slate-200/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                {t('home.sections.hero.subtitle')}
              </p>
            </motion.div>
          </section>

          {/* Control Board Section with Live Sync Bar */}
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-4">
              {[
                { label: t('home.sections.controlBoard.healthScore'), value: '84', unit: '', color: 'text-amber-400', bg: 'bg-white/10', path: '/health-score' },
                { label: t('home.sections.controlBoard.assetCompleteness'), value: '67', unit: '%', color: 'text-emerald-400', bg: 'bg-white/10', path: '/asset-completeness' },
                { label: t('home.sections.controlBoard.mintReadyPacks'), value: '3', unit: '', color: 'text-cyan-400', bg: 'bg-white/10', path: '/research' },
                { label: t('home.sections.controlBoard.shieldTier'), value: 'Gold 3', unit: '', color: 'text-slate-200', bg: 'bg-white/10', path: '/shield' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 30 }}
                  onClick={() => navigate(item.path)}
                  className={`${item.bg} group relative overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl border border-white/10 transition-all hover:bg-white/20 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] cursor-pointer active:scale-95`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">{item.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black tracking-tighter ${item.color}`}>{item.value}</span>
                    {item.unit && <span className="text-xs font-bold text-white/30">{item.unit}</span>}
                  </div>
                  <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-white/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
            
            {/* Live Device Sync Marquee */}
            <div className="flex items-center gap-4 py-3 px-6 rounded-full bg-white/5 border border-white/5 backdrop-blur-md overflow-hidden">
              <span className="flex-shrink-0 text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t('home.sync.live')}
              </span>
              <div className="flex-1 flex gap-8 whitespace-nowrap overflow-hidden">
                <motion.div 
                  animate={{ x: [0, -1000] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="flex gap-12 text-[10px] font-bold text-white/40 uppercase tracking-widest"
                >
                  {[
                    `${t('health.devices.geniusRing')} · ${t('home.sync.connected')}`,
                    `${t('health.devices.smartFabric')} · ${t('home.sync.syncing')}`,
                    t('home.sync.appleUpdated'),
                    t('home.sync.didVerified'),
                    `${t('health.devices.geniusRing')} · ${t('home.sync.connected')}`,
                    `${t('health.devices.smartFabric')} · ${t('home.sync.syncing')}`,
                    t('home.sync.appleUpdated'),
                    t('home.sync.didVerified'),
                  ].map((text, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {text}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Restored Research NFT Progress Section */}
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div 
                whileHover={{ y: -4 }}
                className="rounded-[42px] bg-white p-8 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] border border-white"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-600/60">{t('home.sections.researchNFT.tag')}</span>
                    <h2 className="mt-3 text-[2.2rem] font-black tracking-[-0.05em] leading-[0.95] text-slate-950 max-w-[18ch]">
                      {t('home.sections.researchNFT.title')}
                    </h2>
                  </div>
                  <div className="rounded-[28px] bg-emerald-50 px-6 py-5 text-right border border-emerald-100 flex-shrink-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600/65">{t('home.sections.researchNFT.estValue')}</p>
                    <p className="mt-2 text-2xl font-black tracking-tight text-emerald-700">180-260 GEF</p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-500/80 max-w-[50ch]">
                  {t('home.sections.researchNFT.desc')}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-end justify-between px-1">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t('home.sections.researchNFT.mintReadiness')}</p>
                    <p className="text-lg font-black text-emerald-500">67%</p>
                  </div>
                  <div className="h-3.5 overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '67%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,#29b5b5,#53cdcd)] shadow-[0_0_12px_rgba(41, 181, 181,0.4)]" 
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 border border-slate-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-500">
                      {t('home.mintableState')} <span className="font-black text-slate-900">2 {t('home.preQualified')}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/research')}
                    className="rounded-full bg-slate-950 px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl hover:bg-slate-800 active:scale-95 transition-all"
                  >
                    {t('home.sections.researchNFT.completeAndMint')}
                  </button>
                </div>
              </motion.div>

              {/* Sidebar Cards: AI Editor & Shield */}
              <div className="grid gap-6">
                <motion.div 
                  whileHover={{ x: 4 }}
                  className="rounded-[38px] bg-slate-950 p-7 text-white shadow-2xl relative overflow-hidden border border-white/5"
                >
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/80">{t('home.sections.aiEditor.tag')}</span>
                    <h3 className="mt-3 text-lg font-black leading-snug text-white/95">
                      {t('home.sections.aiEditor.title')}
                    </h3>
                    <div className="mt-6 space-y-2.5">
                      {[
                        t('home.sections.aiEditor.pricingLift'),
                        t('home.sections.aiEditor.nextAction'),
                        t('home.sections.aiEditor.shieldBoost')
                      ].map((line, idx) => (
                        <div key={idx} className="rounded-2xl bg-white/5 p-3 text-[11px] font-medium text-white/60 border border-white/5">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-[80px]" />
                </motion.div>

                <motion.div 
                  whileHover={{ x: 4 }}
                  onClick={() => navigate('/shield')}
                  className="rounded-[38px] bg-[#fdfaf3] p-7 shadow-lg border border-amber-100/50 cursor-pointer group"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600/60">{t('home.sections.shield.tag')}</span>
                  <h3 className="mt-3 text-xl font-black text-slate-950 group-hover:text-emerald-700 transition-colors">
                    {t('home.sections.shield.title')}
                  </h3>
                  <p className="mt-4 text-[12px] leading-relaxed text-slate-500 font-medium">
                    {t('home.sections.shield.requirement')}
                  </p>
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-amber-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300" 
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Health Plan Section - The Flowing Layout Component */}
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto">
            <motion.article 
              layout
              className="relative overflow-hidden rounded-[42px] bg-white/95 p-8 shadow-[0_48px_120px_-32px_rgba(0,40,20,0.25)] border border-white"
            >
              {/* Internal Layout Control */}
              <div className="relative z-10 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-[2rem] font-black tracking-[-0.05em] text-slate-950 leading-none">{t('home.sections.planSummary.title')}</h2>
                    <p className="mt-3 text-[12px] font-bold text-slate-500/70">
                      {executingPlans.length} {t('home.sections.planSummary.executingPrefix')} <span className="mx-1 opacity-20">·</span> {institutionPlans.length} {t('home.sections.planSummary.institutionPrefix')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate('/health-plan')}
                      className="rounded-full bg-slate-100 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-600 transition-all hover:bg-slate-200 active:scale-95"
                    >
                      {t('home.sections.planSummary.viewAll')}
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPlanSummaryOpen(!planSummaryOpen)}
                      className="grid h-12 w-12 place-items-center rounded-full bg-slate-950 text-white shadow-xl hover:shadow-2xl transition-all"
                    >
                      <motion.span 
                        animate={{ rotate: planSummaryOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="material-symbols-outlined text-[26px]"
                      >
                        keyboard_arrow_down
                      </motion.span>
                    </motion.button>
                  </div>
                </div>

                <motion.div 
                  layout
                  className={`grid gap-4 ${planSummaryOpen ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}
                >
                  {/* Card 1: Executing */}
                  <motion.div 
                    layout 
                    className={`relative rounded-[32px] bg-[linear-gradient(145deg,#0d1f14_0%,#153d28_100%)] p-6 text-white shadow-lg flex flex-col ${!planSummaryOpen ? 'min-h-[170px] justify-between' : ''}`}
                  >
                    <motion.div layout className={planSummaryOpen ? 'flex justify-between items-start gap-4' : 'flex flex-col'}>
                      <motion.span layout className={`${planSummaryOpen ? 'text-2xl order-2' : 'self-end text-[2.45rem] leading-none'} font-black tracking-tighter`}>{executingPlans.length}</motion.span>
                      <p className={`${planSummaryOpen ? 'order-1 max-w-[8.5rem] text-[10px] leading-[1.55]' : 'mt-2 text-[9px] leading-[1.45]'} font-black uppercase tracking-[0.14em] text-emerald-100/40`}>{t('home.sections.planSummary.executingTitle')}</p>
                    </motion.div>
                    
                    <AnimatePresence mode="wait">
                      {planSummaryOpen ? (
                        <motion.div 
                          key="detailed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="mt-6 space-y-4"
                        >
                          {executingPlans.map((plan, i) => (
                            <motion.div 
                              key={plan.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="rounded-2xl bg-white/5 p-4 border border-white/5"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-[13px] font-black">{planTitle(plan)}</p>
                                <span className="text-[10px] font-black text-emerald-300">{plan.progressValue}%</span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${plan.progressValue}%` }}
                                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200" 
                                />
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div key="compact" className="mt-4 space-y-2">
                          {executingPlans.slice(0, 2).map((plan) => (
                            <div key={plan.id}>
                              <div className="flex justify-between gap-2 mb-1">
                                <p className="truncate text-[10px] font-bold text-white/60">{planTitle(plan)}</p>
                                <span className="text-[9px] font-black text-emerald-400">{plan.progressValue}%</span>
                              </div>
                              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-emerald-400" style={{ width: `${plan.progressValue}%` }} />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Card 2: Institution */}
                  <motion.div 
                    layout 
                    className={`relative rounded-[32px] bg-slate-50 p-6 shadow-sm border border-slate-200 flex flex-col ${!planSummaryOpen ? 'min-h-[170px] justify-between' : ''}`}
                  >
                    <motion.div layout className={planSummaryOpen ? 'flex justify-between items-start gap-4' : 'flex flex-col'}>
                      <motion.span layout className={`${planSummaryOpen ? 'text-2xl order-2' : 'self-end text-[2.45rem] leading-none'} font-black tracking-tighter text-slate-900`}>{institutionPlans.length}</motion.span>
                      <p className={`${planSummaryOpen ? 'order-1 max-w-[8.5rem] text-[10px] leading-[1.55]' : 'mt-2 text-[9px] leading-[1.45]'} font-black uppercase tracking-[0.14em] text-slate-400`}>{t('home.sections.planSummary.institutionTitle')}</p>
                    </motion.div>
                    
                    <AnimatePresence mode="wait">
                      {planSummaryOpen ? (
                        <motion.div 
                          key="detailed-inst" className="mt-6 space-y-4"
                        >
                          {highlightedInstitutionPlans.map((plan, i) => (
                            <motion.div 
                              key={plan.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100"
                            >
                              <div className="flex justify-between items-center">
                                <p className="text-[13px] font-black text-slate-800">{planTitle(plan)}</p>
                                <span className="text-[11px] font-black text-emerald-600">{plan.reward}</span>
                              </div>
                              <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">{plan.sourceLabel}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <div className="mt-4 space-y-2">
                          {highlightedInstitutionPlans.map((plan) => (
                            <div key={plan.id} className="flex justify-between items-center">
                              <p className="truncate text-[10px] font-bold text-slate-700">{planTitle(plan)}</p>
                              <span className="text-[9px] font-black text-emerald-600">{plan.reward}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Card 3: Spark Value */}
                  <motion.div 
                    layout 
                    className={`rounded-[32px] bg-[#fff2e0] p-6 text-amber-950 shadow-sm flex flex-col ${!planSummaryOpen ? 'min-h-[170px] justify-between' : ''}`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-900/40">{t('home.sections.planSummary.expectedValue')}</p>
                    <div className="mt-auto">
                      <span className={`${planSummaryOpen ? 'text-4xl' : 'text-3xl'} font-black tracking-tighter`}>+376</span>
                      <p className="text-[11px] font-black uppercase tracking-widest opacity-40">SPARK</p>
                      {planSummaryOpen && <p className="mt-4 text-xs font-bold leading-relaxed text-amber-900/60">{t('home.healthTasks.summaryDesc')}</p>}
                    </div>
                  </motion.div>

                  {/* Card 4: Recommended */}
                  <motion.div 
                    layout 
                    className={`relative rounded-[32px] bg-[#eff9f9] p-6 text-cyan-950 shadow-sm flex flex-col ${!planSummaryOpen ? 'min-h-[170px] justify-between' : ''}`}
                  >
                    <motion.div layout className={planSummaryOpen ? 'flex justify-between items-start gap-4' : 'flex flex-col'}>
                      <motion.span layout className={`${planSummaryOpen ? 'text-2xl order-2' : 'self-end text-[2.45rem] leading-none'} font-black tracking-tighter`}>{recommendedCount}</motion.span>
                      <p className={`${planSummaryOpen ? 'order-1 max-w-[8.5rem] text-[10px] leading-[1.55]' : 'mt-2 text-[9px] leading-[1.45]'} font-black uppercase tracking-[0.14em] text-cyan-900/40`}>{t('home.sections.planSummary.recommendedJoin')}</p>
                    </motion.div>
                    
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {homepageRecommendedPlans.map((plan) => (
                        <span key={plan.id} className="rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-black text-cyan-800 border border-white">
                          {planTitle(plan)}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          </section>

          {/* Task Queue Sections - These will slide down naturally because of layout prop above */}
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto space-y-12">
            {/* Research Tasks */}
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight text-white/90 px-1">{t('home.healthTasks.sections.research')}</h3>
              <div className="grid gap-4">
                {researchSignals.map((task, index) => (
                  <motion.article
                    key={task.title}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`relative overflow-hidden rounded-[40px] shadow-[0_24px_54px_-12px_rgba(0,0,0,0.18)] transition-all duration-500 ${index === 0 ? 'bg-white text-slate-950' : 'bg-[#eef2ef] text-slate-900'}`}
                  >
                    {/* Background Image with Gradient Mask */}
                    <div className="absolute inset-y-0 right-0 w-[45%] overflow-hidden pointer-events-none">
                      <img
                        alt={task.title}
                        className="h-full w-full object-cover"
                        src={task.image}
                        style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)' }}
                      />
                    </div>

                    <div className="relative z-10 w-[78%] p-8 lg:p-10">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${index === 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-white/50 text-emerald-700 border border-emerald-200/50'}`}>
                          {task.sponsor || t('home.healthTasks.sections.research')}
                        </span>
                        <span className="rounded-full bg-amber-500/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">
                          {task.reward}
                        </span>
                      </div>

                      <h3 className="mt-5 max-w-[14ch] text-[2.2rem] font-black tracking-[-0.05em] leading-[0.92] uppercase">
                        {resolveCopy(`home.healthTasks.items.${task.id}.title`, task.title)}
                      </h3>
                      
                      <p className={`mt-4 max-w-[32ch] text-sm font-medium leading-relaxed ${index === 0 ? 'text-slate-500' : 'text-slate-600'}`}>
                        {resolveCopy(`home.healthTasks.items.${task.id}.subtitle`, task.subtitle)}
                      </p>

                      <div className="mt-6 flex items-center gap-4">
                        <button className={`rounded-full px-6 py-3.5 text-xs font-black uppercase tracking-[0.18em] transition-all active:scale-95 shadow-lg ${index === 0 ? 'bg-slate-950 text-white shadow-slate-950/20' : 'bg-emerald-600 text-white shadow-emerald-600/20'}`}>
                          {t('home.healthTasks.cta.complete')}
                        </button>
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-30">
                          {task.planTitle}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Personal Task Queue */}
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight text-white/90 px-1">{t('home.healthTasks.sections.personal')}</h3>
              <div className="grid gap-4">
                {personalTaskQueue.map((task, i) => (
                  <motion.article
                    key={task.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                    className={`relative overflow-hidden rounded-[34px] p-6 shadow-2xl transition-all border border-white/5 ${task.panelClass}`}
                  >
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex gap-2">
                          <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${task.ringClass}`}>
                            {resolveCopy(`home.healthTasks.items.${task.id}.cue`, task.cue)}
                          </span>
                        </div>
                        <h4 className="mt-4 text-2xl font-black tracking-tight">{resolveCopy(`home.healthTasks.items.${task.id}.title`, task.title)}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-current/70 line-clamp-2 max-w-[50ch]">
                          {resolveCopy(`home.healthTasks.items.${task.id}.detail`, task.detail)}
                        </p>
                        <button className={`mt-6 rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 ${task.buttonClass}`}>
                          {resolveCopy(`home.healthTasks.items.${task.id}.cta`, task.cta)}
                        </button>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{t('home.healthTasks.reward')}</p>
                        <p className="mt-1 text-2xl font-black">{task.reward}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </main>
    </PageTransition>
  );
}
