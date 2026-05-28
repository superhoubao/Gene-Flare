import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopAppBar from '../../components/layout/TopAppBar';
import HealthPlan from './HealthPlan';
import avatarBoy from '../../assets/avatar_boy_v2.png';
import { executingPlans, institutionPlans, recommendedPlans } from '../../data/plans';
import { useLanguage } from '../../components/utils/LanguageContext';
import { useDemoState } from '../../components/utils/DemoStateContext';

export default function HealthPlanPage() {
  const { t, lang: language } = useLanguage();
  const navigate = useNavigate();
  const { state: demoState } = useDemoState();
  
  // 完全由全局 hasActivePlans 状态联动
  const isNewUser = !demoState.hasActivePlans;
  
  console.log('HealthPlan View Mode:', isNewUser ? 'SQUARE' : 'PLANS', 'Executing Plans:', executingPlans.length);

  const summary = isNewUser 
    ? [
        { label: 'Available Plans', value: String(recommendedPlans.length + institutionPlans.length) },
        { label: 'Est. Daily Spark', value: '450+' },
        { label: 'AI Ready', value: 'NO' }, // Placeholder for assessment status
        { label: 'Challenges', value: '12' },
      ]
    : [
        { label: t('healthPlan.dashboard.executingPlans'), value: String(executingPlans.length) },
        { label: t('healthPlan.dashboard.todayTasks'), value: '4' },
        { label: t('healthPlan.dashboard.recommendedPlans'), value: String(recommendedPlans.length) },
        { label: t('healthPlan.dashboard.institutionPlans'), value: String(institutionPlans.length) },
      ];

  return (
    <div className="min-h-screen bg-background text-on-surface relative">
      <TopAppBar showBack title={t('healthPlan.dashboard.pageTitle')} rightIcon={null} avatarSrc={avatarBoy} />
      <main className="px-6 pb-24 pt-6">
        
        {/* ========================================================= */}
        {/* NEW USER: Immensely Clear, High-Contrast Top Assessment Banner */}
        {/* ========================================================= */}
        {isNewUser && (
          <motion.section 
            whileHover={{ y: -3, border: '2px solid rgba(251,191,36,0.7)', boxShadow: '0 24px 60px rgba(245,158,11,0.35)' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate('/ai-consultation', { state: { initialQuery: language === 'zh' ? '我想开启我的第一次 MIO 深度健康评估' : 'I want to start my deep health assessment' } })}
            className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#090b14] via-[#0d0f1a] to-[#121424] border-2 border-amber-400/60 p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_24px_50px_rgba(0,0,0,0.4)] mb-10 group"
          >
            {/* Floating glowing aura behind */}
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/15 to-transparent blur-[60px] pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-blue-500/5 blur-[50px] pointer-events-none" />

            {/* Left Block: Icon & Main Info */}
            <div className="flex items-start md:items-center gap-5 min-w-0 flex-1 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/30 to-amber-600/10 text-amber-300 border border-amber-400/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl animate-pulse" style={{ fontFamily: "'Material Symbols Outlined'" }}>auto_awesome</span>
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block text-[10px] font-black bg-gradient-to-r from-amber-500/30 to-amber-600/30 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse whitespace-nowrap">
                      {language === 'zh' ? '主线评估 · 待开启' : 'CORE ASSESSMENT'}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                    {language === 'zh' ? '深度健康评估' : 'Deep Health Assessment'}
                  </h4>
                </div>
                {/* 描述文字提升对比度，使用 text-slate-100，字重 font-black，确保绝对清晰，无省略截断 */}
                <p className="text-xs md:text-sm text-slate-100 font-bold mt-2 leading-relaxed max-w-[58ch]">
                  {language === 'zh' ? '评估完成为您推荐最适合的健康计划，以最快实现健康和财富收益。' : 'Complete the assessment to unlock tailored plans for maximizing your health & wealth.'}
                </p>
              </div>
            </div>

            {/* Right Block: Reward & Action link */}
            <div className="flex flex-row items-center justify-between md:justify-end gap-4 relative z-10 flex-shrink-0 border-t border-white/10 pt-4 md:pt-0 md:border-0 md:pl-6 w-full md:w-auto">
              <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/45 rounded-2xl px-4 py-2 flex items-center gap-1.5 flex-shrink-0 shadow-[inset_0_1px_8px_rgba(251,191,36,0.1)]">
                <span className="material-symbols-outlined text-sm text-amber-300" style={{ fontFamily: "'Material Symbols Outlined'" }}>bolt</span>
                <span className="text-[11px] font-black text-amber-300 font-mono tracking-wider whitespace-nowrap">+200 SPARK</span>
              </div>
              
              {/* 高奢黄/金实体渐变按钮，完美解决字小看不清、点击欲不够强的痛点 */}
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 px-5 py-2.5 rounded-full font-black text-xs md:text-sm tracking-wider shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.55)] group-hover:scale-105 transition-all duration-300 whitespace-nowrap">
                <span>{language === 'zh' ? '立即开启' : 'Start Assessment'}</span>
                <span className="material-symbols-outlined text-sm font-black flex-shrink-0 group-hover:translate-x-1 transition-transform" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
              </div>
            </div>
          </motion.section>
        )}

        {/* ========================================================= */}
        {/* EXISTING USER: Dashboard header */}
        {/* ========================================================= */}
        {!isNewUser && (
          <section className="editorial-frame overflow-hidden rounded-[38px] p-7 shadow-[0_18px_44px_-20px_rgba(83,205,205,0.15)] bg-gradient-to-br from-[#f4f2eb] via-white to-[#eef4f0]">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-[520px]">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/55">
                  {t('healthPlan.dashboard.tag')}
                </p>
                <h1 className="mt-4 text-[3rem] font-black tracking-[-0.05em] leading-[0.92] md:text-[4rem] text-slate-950">
                  {t('healthPlan.dashboard.title')}
                </h1>
                <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-slate-600">
                  {t('healthPlan.dashboard.desc')}
                </p>
              </div>

              <div className="grid w-full grid-cols-2 gap-4 lg:w-auto lg:min-w-[320px] lg:translate-y-6">
                {summary.map((item, index) => (
                  <div key={item.label} className={`flex flex-col justify-between rounded-[28px] p-5 shadow-lg backdrop-blur-md border transition-transform bg-white/90 border-white/60 ${index % 2 === 0 ? 'lg:-translate-y-4' : 'lg:translate-y-4'} hover:-translate-y-1`}>
                    <p className="text-[12px] font-black uppercase tracking-[0.12em] leading-tight text-slate-500">{item.label}</p>
                    <p className="mt-4 text-[2.5rem] font-black leading-none tracking-tight text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="mt-10">
          <HealthPlan isNewUser={isNewUser} />
        </div>
      </main>
    </div>
  );
}
