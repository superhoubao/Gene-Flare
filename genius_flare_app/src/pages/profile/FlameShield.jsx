import { useLanguage } from '../../components/utils/LanguageContext';

export default function FlameShield() {
  const { t } = useLanguage();
  const upgradeActions = [
    t('shieldPage.upgradeActions.deposit'),
    t('shieldPage.upgradeActions.authorize'),
    t('shieldPage.upgradeActions.continuity'),
  ];
  const runwayPoints = [
    t('shieldPage.runwayPoints.quality'),
    t('shieldPage.runwayPoints.deposits'),
    t('shieldPage.runwayPoints.review'),
  ];
  const luxuryServices = [
    {
      tier: t('shieldPage.services.screening.tier'),
      title: t('shieldPage.services.screening.title'),
      payment: t('shieldPage.services.screening.payment'),
      detail: t('shieldPage.services.screening.detail'),
      unlocked: true,
    },
    {
      tier: t('shieldPage.services.cart.tier'),
      title: t('shieldPage.services.cart.title'),
      payment: t('shieldPage.services.cart.payment'),
      detail: t('shieldPage.services.cart.detail'),
      unlocked: false,
    },
    {
      tier: t('shieldPage.services.regenerative.tier'),
      title: t('shieldPage.services.regenerative.title'),
      payment: t('shieldPage.services.regenerative.payment'),
      detail: t('shieldPage.services.regenerative.detail'),
      unlocked: false,
    },
  ];
  const stats = [
    { label: t('shieldPage.currentTier'), value: 'Gold 3' },
    { label: t('shieldPage.mutualPool'), value: '192 GEF' },
    { label: t('shieldPage.benefitScore'), value: '72 / 100' },
    { label: t('shieldPage.unlocked'), value: t('shieldPage.perks') },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff] -mx-6 px-6 pt-2">
      <main className="space-y-6 pb-8">
        {/* The Metal Black Card Dashboard */}
        <section className="group relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#0a0a0a] via-[#1a1610] to-[#0a0a0a] p-7 text-white shadow-[0_24px_64px_-12px_rgba(217,119,6,0.15)] border border-[#3a2d1d] lg:p-8">
          {/* Holographic Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full duration-[2000ms] transition-transform ease-in-out" />
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-amber-500/15 blur-[60px]" />
          <div className="runway-grid absolute inset-0 opacity-10" />
          
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[430px]">
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-200/70">{t('shieldPage.title')}</p>
                <span className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#1a1610] shadow-[0_0_12px_rgba(251,191,36,0.5)]">{t('shieldPage.vip')}</span>
              </div>
              <h1 className="mt-4 text-[3.1rem] font-black tracking-[-0.05em] leading-[0.92] md:text-[4.2rem]">
                {t('shieldPage.heroTitle')}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-amber-50/70 font-medium">
                {t('shieldPage.heroDesc')}
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:translate-y-8">
              {stats.map((item, index) => (
                <div key={item.label} className={`signal-chip rounded-[24px] bg-white/5 border border-white/10 p-3 sm:p-4 backdrop-blur-xl ${index % 2 === 0 ? 'lg:-translate-y-4' : ''}`}>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-amber-100/50">{item.label}</p>
                  <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black tracking-tight text-amber-50">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[34px] border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-[1.5rem] font-black tracking-tight text-slate-900">{t('shieldPage.tierPathway')}</h2>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 border border-amber-200/50">{t('shieldPage.diamondProgress')}</span>
            </div>
            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100 shadow-inner relative">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 w-[72%] shadow-[0_0_12px_rgba(251,191,36,0.8)]">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {upgradeActions.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[22px] bg-slate-50 border border-slate-100 p-4">
                  <span className="material-symbols-outlined text-amber-500 text-[20px]">task_alt</span>
                  <p className="text-sm leading-relaxed text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-[#2a241b] bg-[#0c0a08] p-6 text-amber-100 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-amber-600/10 blur-3xl"></div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-500/60 font-mono">{t('shieldPage.privilegeRunway')}</p>
            <h2 className="mt-3 text-[1.6rem] font-black tracking-[-0.03em] text-white leading-[1.1]">{t('shieldPage.runwayTitle')}</h2>
            <div className="mt-6 grid gap-3">
              {runwayPoints.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[22px] border border-amber-500/10 bg-amber-500/5 p-4 text-sm text-amber-50/80 transition-colors hover:bg-amber-500/10">
                  <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Luxury Services Catalog */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between px-2">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-700/60">{t('shieldPage.privilegeServices')}</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">{t('shieldPage.eliteDirectory')}</h2>
            </div>
          </div>
          
          <div className="grid gap-4">
            {luxuryServices.map((item) => (
              <article key={item.title} className="group relative overflow-hidden rounded-[34px] bg-slate-950 p-1 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)]">
                {/* Background image overlay effect */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-br from-slate-800 to-black"></div>
                
                <div className="relative flex flex-col md:flex-row gap-2 bg-[#0f1115] rounded-[32px] overflow-hidden">
                  {/* Left content */}
                  <div className={`flex-1 p-6 lg:p-8 ${!item.unlocked && 'opacity-60 grayscale'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] border ${item.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                        {item.tier} {t('shieldPage.required')}
                      </span>
                      {!item.unlocked && (
                        <span className="material-symbols-outlined text-[16px] text-slate-500">lock</span>
                      )}
                    </div>
                    <h3 className="mt-5 text-[2.2rem] font-black tracking-[-0.04em] leading-[1.05] text-white">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-[90%]">{item.detail}</p>
                  </div>
                  
                  {/* Right CTA Area */}
                  <div className={`relative flex min-w-[260px] flex-col justify-center border-l border-white/5 bg-[#161a20] p-6 lg:p-8 ${!item.unlocked && 'opacity-80'}`}>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-500/60">{t('shieldPage.paymentMethod')}</p>
                    <p className="mt-2 text-[15px] font-bold text-slate-200 leading-snug">{item.payment}</p>
                    
                    <button 
                      disabled={!item.unlocked}
                      className={`mt-8 w-full rounded-full px-6 py-3.5 text-sm font-black uppercase tracking-[0.16em] transition-all
                        ${item.unlocked 
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 shadow-[0_8px_20px_rgba(251,191,36,0.25)] hover:scale-[1.02] active:scale-95' 
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                    >
                      {item.unlocked ? t('shieldPage.reserveAccess') : t('shieldPage.locked')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
