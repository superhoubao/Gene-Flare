import TopAppBar from '../../components/layout/TopAppBar';
import { useNavigate } from 'react-router-dom';
import avatarBoy from '../../assets/avatar_boy_v2.png';
import { PageTransition } from '../../components/animations/PageTransition';
import { useLanguage } from '../../components/utils/LanguageContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyNFTs() {
  const { t, lang: language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPack, setSelectedPack] = useState(null);
  const [isDidVerified, setIsDidVerified] = useState(localStorage.getItem('did_verified') === 'true');
  const [mintedPacks] = useState([]);
  const [activeInfo, setActiveInfo] = useState(null); // 'waterfall' or 'faq'

  // Sync state from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDidVerified(localStorage.getItem('did_verified') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const rewardStages = [
    {
      name: t('researchPage.rewardStages.mint.name'),
      value: t('researchPage.rewardStages.mint.value'),
      detail: t('researchPage.rewardStages.mint.detail'),
    },
    {
      name: t('researchPage.rewardStages.access.name'),
      value: t('researchPage.rewardStages.access.value'),
      detail: t('researchPage.rewardStages.access.detail'),
    },
    {
      name: t('researchPage.rewardStages.contribution.name'),
      value: t('researchPage.rewardStages.contribution.value'),
      detail: t('researchPage.rewardStages.contribution.detail'),
    },
  ];
  const nftPacks = [
    {
      id: 'R-NFT #0821',
      title: t('researchPage.packs.metabolic.title'),
      signals: t('researchPage.packs.metabolic.signals'),
      directions: t('researchPage.packs.metabolic.directions'),
      status: t('researchPage.packs.metabolic.status'),
      value: t('researchPage.packs.metabolic.value'),
      details: [
        { label: t('researchPage.details.hrv.label'), desc: t('researchPage.details.hrv.desc') },
        { label: t('researchPage.details.rhr.label'), desc: t('researchPage.details.rhr.desc') },
        { label: t('researchPage.details.sleep.label'), desc: t('researchPage.details.sleep.desc') },
        { label: t('researchPage.details.metabolic.label'), desc: t('researchPage.details.metabolic.desc') }
      ]
    },
    {
      id: 'R-NFT #0822',
      title: t('researchPage.packs.cardio.title'),
      signals: t('researchPage.packs.cardio.signals'),
      directions: t('researchPage.packs.cardio.directions'),
      status: t('researchPage.packs.cardio.status'),
      value: t('researchPage.packs.cardio.value'),
      details: [
        { label: t('researchPage.details.spo2.label'), desc: t('researchPage.details.spo2.desc') },
        { label: t('researchPage.details.load.label'), desc: t('researchPage.details.load.desc') },
        { label: t('researchPage.details.recovery.label'), desc: t('researchPage.details.recovery.desc') }
      ]
    },
  ];
  const projectMatches = [
    {
      title: t('researchPage.matches.glycemic.title'),
      match: '95%',
      reward: t('researchPage.matches.glycemic.reward'),
      action: t('researchPage.matches.glycemic.action'),
    },
    {
      title: t('researchPage.matches.longevity.title'),
      match: '74%',
      reward: t('researchPage.matches.longevity.reward'),
      action: t('researchPage.matches.longevity.action'),
    },
  ];
  const proofLogs = [
    t('researchPage.proofLogs.did'),
    t('researchPage.proofLogs.pools'),
    t('researchPage.proofLogs.calls'),
  ];
  const terminalStats = [
    { label: t('researchPage.researchValue'), value: '$1,250 / year' },
    { label: t('researchPage.mintReady'), value: '2' },
    { label: t('researchPage.totalGef'), value: '145 GEF' },
    { label: t('researchPage.pools'), value: '4' },
  ];

  const renderEducation = (isTop) => (
    <section className={`${isTop ? 'mt-6 lg:mt-8 pb-10 border-b' : 'mt-24 pt-12 border-t'} border-slate-100`}>
      <div className="flex items-center gap-2 mb-10">
        <div className="h-[2px] w-12 bg-emerald-500"></div>
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">
          {isTop ? '01.' : '03.'} {t('researchPage.faq.title')}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div 
          layout
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="overflow-hidden rounded-[38px] bg-[#fdfaf5] border border-orange-100/50 shadow-sm transition-all hover:shadow-md cursor-pointer relative"
          onClick={() => setActiveInfo(activeInfo === 'waterfall' ? null : 'waterfall')}
        >
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black tracking-tight text-slate-900">{t('researchPage.returnWaterfall')}</h3>
                  {mintedPacks.length === 0 && (
                    <span className="text-[9px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">{language === 'zh' ? '预估收益' : 'EST. REWARDS'}</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '了解您的数据如何通过 ZK-Flare 协议持续产生价值' : 'How your data generates value via ZK-Flare protocol'}</p>
              </div>
            </div>
            <motion.span 
              animate={{ rotate: activeInfo === 'waterfall' ? 180 : 0 }}
              className="material-symbols-outlined text-slate-400"
            >
              expand_more
            </motion.span>
          </div>

          <AnimatePresence>
            {activeInfo === 'waterfall' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-8 pb-10">
                  <div className="relative before:absolute before:left-[11px] before:top-4 before:h-[calc(100%-32px)] before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:to-emerald-100/30">
                    {rewardStages.map((item, index) => (
                      <div key={item.name} className="relative pl-8 pb-8 last:pb-0">
                        <div className={`absolute left-0 top-1 h-[24px] w-[24px] rounded-full border-4 border-[#fdfaf5] ${index === 0 ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-emerald-200'}`} />
                        <div className="rounded-[24px] bg-white p-6 shadow-sm border border-orange-50/50">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{item.name}</p>
                            <p className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{item.value}</p>
                          </div>
                          <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-700 font-medium">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          layout
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="overflow-hidden rounded-[38px] bg-[#f5f8fd] border border-blue-100/50 shadow-sm transition-all hover:shadow-md cursor-pointer"
          onClick={() => setActiveInfo(activeInfo === 'faq' ? null : 'faq')}
        >
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                <span className="material-symbols-outlined text-2xl">help_outline</span>
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-900">{t('researchPage.faq.title')}</h3>
                <p className="text-sm text-slate-500 font-medium">{language === 'zh' ? '关于隐私保护、所有权及 R-NFT 的一切' : 'Everything about privacy, ownership & R-NFTs'}</p>
              </div>
            </div>
            <motion.span 
              animate={{ rotate: activeInfo === 'faq' ? 180 : 0 }}
              className="material-symbols-outlined text-slate-400"
            >
              expand_more
            </motion.span>
          </div>

          <AnimatePresence>
            {activeInfo === 'faq' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-8 pb-10 space-y-4">
                  {[
                    { title: t('researchPage.faq.whatIs.title'), desc: t('researchPage.faq.whatIs.desc'), icon: 'data_object' },
                    { title: t('researchPage.faq.privacy.title'), desc: t('researchPage.faq.privacy.desc'), icon: 'lock' },
                    { title: t('researchPage.faq.control.title'), desc: t('researchPage.faq.control.desc'), icon: 'key' }
                  ].map((item) => (
                    <div key={item.title} className="bg-white rounded-[28px] p-6 border border-blue-50/50 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-400 shrink-0">
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">{item.title}</h4>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );

  return (
    <PageTransition>
      <TopAppBar 
        avatarSrc={avatarBoy} 
      />

      <main className="relative space-y-8 px-6 pb-32 pt-4">
        <section className="aurora-panel editorial-frame overflow-hidden rounded-[38px] bg-gradient-to-br from-[#051811] via-[#0a2e21] to-[#04160f] p-7 text-white lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="max-w-[520px]">
              <div className="flex items-center gap-3">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-100/60">{t('researchPage.terminal')}</p>
                {isDidVerified && (
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 border border-emerald-400/30">
                    <span className="material-symbols-outlined text-[12px] text-emerald-400">verified</span>
                    <span className="text-[10px] font-bold text-emerald-400 tracking-wider">DID: VERIFIED</span>
                  </div>
                )}
              </div>
              <h1 className="mt-4 text-[2.5rem] font-black tracking-[-0.05em] leading-[0.92] md:text-[4.25rem]">
                {t('researchPage.title')}
              </h1>
              <p className="mt-4 max-w-[36ch] text-[0.95rem] leading-snug text-emerald-50/80">
                {t('researchPage.desc')}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button 
                  onClick={() => {
                    const el = document.getElementById('inventory-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#004d2c] shadow-lg active:scale-95 transition-all"
                >
                  {t('researchPage.mintNFT')}
                </button>
                <button 
                  onClick={() => navigate('/profile/did')}
                  className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white"
                >
                  {t('researchPage.reviewDID')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:translate-y-8">
              <div className="col-span-2 relative overflow-hidden rounded-[28px] border border-emerald-400/20 bg-gradient-to-br from-emerald-900/40 to-emerald-800/10 p-5 shadow-[0_8px_32px_rgba(0,255,127,0.15)] backdrop-blur-xl">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-200/70">{terminalStats[0].label}</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <p className="text-[2.6rem] font-black tracking-tight text-white leading-none">$1,250</p>
                  <span className="text-lg font-bold text-emerald-200/50">/ year</span>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">{terminalStats[2].label}</p>
                <p className="mt-2 text-[1.65rem] font-black tracking-tight text-emerald-100">{terminalStats[2].value}</p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-[20px] border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{t('researchPage.mintReady')}</p>
                  <p className="text-xl font-black text-white">{terminalStats[1].value}</p>
                </div>
                <div className="flex items-center justify-between rounded-[20px] border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{t('researchPage.pools')}</p>
                  <p className="text-xl font-black text-white">{terminalStats[3].value}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8">
          {!isDidVerified ? (
            <>
              {/* Unverified state: Education at top */}
              {renderEducation(true)}
              <section className="mt-12 rounded-[34px] border border-dashed border-emerald-300 bg-emerald-50/50 p-10 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-200">
                  <span className="material-symbols-outlined text-4xl">fingerprint</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                  {t('researchPage.guidance.mainTitle')}
                </h2>
                <p className="mt-4 max-w-md mx-auto text-sm text-slate-600 leading-relaxed font-medium">
                  {t('researchPage.guidance.mainDesc')}
                </p>
                <button 
                  onClick={() => navigate('/profile/did')}
                  className="mt-8 rounded-full bg-slate-900 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl hover:bg-emerald-600 transition-colors active:scale-95"
                >
                  {t('researchPage.guidance.cta')}
                </button>
              </section>
            </>
          ) : (
            <div className="space-y-12">
              {/* Verified state: Content reordered */}
              <div id="inventory-section" className="relative mt-12 lg:mt-24 pt-8 pb-8 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-[2px] w-12 bg-emerald-500"></div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">01. {language === 'zh' ? '数据资产盘点' : 'ASSET INVENTORY'}</span>
                </div>

                <div className="mt-8 overflow-hidden rounded-[34px] border border-slate-100 bg-white shadow-[0_16px_40px_-8px_rgba(0,0,0,0.04)]">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-100">
                          <span className="material-symbols-outlined text-2xl">inventory_2</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/70">{t('researchPage.inventoryBoard')}</p>
                          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-none mt-1">
                            {t('researchPage.inventoryTitle')}
                          </h2>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate('/research/collection')}
                        className="flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-slate-800 transition-all hover:bg-slate-900 hover:text-white shadow-sm group"
                      >
                        <span className="material-symbols-outlined text-lg transition-transform group-hover:rotate-12">auto_awesome_motion</span>
                        {t('researchPage.enterVault') || 'ENTER VAULT'}
                      </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                            {language === 'zh' ? '资产组装线' : 'ASSET ASSEMBLY LINE'}
                          </p>
                        </div>
                        <span className="text-xs font-black text-emerald-600">67%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-50">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: '67%' }} />
                      </div>
                      
                      <div className="mt-5">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                            {language === 'zh' ? '待补全信号:' : 'MISSING SIGNALS:'}
                          </p>
                          <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                            +120 GEF EST.
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                          {[
                            t('home.missingSignals.familyHistory'),
                            t('home.missingSignals.genotypePanel'),
                            t('home.missingSignals.bloodBiomarkers'),
                            t('home.missingSignals.sleepArchitecture')
                          ].map((signal) => (
                            <div key={signal} className="flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-2 text-[10px] font-bold text-slate-600">
                              <span className="material-symbols-outlined text-[14px] text-emerald-500">add_circle</span>
                              <span className="truncate">{signal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 mt-8">
                  {nftPacks.map((pack) => {
                    const isMinted = mintedPacks.includes(pack.id);
                    return (
                      <article key={pack.id} className="group rounded-[30px] border border-slate-200 bg-white transition-all hover:shadow-xl hover:border-emerald-200/50">
                        <div className="flex flex-col lg:flex-row">
                          <div className="flex-1 bg-slate-50 p-6 lg:p-10 rounded-t-[30px] lg:rounded-tr-none lg:rounded-l-[30px]">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-emerald-100/50 border border-emerald-200/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800">{pack.id}</span>
                              <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${isMinted ? 'bg-emerald-100 text-emerald-700 font-bold' : (pack.status === 'READY' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600')}`}>
                                {isMinted ? (language === 'zh' ? '加速搜索匹配中...' : 'ACCELERATING MATCH...') : pack.status}
                              </span>
                            </div>
                            <h3 className="mt-4 text-[1.6rem] font-black tracking-[-0.04em] leading-[1.1] text-slate-900 group-hover:text-emerald-900 transition-colors">{pack.title}</h3>
                            <div className="mt-4 space-y-2">
                              <p className="text-[0.85rem] leading-snug text-slate-600"><span className="font-black text-slate-900 uppercase text-[10px] tracking-wider mr-1">{t('researchPage.dataScope')}</span> {pack.signals}</p>
                              <p className="text-[0.85rem] leading-snug text-slate-600"><span className="font-black text-slate-900 uppercase text-[10px] tracking-wider mr-1">{t('researchPage.directions')}</span> {pack.directions}</p>
                            </div>
                          </div>
                          <div className="relative flex min-w-[280px] flex-col justify-center vitality-gradient p-8 lg:p-10 text-white overflow-hidden rounded-b-[30px] lg:rounded-bl-none lg:rounded-r-[30px] border-t lg:border-t-0 lg:border-l border-white/10">
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl pointer-events-none"></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">{t('researchPage.projectedValue')}</p>
                            <p className="mt-2 text-xl font-black tracking-tight">{pack.value}</p>
                            <div className="mt-6 space-y-3">
                              {isMinted ? (
                                <div className="flex flex-col gap-2">
                                  <p className="text-[10px] text-emerald-100 mt-2">
                                    {language === 'zh' 
                                      ? '您的数字身份已加密上链。所有验证均通过 ZK-Flare 协议完成。'
                                      : 'Your identity is encrypted on-chain. All verifications use ZK-Flare protocol.'
                                    }
                                  </p>
                                  <div className="h-10 w-full rounded-full bg-white/20 flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{language === 'zh' ? '正在加速匹配' : 'ACCELERATING'}</span>
                                  </div>
                                </div>
                              ) : (
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedPack(pack);
                                  }}
                                  className="w-full rounded-full vitality-gradient px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_8px_20px_rgba(0,255,127,0.25)] transition-all hover:brightness-110 active:brightness-95 active:scale-95 active:shadow-inner ring-2 ring-white/30 cursor-pointer"
                                >
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">token</span>
                                    {t('researchPage.mintNow')}
                                  </div>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <section className="relative mt-12 lg:mt-24 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-[2px] w-12 bg-slate-400"></div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">02. {language === 'zh' ? '科研需求匹配' : 'RESEARCH MATCHES'}</span>
                </div>
              
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[42px] bg-white p-8 shadow-[0_32px_64px_-16px_rgba(0,80,46,0.12)] lg:p-10 border border-slate-100/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                      <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-2xl shadow-slate-200">
                          <span className="material-symbols-outlined text-2xl">hub</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                            </span>
                            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">{t('researchPage.liveMatchbook')}</p>
                          </div>
                          <h2 className="mt-1 text-[2.2rem] font-black tracking-tight text-slate-950 leading-[1.1]">
                            {t('researchPage.matchbookTitle')}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      {projectMatches.map((item, index) => (
                        <div key={item.title} className="group relative overflow-hidden rounded-[28px] border border-slate-100 bg-slate-50 p-5 transition-all hover:bg-white hover:shadow-md">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-lg font-black tracking-tight text-slate-900">{item.title}</h3>
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
                                <div className={`h-full rounded-full ${index === 0 ? 'bg-emerald-500 w-[95%]' : 'bg-amber-400 w-[74%]'}`} />
                              </div>
                              <span className={`text-[11px] font-black uppercase tracking-[0.1em] ${index === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{item.match}</span>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-slate-600">{item.reward}</p>
                          <button className={`mt-5 rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.16em] transition-transform hover:scale-[1.02] active:scale-95 ${index === 0 ? 'vitality-gradient text-white border-none shadow-[0_4px_12px_rgba(0,255,127,0.15)]' : 'border border-slate-200 bg-white text-slate-700'}`}>
                            {item.action}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="editorial-frame relative hidden lg:block overflow-hidden rounded-[34px] bg-[#051119] p-6 text-emerald-400 shadow-[0_24px_64px_-16px_rgba(9,26,38,0.5)] border border-white/5 lg:p-7">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-500/60 font-mono">{t('researchPage.proofStream')}</p>
                    <h2 className="mt-3 text-[1.8rem] font-black tracking-[-0.05em] leading-[0.95] text-white">
                      {t('researchPage.proofTitle')}
                    </h2>
                    <div className="mt-8 space-y-1 font-mono text-[13px] tracking-tight">
                      {proofLogs.map((item) => (
                        <div key={item} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                          <span className="text-emerald-100/80">
                            <span className="text-emerald-500/50 mr-2">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
                            {item}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center gap-3 py-2">
                        <span className="block h-2 w-1.5 bg-emerald-400 animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Verified state: Education moved to bottom */}
              {renderEducation(false)}
            </div>
          )}
        </div>
      </main>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedPack && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPack(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[38px] bg-white p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">{selectedPack.id}</p>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">{selectedPack.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPack(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] bg-slate-50 p-5 border border-slate-100">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">{t('researchPage.modal.includedPoints')}</p>
                  <div className="space-y-3">
                    {selectedPack.details.map((detail) => (
                      <div key={detail.label} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5">verified</span>
                        <div>
                          <p className="text-sm font-black text-slate-800 leading-none">{detail.label}</p>
                          <p className="text-xs text-slate-500 mt-1">{detail.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] bg-emerald-950 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                    <span className="material-symbols-outlined text-4xl">security</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {t('researchPage.modal.protocolReady')}
                  </p>
                  <p className="text-sm leading-relaxed text-emerald-100/80">
                    {t('researchPage.modal.disclaimer')}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => {
                    const id = selectedPack.id.replace('#', '');
                    setSelectedPack(null);
                    navigate(`/mint/${id}`);
                  }}
                  className="flex-1 rounded-full vitality-gradient py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg active:scale-95 transition-transform"
                >
                  {t('researchPage.modal.confirmMint')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
