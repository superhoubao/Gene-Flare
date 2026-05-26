import {
  completedPlans,
  executingPlans,
  institutionPlanCards,
  planTaskQueue,
  recommendedPlans,
} from '../../data/plans';
import { useLanguage } from '../../components/utils/LanguageContext';
import { motion } from 'framer-motion';

const effectTracking = [
  { icon: 'favorite', labelKey: 'health.restingHR', label: 'Resting HR', value: '62 BPM', change: '↓ 4%', panel: 'bg-[#fff4f2]' },
  { icon: 'directions_run', labelKey: 'health.dailySteps', label: 'Daily Steps', value: '8,420', change: '↑ 12%', panel: 'bg-[#eef7ef]' },
  { icon: 'dark_mode', labelKey: 'health.deepSleep', label: 'Deep Sleep', value: '1h 45m', change: '--', panel: 'bg-[#f2f3fb]' },
];

export default function HealthPlan({ isNewUser = false }) {
  const { t } = useLanguage();
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
        {/* AI Personalized Recommendation */}
        <section className="relative overflow-hidden rounded-[40px] bg-[#0b1015] p-8 text-white shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-tertiary animate-pulse">auto_awesome</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-tertiary/80">AI Intelligent Recommendation</span>
            </div>
            <h3 className="text-[2.5rem] font-black tracking-tight leading-tight mb-4">Personalized AI Health Engine</h3>
            <p className="text-white/60 text-base max-w-[40ch] mb-8 leading-relaxed">
              Our AI creates a unique plan based on your DNA, lifestyle, and health data. Requires a one-time assessment.
            </p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-tertiary rounded-2xl text-[#0a0a14] font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(83,205,205,0.3)]"
            >
              Start Deep Assessment
            </motion.button>
          </div>
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-tertiary/30 animate-ping" style={{ animationDuration: '4s' }} />
          </div>
        </section>

        {/* Discovery Square - Challenges */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-2xl font-black tracking-tight text-slate-950">Challenge Square</h3>
            <span className="text-xs font-bold text-primary">View All</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
            {recommendedPlans.map((plan) => (
              <article key={plan.id} className="flex-shrink-0 w-[280px] rounded-[32px] bg-white p-6 shadow-lg border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#151526] text-[9px] font-black uppercase tracking-widest text-tertiary px-2 py-1 rounded-full">{plan.reward}</span>
                  <span className="material-symbols-outlined text-slate-300">add_circle</span>
                </div>
                <h4 className="text-xl font-black tracking-tight text-slate-950 mb-3">{planTitle(plan)}</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{planReason(plan)}</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-[10px] font-bold text-slate-400">{planSource(plan)}</span>
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest">Join</button>
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
              <article key={plan.id} className="group overflow-hidden rounded-[32px] bg-[#f8faf9] border border-slate-200/50">
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
          {recommendedPlans.map((plan) => (
            <article key={plan.id} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/78">{planSource(plan)}</span>
                <span className="text-sm font-black text-tertiary">{plan.reward}</span>
              </div>
              <h4 className="mt-4 text-[1.55rem] font-black tracking-[-0.04em]">{planTitle(plan)}</h4>
              <p className="mt-3 text-sm leading-relaxed text-white/74">{planReason(plan)}</p>
              <div className="mt-5 rounded-[20px] border border-white/8 bg-white/6 p-4 text-sm text-white/82">
                {planAction(plan)}
              </div>
            </article>
          ))}
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
    </div>
  );
}
