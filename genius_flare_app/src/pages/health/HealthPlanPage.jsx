import TopAppBar from '../../components/layout/TopAppBar';
import HealthPlan from './HealthPlan';
import avatarBoy from '../../assets/avatar_boy_v2.png';
import { executingPlans, institutionPlans, recommendedPlans } from '../../data/plans';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function HealthPlanPage() {
  const { t } = useLanguage();
  const summary = [
    { label: t('healthPlan.dashboard.executingPlans'), value: String(executingPlans.length) },
    { label: t('healthPlan.dashboard.todayTasks'), value: '4' },
    { label: t('healthPlan.dashboard.recommendedPlans'), value: String(recommendedPlans.length) },
    { label: t('healthPlan.dashboard.institutionPlans'), value: String(institutionPlans.length) },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopAppBar showBack title={t('healthPlan.dashboard.pageTitle')} rightIcon={null} avatarSrc={avatarBoy} />
      <main className="px-6 pb-14 pt-6">
        <section className="editorial-frame overflow-hidden rounded-[38px] bg-gradient-to-br from-[#f4f2eb] via-white to-[#eef4f0] p-7 shadow-[0_18px_44px_-20px_rgba(0,80,46,0.15)]">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[520px]">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary/55">{t('healthPlan.dashboard.tag')}</p>
              <h1 className="mt-4 text-[3rem] font-black tracking-[-0.05em] leading-[0.92] text-slate-950 md:text-[4rem]">
                {t('healthPlan.dashboard.title')}
              </h1>
              <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-slate-600">
                {t('healthPlan.dashboard.desc')}
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-4 lg:w-auto lg:min-w-[320px] lg:translate-y-6">
              {summary.map((item, index) => (
                <div key={item.label} className={`flex flex-col justify-between rounded-[28px] bg-white/90 p-5 shadow-[0_16px_40px_-16px_rgba(0,80,46,0.12)] backdrop-blur-md border border-white/60 hover:-translate-y-1 transition-transform ${index % 2 === 0 ? 'lg:-translate-y-4' : 'lg:translate-y-4'}`}>
                  <p className="text-[12px] font-black uppercase tracking-[0.12em] text-slate-500 leading-tight">{item.label}</p>
                  <p className="mt-4 text-[2.5rem] font-black leading-none tracking-tight text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-8">
          <HealthPlan />
        </div>
      </main>
    </div>
  );
}
