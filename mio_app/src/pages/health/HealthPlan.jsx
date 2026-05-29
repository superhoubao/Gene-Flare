import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  completedPlans,
  executingPlans,
  institutionPlanCards,
  planTaskQueue,
  recommendedPlans,
} from '../../data/plans';
import { useLanguage } from '../../components/utils/LanguageContext';

const effectTracking = [
  { icon: 'favorite', labelKey: 'health.restingHR', label: 'Resting HR', value: '62 BPM', change: '↓ 4%', panel: 'bg-[#fff4f2]' },
  { icon: 'directions_run', labelKey: 'health.dailySteps', label: 'Daily Steps', value: '8,420', change: '↑ 12%', panel: 'bg-[#eef7ef]' },
  { icon: 'dark_mode', labelKey: 'health.deepSleep', label: 'Deep Sleep', value: '1h 45m', change: '--', panel: 'bg-[#f2f3fb]' },
];

export default function HealthPlan({ isNewUser = false }) {
  const { t, lang: language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, duration = 3000) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const [activePlanIds, setActivePlanIds] = useState(() => {
    return executingPlans.map(p => p.id);
  });
  const resolveCopy = (path, fallback) => {
    const value = t(path);
    return value === path ? fallback : value;
  };
  const planTitle = (plan) => resolveCopy(`home.healthTasks.plans.${plan.id}`, plan.title);
  const planSource = (plan) => resolveCopy(`plansData.${plan.id}.sourceLabel`, plan.sourceLabel);
  const planProgress = (plan) => resolveCopy(`plansData.${plan.id}.progressLabel`, plan.progressLabel);
  const planSummary = (plan) => resolveCopy(`plansData.${plan.id}.summary`, plan.summary);
  const planReason = (plan) => resolveCopy(`plansData.${plan.id}.recommendationReason`, plan.recommendationReason);
  const planAction = (plan) => resolveCopy(`plansData.${plan.id}.todayAction`, plan.todayAction);
  const planValue = (plan) => resolveCopy(`plansData.${plan.id}.planValue`, plan.planValue);
  const planMeta = (plan, key, fallback) => resolveCopy(`plansData.${plan.id}.${key}`, fallback);
  const taskCopy = (task, key, fallback) => resolveCopy(`home.healthTasks.items.${task.id}.${key}`, fallback);
  const completedPlanName = (plan) => resolveCopy(`healthPlan.completedPlansMap.${plan.id}`, plan.name);

  const getTaskStatusKey = (status) => {
    switch (status) {
      case '待开始': return 'home.healthTasks.states.toStart';
      case '进行中': return 'home.healthTasks.states.inProgress';
      case '待验证': return 'home.healthTasks.states.verifying';
      case '已完成': return 'home.healthTasks.states.completed';
      default: return status;
    }
  };

  const taskStateLegend = [
    t('home.healthTasks.states.toStart'),
    t('home.healthTasks.states.inProgress'),
    t('home.healthTasks.states.verifying'),
    t('home.healthTasks.states.completed'),
  ];

  // ==========================================
  // NEW USER / DISCOVERY SQUARE MODE
  // ==========================================
  if (isNewUser) {
    return (
      <div className="space-y-12">


        {/* Discovery Square - Challenges */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-black tracking-tight text-slate-950">{language === 'zh' ? '挑战广场' : 'Challenge Square'}</h3>
            <span className="text-xs font-bold text-primary">{language === 'zh' ? '进行深度评估后解锁 AI 推荐理由' : 'Unlock AI reason after deep assessment'}</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
            {recommendedPlans.map((plan) => (
              <article 
                key={plan.id} 
                onClick={() => navigate('/plan-detail/' + plan.id)}
                className="flex-shrink-0 w-[280px] rounded-[32px] bg-white p-6 shadow-lg border border-slate-100 cursor-pointer hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#151526] text-[9px] font-black uppercase tracking-widest text-tertiary px-2 py-1 rounded-full">{plan.reward}</span>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">add_circle</span>
                </div>
                <h4 className="text-xl font-black tracking-tight text-slate-950 mb-3">{planTitle(plan)}</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{planReason(plan)}</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-[10px] font-bold text-slate-400">{planSource(plan)}</span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{language === 'zh' ? '查看详情' : 'VIEW DETAILS'}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Institutional Research Plans */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-black tracking-tight text-slate-950">Expert & Institution</h3>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-amber-700">Verified</span>
          </div>
          <div className="grid gap-4">
            {institutionPlanCards.map((plan) => (
              <article 
                key={plan.id} 
                onClick={() => navigate('/plan-detail/' + plan.id)}
                className="group overflow-hidden rounded-[32px] bg-[#f8faf9] border border-slate-200/50 cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 mb-2 block">{planSource(plan)}</span>
                    <h4 className="text-xl font-black tracking-tight text-slate-950 mb-3">{planTitle(plan)}</h4>
                    <p className="text-xs text-slate-500 mb-4">{planSummary(plan)}</p>
                    <div className="flex gap-2">
                       <span className="bg-white/80 px-2 py-1 rounded-lg text-[9px] font-bold text-slate-400 border border-slate-100">{plan.reward}</span>
                       <span className="bg-white/80 px-2 py-1 rounded-lg text-[9px] font-bold text-slate-400 border border-slate-100">Official</span>
                    </div>
                  </div>
                  <div className="w-full md:w-[140px] h-[120px] md:h-auto overflow-hidden">
                    <img src={plan.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ==========================================
  // ORIGINAL HIGH-FIDELITY EXISTING USER MODE
  // ==========================================
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[2rem] font-black tracking-[-0.04em] text-slate-950">{t('healthPlan.executing')}</h3>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
            {t('healthPlan.activeNow')}
          </span>
        </div>

        <div className="grid gap-4">
          {executingPlans.map((plan, index) => (
            <article key={plan.id} className={`rounded-[32px] p-6 shadow-[0_16px_40px_-18px_rgba(0,80,46,0.15)] ${index === 0 ? 'bg-white' : 'bg-[#eef2ef]'}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-[48ch]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">{planSource(plan)}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">{planProgress(plan)}</span>
                  </div>
                  <h4 className="mt-4 text-[1.9rem] font-black tracking-[-0.04em] text-slate-950">{planTitle(plan)}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{planSummary(plan)}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[20px] bg-surface-container-low px-4 py-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">{t('healthPlan.todayTask')}</p>
                      <p className="mt-2 text-sm font-bold text-slate-800">{planAction(plan)}</p>
                    </div>
                    <div className="rounded-[20px] bg-surface-container-low px-4 py-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">{t('home.healthTasks.states.completed')}</p>
                      <p className="mt-2 text-sm font-bold text-slate-800">{plan.tasksCompleted}/{plan.tasksTotal}</p>
                    </div>
                    <div className="rounded-[20px] bg-surface-container-low px-4 py-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">{t('healthPlan.reward')}</p>
                      <p className="mt-2 text-sm font-bold text-slate-800">{plan.reward}</p>
                    </div>
                  </div>
                </div>

                <div className="min-w-[180px] rounded-[24px] bg-[#edf4ee] px-4 py-4 text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary/65">{t('healthPlan.planValue')}</p>
                  <p className="mt-2 text-xl font-black tracking-tight text-primary">{planValue(plan)}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-tertiary" style={{ width: `${plan.progressValue}%` }} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[34px] bg-[#0b1015] p-6 text-white shadow-[0_24px_64px_-18px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
          <h4 className="text-xl font-black tracking-tight">{t('healthPlan.recommended')}</h4>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {recommendedPlans.map((plan) => {
            const isJoined = activePlanIds.includes(plan.id);
            return (
              <article 
                key={plan.id} 
                onClick={() => setSelectedPlan(plan)}
                className="rounded-[26px] border border-white/10 bg-white/5 p-5 cursor-pointer hover:bg-white/10 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/78">{planSource(plan)}</span>
                    <span className="text-sm font-black text-tertiary">{plan.reward}</span>
                  </div>
                  <h4 className="mt-4 text-[1.55rem] font-black tracking-[-0.04em] text-white group-hover:text-tertiary transition-colors">{planTitle(plan)}</h4>
                  
                  {/* AI Recommendation Reason */}
                  <div className="mt-4 flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[11px] text-emerald-300 font-bold">
                    <span className="material-symbols-outlined text-[14px] shrink-0 mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                    <p className="leading-relaxed">
                      {language === 'zh' ? `AI 推荐依据：${planReason(plan)}` : `AI Insight: ${planReason(plan)}`}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[20px] border border-white/8 bg-white/6 p-4 text-xs text-white/82 flex items-center justify-between">
                  <span>{planAction(plan)}</span>
                  <span className="text-[10px] font-black text-tertiary uppercase tracking-widest flex items-center gap-1 shrink-0 ml-4">
                    {isJoined ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {language === 'zh' ? '正在执行' : 'EXECUTING'}
                      </>
                    ) : (
                      language === 'zh' ? '查看与开启' : 'VIEW & START'
                    )}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[2rem] font-black tracking-[-0.04em] text-slate-950">{t('healthPlan.institution')}</h3>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
            {t('healthPlan.researchLinked')}
          </span>
        </div>
        <div className="space-y-4">
          {institutionPlanCards.map((plan, index) => (
            <article key={plan.id} className={`overflow-hidden rounded-[32px] shadow-[0_16px_40px_-8px_rgba(0,80,46,0.08)] ${index === 0 ? 'bg-white' : 'bg-[#eef2ef]'}`}>
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="p-6 lg:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">{planSource(plan)}</span>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">{plan.reward}</span>
                  </div>
                  <h4 className="mt-4 text-[2rem] font-black tracking-[-0.04em] leading-[0.96] text-slate-950">{planTitle(plan)}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {planSummary(plan)}
                  </p>
                </div>
                <div className="relative min-h-[200px]">
                  <img alt={planTitle(plan)} className="h-full w-full object-cover" src={plan.image} />
                  <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${plan.tagColor}`}>{planMeta(plan, 'tag', plan.tag)}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/55">{t('healthPlan.taskStates')}</p>
            <h3 className="mt-2 text-[2rem] font-black tracking-[-0.04em] text-slate-950">{t('healthPlan.planQueue')}</h3>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
            {t('healthPlan.mixedStatus')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {taskStateLegend.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-4">
          {planTaskQueue.map((task) => (
            <article
              key={task.title}
              className={`relative overflow-hidden rounded-[30px] p-5 shadow-[0_18px_42px_-18px_rgba(0,80,46,0.18)] ${task.accent}`}
            >
              <div className="relative flex items-start justify-between gap-4">
                <div className="max-w-[46ch]">
                  <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${task.chip}`}>
                    {t(getTaskStatusKey(task.state))}
                  </span>
                  <h4 className="mt-4 text-[1.55rem] font-black tracking-[-0.04em] leading-[0.96]">
                    {taskCopy(task, 'title', task.title)}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-current/80">
                    {taskCopy(task, 'detail', task.detail)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-current/55">{t('home.healthTasks.reward')}</p>
                  <p className="mt-2 text-lg font-black tracking-tight">{task.reward}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[2rem] font-black tracking-[-0.04em] text-slate-950">{t('healthPlan.effectTracking')}</h3>
        <div className="grid gap-3">
          {effectTracking.map((item) => (
            <div key={item.labelKey} className={`flex items-center gap-4 rounded-[26px] p-5 shadow-[0_14px_30px_-20px_rgba(0,80,46,0.18)] ${item.panel}`}>
              <span className="material-symbols-outlined text-2xl text-primary">{item.icon}</span>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{resolveCopy(item.labelKey, item.label)}</p>
                <p className="mt-2 text-[1.7rem] font-black tracking-tight text-slate-950">
                  {item.value} <span className="text-base text-primary">{item.change}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[2rem] font-black tracking-[-0.04em] text-slate-950">{t('healthPlan.completed')}</h3>
        <div className="grid gap-3">
          {completedPlans.map((plan) => (
            <div key={plan.name} className="flex items-center justify-between rounded-[24px] bg-white px-5 py-4 shadow-[0_14px_30px_-20px_rgba(0,80,46,0.18)]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                <span className="text-sm font-bold text-slate-900">{completedPlanName(plan)}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{plan.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Plan Detail Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl overflow-hidden rounded-[38px] bg-white p-8 shadow-2xl z-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{planSource(selectedPlan)}</span>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{selectedPlan.reward}</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">{planTitle(selectedPlan)}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Main Content */}
              <div className="space-y-5 my-6">
                {/* Recommendation Reason (High-end styling) */}
                <div className="rounded-[24px] bg-[#fdfaf5] p-5 border border-amber-100/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs">auto_awesome</span>
                    {language === 'zh' ? '为什么向您推荐此计划' : 'WHY WE RECOMMEND THIS PROTOCOL'}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-700 font-bold">
                    {planReason(selectedPlan)}
                  </p>
                </div>

                {/* Plan Details & Subtasks */}
                <div className="rounded-[24px] bg-slate-50 p-5 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{language === 'zh' ? '包含打卡任务' : 'INCLUDED TASKS'}</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5">verified</span>
                      <div>
                        <p className="text-sm font-black text-slate-800 leading-none">{language === 'zh' ? '今日核心任务：' : 'Today Action: '}{planAction(selectedPlan)}</p>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{planSummary(selectedPlan)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status-dependent CTA Board */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  {isNewUser ? (
                    // SQUARE View Mode (Unassessed state - locked)
                    <div className="flex flex-col gap-4">
                      <div className="rounded-[20px] bg-red-500/10 border border-red-500/20 p-4 flex gap-3 text-red-700 text-xs">
                        <span className="material-symbols-outlined shrink-0 text-red-500">lock</span>
                        <p className="leading-relaxed font-bold">
                          {language === 'zh' 
                            ? '为了您的数据安全以及能够获得 AI 个性化长寿推荐，激活此日常健康计划需要先完成「深度健康评估」。' 
                            : 'To protect your privacy and unlock personalized AI recommendations, please complete your Deep Health Assessment first.'
                          }
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          disabled
                          className="flex-1 rounded-full bg-slate-200 py-4 text-xs font-black uppercase tracking-widest text-slate-400 cursor-not-allowed animate-pulse"
                        >
                          {language === 'zh' ? '已锁定 (请先做健康评估)' : 'LOCKED (ASSESSMENT REQUIRED)'}
                        </button>
                        
                        <button 
                          onClick={() => {
                            setSelectedPlan(null);
                            // 极速带到AI对话并注入初始意图
                            navigate('/ai-consultation', { state: { initialQuery: language === 'zh' ? '我想开启我的第一次 MIO 深度健康评估' : 'I want to start my deep health assessment' } });
                          }}
                          className="rounded-full vitality-gradient text-white px-6 py-4 text-xs font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                        >
                          {language === 'zh' ? '立即评估' : 'ASSESS NOW'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // PLANS View Mode (Assessed state - with 3/3 count restriction check)
                    <div>
                      {activePlanIds.includes(selectedPlan.id) ? (
                        <button 
                          onClick={() => {
                            setActivePlanIds(prev => prev.filter(id => id !== selectedPlan.id));
                            setSelectedPlan(null);
                            showToast(language === 'zh' ? '计划已暂停，相关任务已从首页卸载。' : 'Protocol paused. Daily tasks removed.');
                          }}
                          className="w-full rounded-full bg-rose-50 border border-rose-100 hover:bg-rose-100/50 text-rose-700 py-4 text-xs font-black uppercase tracking-widest active:scale-95 transition-transform cursor-pointer"
                        >
                          {language === 'zh' ? '暂停执行计划 (释放额度)' : 'PAUSE PROTOCOL (FREE SLOT)'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            // 检查个人计划数限制 (不占 Novartis, Bayer 等机构计划的额度)
                            // 机构计划 ID: tokyo-longevity-observation, institution-metabolic-reset, bayer-vascular-signal-study
                            const institutionIds = ['tokyo-longevity-observation', 'institution-metabolic-reset', 'bayer-vascular-signal-study'];
                            const isSelectedInstitution = institutionIds.includes(selectedPlan.id);
                            
                            if (!isSelectedInstitution) {
                              const currentPersonalActive = activePlanIds.filter(id => !institutionIds.includes(id));
                              if (currentPersonalActive.length >= 3) {
                                showToast(language === 'zh' ? '日常/挑战计划已达 3 个上限！请先暂停一个现有计划。' : 'Active plans limit reached (3/3). Pause an existing plan first.');
                                return;
                              }
                            }
                            
                            setActivePlanIds(prev => [...prev, selectedPlan.id]);
                            setSelectedPlan(null);
                            showToast(language === 'zh' ? '计划已成功激活！每日任务已在首页派生。' : 'Protocol activated! Daily tasks added to Home.');
                          }}
                          className="w-full rounded-full vitality-gradient text-white py-4 text-xs font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                        >
                          {language === 'zh' ? '激活并执行该计划' : 'ACTIVATE & START PROTOCOL'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Immersive Floating Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 right-6 z-[99999] mx-auto max-w-sm rounded-2xl bg-slate-900/90 text-white border border-white/10 px-5 py-4 shadow-2xl backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xs animate-spin" style={{ fontFamily: "'Material Symbols Outlined'" }}>sync</span>
            </div>
            <p className="text-xs font-black tracking-wide text-white/90">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
