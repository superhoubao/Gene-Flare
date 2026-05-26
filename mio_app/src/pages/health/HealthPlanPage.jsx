import { useState } from 'react';
import TopAppBar from '../../components/layout/TopAppBar';
import HealthPlan from './HealthPlan';
import avatarBoy from '../../assets/avatar_boy_v2.png';
import { executingPlans, institutionPlans, recommendedPlans } from '../../data/plans';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function HealthPlanPage() {
  const { t } = useLanguage();
  // 默认根据数据判断，但允许通过按钮强制切换
  const [viewMode, setViewMode] = useState(executingPlans.length === 0 ? 'SQUARE' : 'PLANS');
  const isNewUser = viewMode === 'SQUARE';
  
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
      <div className="absolute top-14 right-20 z-[60]">
        <button 
          onClick={() => setViewMode(viewMode === 'SQUARE' ? 'PLANS' : 'SQUARE')}
          className="px-3 py-1 bg-tertiary text-slate-900 text-[10px] font-black rounded-full shadow-lg border border-tertiary"
        >
          {viewMode === 'SQUARE' ? 'DEBUG: SHOW PLANS' : 'DEBUG: SHOW SQUARE'}
        </button>
      </div>
      <TopAppBar showBack title={t('healthPlan.dashboard.pageTitle')} rightIcon={null} avatarSrc={avatarBoy} />
      <main className="px-6 pb-24 pt-6">
        <section className={`editorial-frame overflow-hidden rounded-[38px] p-7 shadow-[0_18px_44px_-20px_rgba(83,205,205,0.15)] ${
          isNewUser 
            ? 'bg-gradient-to-br from-[#1c1c30] via-[#151526] to-[#0a0a14] text-white' 
            : 'bg-gradient-to-br from-[#f4f2eb] via-white to-[#eef4f0]'
        }`}>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[520px]">
              <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${isNewUser ? 'text-tertiary' : 'text-primary/55'}`}>
                {isNewUser ? 'Ready to Start?' : t('healthPlan.dashboard.tag')}
              </p>
              <h1 className={`mt-4 text-[3rem] font-black tracking-[-0.05em] leading-[0.92] md:text-[4rem] ${isNewUser ? 'text-white' : 'text-slate-950'}`}>
                {isNewUser ? 'Your Health Journey' : t('healthPlan.dashboard.title')}
              </h1>
              <p className={`mt-4 max-w-[36ch] text-sm leading-relaxed ${isNewUser ? 'text-white/60' : 'text-slate-600'}`}>
                {isNewUser 
                  ? 'Join personalized plans to optimize your wellness and earn daily Spark rewards.' 
                  : t('healthPlan.dashboard.desc')}
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-4 lg:w-auto lg:min-w-[320px] lg:translate-y-6">
              {summary.map((item, index) => (
                <div key={item.label} className={`flex flex-col justify-between rounded-[28px] p-5 shadow-lg backdrop-blur-md border transition-transform ${
                  isNewUser 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/90 border-white/60'
                } ${index % 2 === 0 ? 'lg:-translate-y-4' : 'lg:translate-y-4'} hover:-translate-y-1`}>
                  <p className={`text-[12px] font-black uppercase tracking-[0.12em] leading-tight ${isNewUser ? 'text-white/40' : 'text-slate-500'}`}>{item.label}</p>
                  <p className={`mt-4 text-[2.5rem] font-black leading-none tracking-tight ${isNewUser ? 'text-tertiary' : 'text-slate-950'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10">
          <HealthPlan isNewUser={isNewUser} />
        </div>
      </main>
    </div>
  );
}
