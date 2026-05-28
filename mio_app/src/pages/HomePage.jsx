import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
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
  syncPlansState,
} from '../data/plans';
import { useLanguage } from '../components/utils/LanguageContext';
import { GeneNetwork, ParticleField, AuroraOrbs } from './auth/SplashScreen';
import { useDemoState } from '../components/utils/DemoStateContext';

export default function HomePage() {
  const navigate = useNavigate();
  const [planSummaryOpen, setPlanSummaryOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(() => {
    const saved = localStorage.getItem('homepageVideoPlaying');
    return saved !== null ? saved === 'true' : true;
  });

  const toggleVideo = () => {
    setIsVideoPlaying(prev => {
      const newState = !prev;
      localStorage.setItem('homepageVideoPlaying', String(newState));
      return newState;
    });
  };

  const { t } = useLanguage();
  const highlightedInstitutionPlans = (institutionPlans || []).slice(0, 2);
  const recommendedCount = (homepageRecommendedPlans || []).length;

  const { state: demoState, updateState: updateDemoState } = useDemoState();

  // 新人正向任务链状态机与高级交互控制 ———— 完全由全局状态调试器驱动
  const missionStates = {
    tutorial: true, // 新人基础引导默认完成
    did: demoState.isDidVerified,
    device: demoState.isGenesisCompleted,
    assessment: demoState.isGenesisCompleted,
    plan: demoState.hasActivePlans || executingPlans.length > 0,
    nft: demoState.isGenesisCompleted,
  };

  const [deviceModal, setDeviceModal] = useState(false);
  const [connectionStep, setConnectionStep] = useState(1); // 1: 扫描搜寻 2: 绑定校验 3: 完美配对
  const [showGoldRain, setShowGoldRain] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const language = localStorage.getItem('language') || 'zh';

  // 监听全局状态并驱动黄金雨动效
  useEffect(() => {
    // 强制调用 plans 状态重新同步，以在当前组件挂载时保证最新数据
    syncPlansState();

    const allCompleted = Object.values(missionStates).every(Boolean);
    const isGenesisCompleted = demoState.isGenesisCompleted;
    if (allCompleted && !isGenesisCompleted) {
      setShowGoldRain(true);
    }
  }, [demoState]);

  const completedCount = Object.values(missionStates).filter(Boolean).length;
  // 确权隐私盾、生命天线、简易评估、NFT铸造 4 大子任务完成度
  const genesisCompletedCount = 
    (missionStates.did ? 1 : 0) + 
    (missionStates.device ? 1 : 0) + 
    (missionStates.tutorial ? 1 : 0) + 
    (missionStates.nft ? 1 : 0);
  // 动态累计 Spark，基准 70 Spark，加上确权 100, 设备 50, 简易评估 50, NFT 100，满额刚好为 370 Spark！
  const genesisSparkEarned = 70 + 
    (missionStates.did ? 100 : 0) + 
    (missionStates.device ? 50 : 0) + 
    (missionStates.tutorial ? 50 : 0) + 
    (missionStates.nft ? 100 : 0);
  // 全局 4 大主干任务完成度（确权隐私盾、智能天线、深度评估、激活计划）
  const globalCompletedCount = (missionStates.did ? 1 : 0) + (missionStates.device ? 1 : 0) + (missionStates.assessment ? 1 : 0) + (missionStates.plan ? 1 : 0);
  const showNewUserHub = !demoState.isGenesisCompleted;

  const handleConnectRing = () => {
    if (missionStates.device) {
      showToast(language === 'zh' ? '✨ 您的 Genius Ring 设备已完美在线连接！' : '✨ Your Genius Ring is already online!');
      return;
    }
    setDeviceModal(true);
    setConnectionStep(1);
    
    // 2.5 秒后发现设备并确权校验
    setTimeout(() => {
      setConnectionStep(2);
      // 4.5 秒后配对成功
      setTimeout(() => {
        setConnectionStep(3);
        // 5.7 秒后自动关闭并保存
        setTimeout(() => {
          localStorage.setItem('device_connected', 'true');
          setDeviceModal(false);
          
          const updated = {
            ...missionStates,
            device: true
          };
          setMissionStates(updated);
          showToast(language === 'zh' ? '✨ Genius Ring 配对成功，50 Spark 已到账！' : '✨ Genius Ring connected. +50 Spark awarded.');
          
          // 如果 5 个任务全数完成，触发通关弹窗
          const allCompleted = Object.values(updated).every(Boolean);
          const isGenesisCompleted = localStorage.getItem('genesisCompleted') === 'true';
          if (allCompleted && !isGenesisCompleted) {
            setShowGoldRain(true);
          }
        }, 1200);
      }, 2000);
    }, 2500);
  };

  const handleClaimGenesis = () => {
    updateDemoState({ isGenesisCompleted: true });
    setShowGoldRain(false);
    showToast(language === 'zh' ? '🏆 成功领取 500 Spark 创世大奖！Bento 任务链确权已完成。' : '🏆 Claimed 500 Spark. Genesis runway completed.');
  };

  const [bannerDismissed, setBannerDismissed] = useState(false);

  const resolveCopy = (path, fallback) => {
    const value = t(path);
    return value === path ? fallback : value;
  };

  const planTitle = (plan) => resolveCopy(`home.healthTasks.plans.${plan.id}`, plan.title);

  // Scroll animation hooks
  const { scrollY } = useScroll();
  const videoOpacity = useTransform(scrollY, [0, 500], [0.75, 0]);
  const staticOpacity = useTransform(scrollY, [0, 500], [0, 1]);

  return (
    <PageTransition>
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950">
        {/* The static premium background stays mounted, but dynamically fades in/out based on scroll & video state */}
        <motion.div
          key="premium-bg"
          style={{ opacity: isVideoPlaying ? staticOpacity : 1 }}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Brighter gradient base */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg, #0e0e1a 0%, #151526 40%, #1a1a2e 100%)' }}
          />

          {/* Shared Background from Splash Screen */}
          <AuroraOrbs />
          <ParticleField count={30} />
          <GeneNetwork />

          {/* Subtle Grid from Splash Screen */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </motion.div>

        {/* Video plays over the static background, driven by scroll opacity */}
        <AnimatePresence>
          {isVideoPlaying && (
            <motion.div
              key="video-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <motion.video
                style={{ opacity: videoOpacity }}
                autoPlay
                loop
                muted
                playsInline
                className="absolute h-full w-full object-cover scale-[1.01] contrast-[1.1] brightness-[0.9]"
                src={heroVideo}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Deep immersive gradients - Adjusted for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <TopAppBar 
        transparent
        avatarSrc={avatarBoy} 
        rightIcon={isVideoPlaying ? "motion_photos_paused" : "motion_photos_on"}
        onRightClick={toggleVideo}
      />

      <main className="relative z-10 pt-16 pb-32">
        {/* Main Content Animation Container */}
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* New User Bento Mission Hub — 创世新人任务中心 */}
          {showNewUserHub && (
            <motion.section
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="px-6 lg:max-w-[1400px] lg:mx-auto mb-10"
            >
              <div className="relative overflow-hidden rounded-[38px] border border-emerald-500/20 bg-gradient-to-br from-[#0c0d17]/95 via-[#0e1626]/90 to-[#05060a]/95 backdrop-blur-2xl p-7 md:p-8 shadow-[0_32px_80px_rgba(4,20,15,0.45)]">
                {/* Floating ambient aurora orb inside Bento */}
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-[60px] pointer-events-none animate-pulse" />
                <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-amber-500/10 blur-[60px] pointer-events-none animate-pulse" />

                {/* Header */}
                <div className="flex flex-col gap-5 mb-6 pb-6 border-b border-white/5 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="max-w-[620px]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-400 text-sm animate-pulse" style={{ fontFamily: "'Material Symbols Outlined'" }}>auto_awesome</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-emerald-400 font-mono">GENESIS MISSION CHAIN</span>
                      </div>
                      <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                        {language === 'zh' ? '开启您的创世健康资产链' : 'Complete your genesis runway'}
                      </h2>
                      <p className="text-xs text-white/40 font-medium mt-1.5 leading-relaxed">
                        {language === 'zh' ? '激活零知识加密身份与连续设备信号，通关解锁大额 500 Spark 创世资产。' : 'Secure your identity and devices to unlock 500 Spark genesis reward.'}
                      </p>
                    </div>

                    {/* 极简精致的线型进度条，在手机上高度仅占用 24px，极其省空间，高奢感满分 */}
                    <div className="flex flex-col gap-1.5 min-w-[180px] md:self-end shrink-0">
                      <div className="flex justify-between items-baseline text-[10px] font-black font-mono">
                        <span className="text-white/40 uppercase tracking-wider">{language === 'zh' ? '总进度' : 'GENESIS PROGRESS'}</span>
                        <span className="text-emerald-400">{globalCompletedCount}/4 {language === 'zh' ? '已完成' : 'DONE'} ({Math.round((globalCompletedCount / 4) * 100)}%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/5 border border-white/5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(globalCompletedCount / 4) * 100}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>                {/* Bento Grid */}
                <div className="grid grid-cols-12 gap-4 relative z-10">
                  {/* Card 1: Genesis Journey (母卡片，包含 did、device、tutorial、nft 状态展示，无冲突进度条) */}
                  <motion.div 
                    whileHover={{ y: -4, border: '1px solid rgba(245,158,11,0.3)', backgroundColor: 'rgba(255,255,255,0.06)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate('/genesis')}
                    className="col-span-12 rounded-[32px] bg-gradient-to-br from-[#0c0d17] via-[#0e1626] to-[#05060a] border border-amber-500/20 p-6 cursor-pointer flex flex-col gap-5 group relative overflow-hidden transition-all shadow-[0_24px_50px_rgba(0,0,0,0.4)]"
                  >
                    {/* Glowing background light inside card */}
                    <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-[60px] pointer-events-none group-hover:scale-125 transition-transform" />

                    <div className="flex items-center justify-between gap-4 relative z-10 w-full">
                      {/* Rocket Container */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                          <span className="material-symbols-outlined text-2xl font-black animate-pulse" style={{ fontFamily: "'Material Symbols Outlined'" }}>rocket_launch</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-white">{language === 'zh' ? '新手引导' : 'Genesis Journey'}</h3>
                            <span className="text-[10px] font-black bg-amber-500/25 text-amber-400 px-2 py-0.5 rounded-full font-mono">
                              {genesisCompletedCount}/4
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-white/20 group-hover:translate-x-1 transition-transform flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
                    </div>

                    {/* Nested Sub-tracks Container (Pointer events disabled, click events bubble up smoothly) */}
                    <div className="rounded-[22px] bg-black/35 border border-white/5 p-4 space-y-3.5 pointer-events-none relative z-10">
                      {/* Sub-item 1: ZK-DID */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'", color: missionStates.did ? '#34d399' : '#64748b' }}>
                            {missionStates.did ? 'check_circle' : 'fingerprint'}
                          </span>
                          <span className={`text-xs font-bold ${missionStates.did ? 'text-white/85' : 'text-white/40'}`}>
                            {language === 'zh' ? '确权隐私盾' : 'ZK-DID Shield'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-black font-mono text-emerald-400/90 w-14 justify-start">
                          <span className="material-symbols-outlined text-sm flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                          <span className="font-bold">+100</span>
                        </div>
                      </div>

                      {/* Sub-item 2: Wearable device (Genius Ring) */}
                      <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-3.5">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'", color: missionStates.device ? '#34d399' : '#64748b' }}>
                            {missionStates.device ? 'check_circle' : 'watch_button'}
                          </span>
                          <span className={`text-xs font-bold ${missionStates.device ? 'text-white/85' : 'text-white/40'}`}>
                            {language === 'zh' ? '智能生命天线' : 'Genius Ring Link'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-black font-mono text-emerald-400/90 w-14 justify-start">
                          <span className="material-symbols-outlined text-sm flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                          <span className="font-bold">+50</span>
                        </div>
                      </div>

                      {/* Sub-item 3: Basic assessment (tutorial / Health Profile) */}
                      <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-3.5">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'", color: missionStates.tutorial ? '#34d399' : '#64748b' }}>
                            {missionStates.tutorial ? 'check_circle' : 'analytics'}
                          </span>
                          <span className="text-xs font-bold text-white/85">
                            {language === 'zh' ? '简易健康评估' : 'Basic Health Profile'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-black font-mono text-emerald-400/90 w-14 justify-start">
                          <span className="material-symbols-outlined text-sm flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                          <span className="font-bold">+50</span>
                        </div>
                      </div>

                      {/* Sub-item 4: Research NFT Minting (nft) */}
                      <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-3.5">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'", color: missionStates.nft ? '#34d399' : '#64748b' }}>
                            {missionStates.nft ? 'check_circle' : 'token'}
                          </span>
                          <span className={`text-xs font-bold ${missionStates.nft ? 'text-white/85' : 'text-white/40'}`}>
                            {language === 'zh' ? '科研 NFT 铸造' : 'Research NFT Mint'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-black font-mono text-emerald-400/90 w-14 justify-start">
                          <span className="material-symbols-outlined text-sm flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                          <span className="font-bold">+100</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: Deep Health Assessment (并列卡片，高奢金光，占据 col-span-12 md:col-span-6) */}
                  <motion.div 
                    whileHover={{ y: -3, border: '1px solid rgba(251,191,36,0.4)', backgroundColor: 'rgba(251,191,36,0.03)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate('/ai-consultation', { state: { initialQuery: language === 'zh' ? '我想开启我的第一次 MIO 深度健康评估' : 'I want to start my deep health assessment' } })}
                    className="col-span-12 md:col-span-6 rounded-[28px] bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-5 cursor-pointer flex flex-col gap-4 group relative overflow-hidden transition-all"
                  >
                    {/* Glowing golden background light inside card */}
                    <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-amber-500/10 blur-[60px] pointer-events-none group-hover:scale-125 transition-transform" />
                    
                    <div className="flex items-start gap-3.5 relative z-10 min-w-0 w-full">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.2)] ${missionStates.assessment ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'bg-white/5 text-amber-400/60 border border-white/5'}`}>
                        <span className={`material-symbols-outlined text-xl flex-shrink-0 ${!missionStates.assessment ? 'animate-pulse text-amber-400' : ''}`} style={{ fontFamily: "'Material Symbols Outlined'" }}>
                          {missionStates.assessment ? 'check_circle' : 'auto_awesome'}
                        </span>
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[9px] font-black bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse whitespace-nowrap mb-1.5">{language === 'zh' ? '主线里程碑 · 核心确权' : 'CORE MILESTONE'}</span>
                        <h3 className="text-sm font-black text-white leading-tight">{language === 'zh' ? '深度健康评估' : 'Deep Health Assessment'}</h3>
                        <p className="text-[10px] text-white/50 font-medium mt-1 leading-relaxed">
                          {language === 'zh' ? '评估完成为您推荐最适合的健康计划' : 'Unlock tailored longevity protocols.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between relative z-10 gap-4 mt-1 w-full">
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-amber-400" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                        <span className="text-[10px] font-black text-amber-400 font-mono tracking-wider">+200 SPARK</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-[10px] font-black uppercase tracking-wider group-hover:text-amber-300 transition-colors">
                        <span>{language === 'zh' ? '立即开启' : 'Start Now'}</span>
                        <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3: Activate Health Plan (并列卡片，绿光，占据 col-span-12 md:col-span-6) */}
                  <motion.div 
                    whileHover={{ y: -3, border: '1px solid rgba(16,185,129,0.25)', backgroundColor: 'rgba(255,255,255,0.06)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/health-plan')}
                    className="col-span-12 md:col-span-6 rounded-[28px] bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-white/5 p-5 cursor-pointer flex flex-col gap-4 group relative overflow-hidden transition-all"
                  >
                    {/* Glowing emerald background light inside card */}
                    <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-[60px] pointer-events-none group-hover:scale-125 transition-transform" />

                    <div className="flex items-start gap-3.5 relative z-10 min-w-0 w-full">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${missionStates.plan ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white/40 border border-white/5'}`}>
                        <span className="material-symbols-outlined text-xl flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                          {missionStates.plan ? 'check_circle' : 'playlist_add_check'}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[9px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse whitespace-nowrap mb-1.5">{language === 'zh' ? '日常健康循环协议' : 'LONGEVITY PROTOCOL'}</span>
                        <h3 className="text-sm font-black text-white leading-tight">{language === 'zh' ? '激活日常健康计划' : 'Start Health Plan'}</h3>
                        <p className="text-[10px] text-white/50 font-medium mt-1 leading-relaxed">
                          {language === 'zh' ? '开启细胞级定制长寿日常协议' : 'Deploy cellular-level tailored longevity plan.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between relative z-10 gap-4 mt-1 w-full">
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-amber-400" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                        <span className="text-[10px] font-black text-emerald-400 font-mono tracking-wider">+100 SPARK</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase tracking-wider group-hover:text-emerald-300 transition-colors">
                        <span>{language === 'zh' ? '立即激活' : 'Activate'}</span>
                        <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform flex-shrink-0" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
                      </div>
                    </div>
                  </motion.div>
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
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto mt-12 md:mt-16">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-4">
              {[
                { 
                  label: t('home.sections.controlBoard.healthScore'), 
                  value: demoState.isGenesisCompleted ? '88' : '65', 
                  unit: demoState.isGenesisCompleted ? '' : ` (${language === 'zh' ? '评估中' : 'Evaluating'})`, 
                  color: demoState.isGenesisCompleted ? 'text-emerald-400' : 'text-amber-400', 
                  bg: demoState.isGenesisCompleted ? 'bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10', 
                  path: '/health-score' 
                },
                { 
                  label: t('home.sections.controlBoard.assetCompleteness'), 
                  value: demoState.isGenesisCompleted ? '94' : '12', 
                  unit: '%', 
                  color: demoState.isGenesisCompleted ? 'text-emerald-400' : 'text-slate-400', 
                  bg: demoState.isGenesisCompleted ? 'bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10', 
                  path: '/asset-completeness' 
                },
                { 
                  label: t('home.sections.controlBoard.mintReadyPacks'), 
                  value: demoState.isGenesisCompleted ? '3' : (demoState.isDidVerified ? '1' : '0'), 
                  unit: '', 
                  color: demoState.isGenesisCompleted ? 'text-cyan-400' : 'text-slate-500', 
                  bg: demoState.isGenesisCompleted ? 'bg-cyan-950/20 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-white/5 border-white/10', 
                  path: '/research' 
                },
                { 
                  label: t('home.sections.controlBoard.shieldTier'), 
                  value: demoState.isGenesisCompleted ? 'Gold 3' : 'Bronze 1', 
                  unit: '', 
                  color: demoState.isGenesisCompleted ? 'text-amber-400' : 'text-slate-500', 
                  bg: demoState.isGenesisCompleted ? 'bg-amber-950/20 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-white/5 border-white/10', 
                  path: '/shield' 
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 30 }}
                  onClick={() => navigate(item.path)}
                  className={`${item.bg} group relative overflow-hidden rounded-[36px] p-7 backdrop-blur-2xl border transition-all hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] cursor-pointer active:scale-95`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">{item.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black tracking-tighter ${item.color}`}>{item.value}</span>
                    {item.unit && <span className={`font-bold ${item.unit.includes('评估') || item.unit.includes('Eval') ? 'text-[10px] opacity-75' : 'text-xs text-white/30'}`}>{item.unit}</span>}
                  </div>
                  
                  {/* 高主权形态下的流光微感呼吸颗粒 */}
                  {demoState.isGenesisCompleted && (
                    <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-white/5 blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Live Device Sync Marquee */}
            <div className="flex items-center gap-4 py-3 px-6 rounded-full bg-white/5 border border-white/5 backdrop-blur-md overflow-hidden mb-10">
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
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto mb-8">
            <motion.div 
              whileHover={demoState.isGenesisCompleted ? { y: -4 } : {}}
              className={`rounded-[42px] bg-white p-8 border border-white transition-all duration-700
                ${demoState.isGenesisCompleted 
                  ? 'shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)]' 
                  : 'shadow-md opacity-85'
                }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-600/60">{t('home.sections.researchNFT.tag')}</span>
                  <h2 className="mt-3 text-[2.2rem] font-black tracking-[-0.05em] leading-[0.95] text-slate-950 max-w-[18ch]">
                    {t('home.sections.researchNFT.title')}
                  </h2>
                </div>
                <div className={`rounded-[28px] px-6 py-5 text-right border transition-all duration-700 flex-shrink-0
                  ${demoState.isGenesisCompleted 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{t('home.sections.researchNFT.estValue')}</p>
                  <p className={`mt-2 text-2xl font-black tracking-tight ${demoState.isGenesisCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {demoState.isGenesisCompleted ? '180-260 GEF' : '-- GEF'}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-end justify-between px-1">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t('home.sections.researchNFT.mintReadiness')}</p>
                  <p className="text-lg font-black text-emerald-500">{demoState.isGenesisCompleted ? '67%' : '0%'}</p>
                </div>
                <div className="h-3.5 overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: demoState.isGenesisCompleted ? '67%' : '0%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#29b5b5,#53cdcd)] shadow-[0_0_12px_rgba(41,185,129,0.4)]" 
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 border border-slate-100">
                  <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${demoState.isGenesisCompleted ? 'bg-amber-400' : 'bg-slate-350'}`} />
                  <span className="text-[11px] font-bold text-slate-500">
                    {demoState.isGenesisCompleted 
                      ? <>{t('home.mintableState')} <span className="font-black text-slate-900">2 {t('home.preQualified')}</span></>
                      : (language === 'zh' ? '当前可铸造状态: 0 个数据包已预审' : '0 pre-qualified packets ready')
                    }
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (!demoState.isGenesisCompleted) {
                      showToast(language === 'zh' ? '⚠️ 请先通关创世健康资产链的所有任务以解锁铸造主权' : '⚠️ Complete all genesis tasks to unlock research minting.');
                      return;
                    }
                    navigate('/research');
                  }}
                  className={`rounded-full px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all
                    ${demoState.isGenesisCompleted 
                      ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 active:scale-95' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                >
                  {demoState.isGenesisCompleted ? t('home.sections.researchNFT.completeAndMint') : (language === 'zh' ? '尚未解锁' : 'LOCKED')}
                </button>
              </div>
            </motion.div>
          </section>

          {/* Health Plan Section - The Flowing Layout Component */}
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto mt-8 md:mt-10">
            <motion.article 
              layout
              onClick={() => navigate('/health-plan')}
              className="relative overflow-hidden rounded-[42px] bg-white/95 p-8 shadow-[0_48px_120px_-32px_rgba(0,40,20,0.25)] border border-white cursor-pointer hover:shadow-[0_56px_130px_-28px_rgba(0,40,20,0.28)] hover:scale-[1.005] transition-all duration-500"
            >
              {/* Internal Layout Control */}
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-[2rem] font-black tracking-[-0.05em] text-slate-950 leading-none">{t('home.sections.planSummary.title')}</h2>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlanSummaryOpen(!planSummaryOpen);
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      <motion.span 
                        animate={{ rotate: planSummaryOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="material-symbols-outlined text-[20px]"
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
                    className={`relative rounded-[32px] bg-[linear-gradient(145deg,#0d1f14_0%,#153d28_100%)] p-5 text-white shadow-lg flex flex-col ${!planSummaryOpen ? 'aspect-square justify-between' : ''}`}
                  >
                    <motion.div layout className="flex justify-between items-start gap-2">
                      <p className={`flex-1 ${planSummaryOpen ? 'max-w-[8.5rem] text-[10px] leading-[1.55]' : 'text-[10px] leading-[1.45]'} font-black uppercase tracking-[0.14em] text-emerald-100/40 break-words`}>{t('home.sections.planSummary.executingTitle')}</p>
                      <motion.span layout className={`flex-shrink-0 ${planSummaryOpen ? 'text-2xl' : 'text-4xl leading-none'} font-black tracking-tighter`}>{executingPlans.length}</motion.span>
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
                    className={`relative rounded-[32px] bg-slate-50 p-5 shadow-sm border border-slate-200 flex flex-col overflow-hidden ${!planSummaryOpen ? 'aspect-square justify-between' : ''}`}
                  >
                    <motion.div layout className="flex justify-between items-start gap-2">
                      <p className={`flex-1 ${planSummaryOpen ? 'max-w-[8.5rem] text-[10px] leading-[1.55]' : 'text-[10px] leading-[1.45]'} font-black uppercase tracking-[0.14em] text-slate-400 break-words`}>{t('home.sections.planSummary.institutionTitle')}</p>
                      <motion.span layout className={`flex-shrink-0 ${planSummaryOpen ? 'text-2xl' : 'text-4xl leading-none'} font-black tracking-tighter text-slate-900`}>{institutionPlans.length}</motion.span>
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
                        <div className="mt-auto space-y-1 overflow-hidden">
                          {highlightedInstitutionPlans.slice(0, 2).map((plan) => (
                            <div key={plan.id} className="flex flex-col">
                              <p className="truncate text-[10px] font-bold text-slate-700 w-full leading-[1.3]">{planTitle(plan)}</p>
                              <span className="text-[9px] font-black text-emerald-600 whitespace-nowrap leading-[1.3]">{plan.reward}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Card 3: Spark Value */}
                  <motion.div 
                    layout 
                    className={`rounded-[32px] bg-[#fff2e0] p-5 text-amber-950 shadow-sm flex flex-col ${!planSummaryOpen ? 'aspect-square justify-between' : ''}`}
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
                    className={`relative rounded-[32px] bg-[#eff9f9] p-5 text-cyan-950 shadow-sm flex flex-col ${!planSummaryOpen ? 'aspect-square justify-between' : ''}`}
                  >
                    <motion.div layout className="flex justify-between items-start gap-2">
                      <p className={`flex-1 ${planSummaryOpen ? 'max-w-[8.5rem] text-[10px] leading-[1.55]' : 'text-[10px] leading-[1.45]'} font-black uppercase tracking-[0.14em] text-cyan-900/40 break-words`}>{t('home.sections.planSummary.recommendedJoin')}</p>
                      <motion.span layout className={`flex-shrink-0 ${planSummaryOpen ? 'text-2xl' : 'text-4xl leading-none'} font-black tracking-tighter`}>{recommendedCount}</motion.span>
                    </motion.div>
                    
                    <div className="mt-auto space-y-1 overflow-hidden">
                      {homepageRecommendedPlans.slice(0, 2).map((plan) => (
                        <p key={plan.id} className="truncate text-[10px] font-bold text-slate-700 w-full leading-[1.3]">
                          {planTitle(plan)}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          </section>

          {/* Task Queue Sections - These will slide down naturally because of layout prop above */}
          <section className="px-6 lg:max-w-[1400px] lg:mx-auto space-y-12 mt-10 md:mt-14">
            {/* Research Tasks */}
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight text-white/90 px-1">{t('home.healthTasks.sections.research')}</h3>
              <div className="grid gap-4">
                {!demoState.hasActivePlans ? (
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[34px] p-8 border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-md shadow-2xl flex flex-col gap-6"
                  >
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/5 blur-[50px] pointer-events-none" />
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.15)] animate-pulse">
                        <span className="material-symbols-outlined text-2xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>biotech</span>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-black text-white">{language === 'zh' ? 'AI 科研数据授权通道就绪' : 'AI Research Data Pipeline'}</h4>
                        <p className="mt-3 text-xs leading-relaxed text-white/50 font-medium max-w-[45ch]">
                          {language === 'zh' 
                            ? '您目前暂无活跃的科研合作计划。激活 Novartis 或 Bayer 等国际前沿研究机构的科研类协议，即可通过安全共享非敏感生理信号，在贡献全球科学研究的同时，铸造专属数据 NFT 并获得 GEF 资产。' 
                            : 'No active research protocols found. Join Novartis, Bayer, or other peer clinical programs to securely synthesize non-sensitive bio-records into value-producing Research NFTs.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-5 gap-4">
                      <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        ZK-DID Encrypted
                      </div>
                      <button 
                        onClick={() => navigate('/health-plan')}
                        className="rounded-full bg-white text-slate-950 px-6 py-2.5 text-xs font-black uppercase tracking-widest shadow-lg hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
                      >
                        {language === 'zh' ? '去激活科研计划' : 'Browse Research'}
                      </button>
                    </div>
                  </motion.article>
                ) : (
                  researchSignals.map((task, index) => (
                    <motion.article
                      key={task.title}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="relative overflow-hidden rounded-[40px] shadow-[0_24px_54px_-12px_rgba(0,0,0,0.18)] transition-all duration-500 bg-white text-slate-950"
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
                          <span className="rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-600">
                            {task.sponsor || t('home.healthTasks.sections.research')}
                          </span>
                          <div className="rounded-full bg-amber-500/10 px-3 py-1 flex items-center gap-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">
                            <span className="material-symbols-outlined text-[13px] text-amber-500" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                            <span>{task.reward}</span>
                          </div>
                        </div>

                        <h3 className="mt-5 max-w-[16ch] text-xl md:text-[2rem] lg:text-[2.2rem] font-black tracking-[-0.05em] leading-[1.1] md:leading-[1.05] uppercase">
                          {resolveCopy(`home.healthTasks.items.${task.id}.title`, task.title)}
                        </h3>
                        
                        <p className="mt-4 max-w-[32ch] text-sm font-medium leading-relaxed text-slate-500">
                          {resolveCopy(`home.healthTasks.items.${task.id}.subtitle`, task.subtitle)}
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                          <button className="rounded-full px-6 py-3.5 text-xs font-black uppercase tracking-[0.18em] transition-all active:scale-95 shadow-lg bg-emerald-600 text-white shadow-emerald-600/20">
                            {t('home.healthTasks.cta.complete')}
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))
                )}
              </div>
            </div>

            {/* Personal Task Queue */}
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight text-white/90 px-1">{t('home.healthTasks.sections.personal')}</h3>
              <div className="grid gap-4">
                {personalTaskQueue.length === 0 ? (
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[34px] p-8 border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-md shadow-2xl flex flex-col gap-6"
                  >
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-500/5 blur-[50px] pointer-events-none" />
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.15)] animate-pulse">
                        <span className="material-symbols-outlined text-2xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>auto_awesome</span>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-black text-white">{language === 'zh' ? 'AI 孪生体干预行为就绪' : 'AI Longevity Coprocessor'}</h4>
                        <p className="mt-3 text-xs leading-relaxed text-white/50 font-medium max-w-[45ch]">
                          {language === 'zh' 
                            ? '您目前暂无活跃的长寿行为协议。请前往「健康计划」页面激活首个符合您细胞特征与日常节奏的长寿干预计划。' 
                            : 'No active personal protocols found. Activate your cellular-level longevity plan in Health Plan board to start syncing daily biometrics.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-5 gap-4">
                      <div className="text-[10px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        AI Recommended
                      </div>
                      <button 
                        onClick={() => navigate('/health-plan')}
                        className="rounded-full bg-white text-slate-950 px-6 py-2.5 text-xs font-black uppercase tracking-widest shadow-lg hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
                      >
                        {language === 'zh' ? '去激活健康计划' : 'Activate Plan'}
                      </button>
                    </div>
                  </motion.article>
                ) : (
                  personalTaskQueue.map((task, i) => (
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
                        <div className="text-right whitespace-nowrap flex flex-col items-end">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{t('home.healthTasks.reward')}</p>
                          <div className="flex items-center gap-0.5 mt-1 text-2xl font-black text-amber-400">
                            {task.reward.includes('SPARK') && (
                              <span className="material-symbols-outlined text-[20px]" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                            )}
                            <span>{task.reward}</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))
                )}
              </div>
            </div>
          </section>
          {/* Wearable Device Connecting Simulation Modal */}
          <AnimatePresence>
            {deviceModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="relative w-full max-w-[420px] overflow-hidden rounded-[38px] border border-emerald-500/30 bg-gradient-to-b from-slate-950 via-[#0e1626] to-slate-950 p-8 shadow-[0_32px_64px_-12px_rgba(4,120,87,0.3)] text-center text-white"
                >
                  {/* Decorative HSL laser flow */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setDeviceModal(false)}
                    className="absolute right-5 top-5 h-8 w-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>

                  {/* Bluetooth Radar Scanning / Pairing / Success Animations */}
                  <div className="my-8 flex justify-center">
                    <div className="relative flex h-36 w-36 items-center justify-center">
                      
                      {/* Radar Rings (Scan phase) */}
                      {connectionStep === 1 && (
                        <>
                          <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping opacity-75" />
                          <div className="absolute inset-4 rounded-full border border-emerald-500/20 animate-ping opacity-50" style={{ animationDelay: '0.8s' }} />
                          <div className="absolute inset-8 rounded-full border border-emerald-500/20 animate-ping opacity-30" style={{ animationDelay: '1.6s' }} />
                        </>
                      )}

                      {/* ZK cryptographic flow rings (Pair phase) */}
                      {connectionStep === 2 && (
                        <>
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/40 animate-spin" style={{ animationDuration: '6s' }} />
                          <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                        </>
                      )}

                      {/* Success Glowing Rings (Success phase) */}
                      {connectionStep === 3 && (
                        <div className="absolute inset-0 rounded-full bg-emerald-500/10 border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse" />
                      )}

                      {/* Hardware Device Ring Icon representation */}
                      <motion.div 
                        animate={connectionStep === 3 ? { scale: [1, 1.15, 1] } : { rotate: 360 }}
                        transition={connectionStep === 3 ? { duration: 0.6 } : { repeat: Infinity, duration: 10, ease: "linear" }}
                        className={`z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-slate-900 shadow-inner ${connectionStep === 3 ? 'border-emerald-400 text-emerald-400' : 'border-emerald-500/30 text-emerald-500/80'}`}
                      >
                        <span className="material-symbols-outlined text-[36px]" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                          {connectionStep === 3 ? 'task_alt' : 'watch_button'}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Connection state description copies */}
                  <AnimatePresence mode="wait">
                    {connectionStep === 1 && (
                      <motion.div key="step-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <h4 className="text-lg font-black tracking-tight text-white">{language === 'zh' ? '正在寻回 MIO 生命天线...' : 'Searching Genius Ring...'}</h4>
                        <p className="mt-2 text-xs text-white/40 leading-relaxed max-w-[28ch] mx-auto">
                          {language === 'zh' ? '请将指环戴在手上，保持天线畅通以发射连续加密脉冲。' : 'Wear your ring and keep Bluetooth enabled to establish connection.'}
                        </p>
                      </motion.div>
                    )}

                    {connectionStep === 2 && (
                      <motion.div key="step-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <h4 className="text-lg font-black tracking-tight text-cyan-400 flex items-center justify-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                          {language === 'zh' ? '发现 Genius Ring #0894' : 'Found Genius Ring #0894'}
                        </h4>
                        <p className="mt-2 text-xs text-white/40 leading-relaxed max-w-[28ch] mx-auto">
                          {language === 'zh' ? '正在对数据进行零知识验证并确权至本地隐私节点...' : 'Validating telemetry stream using local Zero-Knowledge keys...'}
                        </p>
                      </motion.div>
                    )}

                    {connectionStep === 3 && (
                      <motion.div key="step-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <h4 className="text-lg font-black tracking-tight text-emerald-400">{language === 'zh' ? '智能天线完美配对！' : 'Genius Ring Connected!'}</h4>
                        <p className="mt-2 text-xs text-emerald-400/70 font-semibold leading-relaxed max-w-[28ch] mx-auto">
                          {language === 'zh' ? '生命信号已接入隐私网，+50 Spark 通关确权中。' : 'Telemetry online. +50 Spark awarded to your asset vault.'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* All Missions Completed — Genesis Pioneer Medal Modal */}
          <AnimatePresence>
            {showGoldRain && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
              >
                {/* Immersive Gold Background Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                  <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-[90px]" />
                  <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-[90px]" />
                </div>

                <motion.div
                  initial={{ scale: 0.85, rotate: -2, y: 30 }}
                  animate={{ scale: 1, rotate: 0, y: 0 }}
                  exit={{ scale: 0.85, rotate: 2, y: 30 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                  className="relative w-full max-w-[480px] overflow-hidden rounded-[42px] border border-amber-400/40 bg-gradient-to-b from-slate-950 via-[#1c1407] to-slate-950 p-8 md:p-10 shadow-[0_32px_80px_rgba(245,158,11,0.25)] text-center text-white"
                >
                  {/* Decorative Amber light tube */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  
                  {/* 3D Floating Genesis Pioneer Medal Representation (SVG) */}
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative my-4 flex justify-center"
                  >
                    <div className="relative flex h-40 w-40 items-center justify-center">
                      {/* Rotating Outer Astrolabe rings */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/30 animate-spin" style={{ animationDuration: '15s' }} />
                      <div className="absolute inset-2 rounded-full border border-amber-400/20 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
                      
                      {/* Outer Golden Glow */}
                      <div className="absolute inset-4 rounded-full bg-amber-500/10 shadow-[0_0_50px_rgba(245,158,11,0.4)] animate-pulse" />

                      {/* Golden Metal Badge Base */}
                      <div className="z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 border border-amber-200/50 shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                        <span className="material-symbols-outlined text-[54px] text-slate-950 font-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] animate-pulse" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                          emoji_events
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-400 font-mono">{language === 'zh' ? '创世探索全通关' : 'GENESIS RUNWAY COMPLETED'}</h3>
                  
                  <h2 className="mt-2 text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                    {language === 'zh' ? '授勋：创世健康领航者' : 'Genesis Pioneer Medal'}
                  </h2>

                  <p className="mt-4 text-xs text-white/60 leading-relaxed font-medium max-w-[36ch] mx-auto">
                    {language === 'zh' ? '您已成功在本地验证 ZK-DID 身份、连通智能天线并进行了深度长寿评估，在 MIO 共享网络中完成了数据确权，被正式载入创世健康资产链。' : 'Your identity shield, device, and deep assessment are successfully signed and committed. All protocols are online.'}
                  </p>

                  <div className="mt-6 inline-flex flex-col items-center justify-center bg-amber-400/10 border border-amber-400/30 rounded-3xl px-8 py-4 shadow-inner">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">{language === 'zh' ? '结算创世大奖' : 'REWARD VAULT'}</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-400">
                      <span className="material-symbols-outlined text-2xl font-black" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                      <span className="text-3xl font-black font-mono">+500 SPARK</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleClaimGenesis}
                      className="w-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-4 text-[12px] font-black uppercase tracking-[0.2em] text-slate-950 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
                    >
                      {language === 'zh' ? '确权领取并开启长寿纪元' : 'Claim Reward & Unlock Longevity'}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* High-Fidelity Floating Notification Toasts */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3.5 rounded-full border border-emerald-500/30 bg-slate-950/90 px-6 py-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="material-symbols-outlined text-[12px] font-black">check</span>
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-100">{toast}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </PageTransition>
  );
}
