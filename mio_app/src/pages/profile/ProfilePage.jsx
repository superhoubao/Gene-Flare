import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import TopAppBar from '../../components/layout/TopAppBar';
import avatarBoy from '../../assets/avatar_boy_v2.png';
import { PageTransition } from '../../components/animations/PageTransition';
import { useLanguage } from '../../components/utils/LanguageContext';
import { useDemoState } from '../../components/utils/DemoStateContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t, lang: language } = useLanguage();
  const [toast, setToast] = useState(null);
  const { state: demoState } = useDemoState();

  const showToast = (message, duration = 3000) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const handleStakeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    showToast(language === 'zh' ? '正在验证资产主权，前往烈焰之盾质押...' : 'Verifying assets, routing to Flame Shield for staking...');
    setTimeout(() => {
      navigate('/shield');
    }, 1000);
  };

  // Genesis Journey progress
  const genesisCompleted = demoState.isGenesisCompleted;
  const genesisStep = demoState.isGenesisCompleted ? 4 : 1;
  const genesisSpark = demoState.isGenesisCompleted ? 370 : 70;
  const showGenesisCard = !genesisCompleted;

  return (
    <PageTransition>
      <TopAppBar 
        avatarSrc={avatarBoy} 
      />

      <main className="mx-auto max-w-4xl space-y-6 px-6 pb-40 pt-4">
        {/* Header / DID Section */}
        <section className="relative overflow-hidden rounded-[34px] bg-[#0b1015] p-6 lg:p-8 text-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.4)]">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />
          <div className="absolute -bottom-32 -left-10 h-64 w-64 rounded-full bg-amber-500/10 blur-[60px]" />
          
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[480px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-4 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[14px] text-emerald-400">shield_person</span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-50/80">{t('profilePage.controlCenter')}</p>
              </div>
              <h1 className="text-[2.25rem] font-black tracking-tight leading-[1.05] md:text-[3rem]">
                {t('profilePage.title')}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-emerald-50/60 max-w-[40ch]">
                {t('profilePage.desc')}
              </p>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/profile/did')}
              className="group cursor-pointer rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl min-w-[280px] hover:border-emerald-500/30 transition-all shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/50">{t('profilePage.primaryDid')}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Active</span>
                  <span className="material-symbols-outlined text-[16px] text-amber-300">verified</span>
                </div>
              </div>
              <p className="text-[1.1rem] font-black tracking-tight font-mono text-emerald-50 group-hover:text-emerald-300 transition-colors">did:gene:0x1a2b...3c4d</p>
              
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">{t('home.research.reviewDID')}</p>
                <span className="material-symbols-outlined text-[18px] text-white/30 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Genesis Journey Card — shown when not completed */}
        {showGenesisCard && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/genesis')}
            className="relative overflow-hidden rounded-[32px] p-6 cursor-pointer group border border-amber-400/30"
            style={{ background: 'linear-gradient(135deg, #0c1a14 0%, #103020 50%, #071a10 100%)' }}
          >
            {/* Ambient glow */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-amber-400/20 blur-[60px] group-hover:bg-amber-400/30 transition-all" />
            <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-emerald-400/20 blur-[50px]" />

            <div className="relative z-10 flex items-center gap-5">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/30 to-emerald-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <span className="material-symbols-outlined text-amber-400 text-2xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>rocket_launch</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-black text-white tracking-tight">Genesis Journey</h3>
                  <span className="text-[10px] font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {genesisStep}/4
                  </span>
                </div>
                <p className="text-xs text-white/40 font-medium">
                  {genesisStep === 0 ? 'Start your journey to earn 500 Spark' : `${genesisSpark} Spark earned · Continue where you left off`}
                </p>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(genesisStep / 4) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400"
                  />
                </div>
              </div>

              {/* Arrow */}
              <span className="material-symbols-outlined text-white/20 text-xl group-hover:translate-x-1 group-hover:text-amber-400/60 transition-all shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
            </div>
          </motion.section>
        )}

        {/* Bento Grid layout */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* SPARK Asset */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="md:col-span-5 rounded-[32px] bg-[#f4efe4] p-6 shadow-sm relative overflow-hidden animate-all duration-700"
          >
            <div className="absolute -top-4 -right-4 p-6 opacity-5">
              <span className="material-symbols-outlined text-[100px]">local_fire_department</span>
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-900/50">{t('profilePage.behaviorRewards')}</p>
                <p className="mt-3 text-[2.5rem] font-black tracking-tight text-slate-900 leading-none">
                  {demoState.isGenesisCompleted ? '12,350' : '70'} <span className="text-lg text-slate-500">SPARK</span>
                </p>
              </div>
              <div className="mt-6 self-start inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-emerald-600">trending_up</span>
                {t('profilePage.thisWeek')}
              </div>
            </div>
          </motion.div>

          {/* GEF Asset */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="md:col-span-7 rounded-[32px] bg-[linear-gradient(145deg,#0b1510_0%,#173d2a_100%)] p-6 text-white shadow-lg relative overflow-hidden animate-all duration-700"
          >
            <div className="absolute -right-4 -bottom-8 opacity-10">
              <span className="material-symbols-outlined text-[140px]">workspace_premium</span>
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/60">{t('profilePage.settlementShield')}</p>
                <p className="mt-3 text-[3rem] font-black tracking-tight leading-none">
                  {demoState.isGenesisCompleted ? '450' : '0'} <span className="text-xl text-emerald-200/70">GEF</span>
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-emerald-100/80 max-w-[22ch] leading-relaxed">{t('profilePage.gefDesc')}</p>
                <button 
                  onClick={handleStakeClick}
                  className="rounded-full bg-white text-[#0b1510] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] hover:bg-emerald-50 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  {t('profilePage.stakeGef')}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Data Vault / R-NFTs */}
          <motion.div 
            whileHover={{ y: -2 }}
            onClick={() => navigate('/research/collection')}
            className="md:col-span-5 rounded-[32px] bg-[linear-gradient(135deg,#0d1a2b_0%,#050c14_100%)] p-6 text-white shadow-xl border border-white/5 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute -right-4 -top-4 p-6 opacity-20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[100px] text-emerald-400">fingerprint</span>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 grid place-items-center mb-5">
                <span className="material-symbols-outlined">auto_awesome_motion</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/50">{t('profilePage.researchAssets')}</p>
              <h3 className="mt-2 text-[1.75rem] font-black tracking-tight leading-none italic uppercase">{t('profilePage.dataVault')}</h3>
              <p className="mt-3 text-sm text-emerald-100/30 leading-relaxed max-w-[20ch]">{t('profilePage.dataVaultDesc')}</p>
            </div>
            <div className="absolute bottom-6 right-6">
              <span className="material-symbols-outlined text-emerald-400/50 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </motion.div>

          {/* Authorization Center */}
          <motion.div 
            whileHover={{ y: -2 }}
            onClick={() => navigate('/profile/privacy')}
            className="md:col-span-7 rounded-[32px] bg-white p-6 shadow-[0_16px_40px_-8px_rgba(0,80,46,0.06)] border border-emerald-900/5 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between cursor-pointer group hover:border-emerald-300 transition-all"
          >
            <div className="flex-1">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">key</span>
              </div>
              <h3 className="text-[1.35rem] font-black tracking-tight text-slate-900">{t('profilePage.authorizationCenter')}</h3>
              <p className="mt-3 text-sm text-slate-500 max-w-[32ch] leading-relaxed">
                {t('profilePage.authorizationDesc')}
              </p>
            </div>
            <button className="shrink-0 w-12 h-12 rounded-full bg-slate-50 grid place-items-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
          </motion.div>
        </section>

        {/* Bottom Actions */}
        <section className="grid gap-4 md:grid-cols-2">
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => navigate('/profile/privacy')}
            className="group relative overflow-hidden rounded-[32px] bg-white p-6 text-left shadow-[0_16px_40px_-8px_rgba(0,80,46,0.06)] border border-emerald-900/5 hover:border-emerald-200 transition-colors"
          >
            <div className="absolute right-6 top-6 w-10 h-10 rounded-full bg-slate-50 text-slate-400 grid place-items-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
              <span className="material-symbols-outlined text-[20px]">privacy_tip</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 group-hover:text-emerald-600 transition-colors">{t('profilePage.privacy')}</p>
            <h3 className="mt-4 pr-8 text-[1.1rem] font-black tracking-tight text-slate-900 leading-[1.3]">{t('profilePage.privacyDesc')}</h3>
          </motion.button>
          
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => navigate('/profile/settings')}
            className="group relative overflow-hidden rounded-[32px] bg-white p-6 text-left shadow-[0_16px_40px_-8px_rgba(0,80,46,0.06)] border border-emerald-900/5 hover:border-emerald-200 transition-colors"
          >
            <div className="absolute right-6 top-6 w-10 h-10 rounded-full bg-slate-50 text-slate-400 grid place-items-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 group-hover:text-emerald-600 transition-colors">{t('profilePage.preferences')}</p>
            <h3 className="mt-4 pr-8 text-[1.1rem] font-black tracking-tight text-slate-900 leading-[1.3]">{t('profilePage.preferencesDesc')}</h3>
          </motion.button>
        </section>

      </main>

      {/* Dynamic Immersive Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 right-6 z-[9999] mx-auto max-w-sm rounded-2xl bg-slate-900/90 text-white border border-white/10 px-5 py-4 shadow-2xl backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xs animate-spin" style={{ fontFamily: "'Material Symbols Outlined'" }}>sync</span>
            </div>
            <p className="text-xs font-black tracking-wide text-white/90">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
