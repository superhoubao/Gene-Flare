import { useLanguage } from '../../components/utils/LanguageContext';

export default function ShieldServices() {
  const { t } = useLanguage();
  const services = [
    {
      id: 'jp-checkup',
      title: t('shieldServices.services.jpCheckup.title'),
      category: t('shieldServices.services.jpCheckup.category'),
      payment: t('shieldServices.services.jpCheckup.payment'),
      detail: t('shieldServices.services.jpCheckup.detail'),
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      tags: [
        t('shieldServices.services.jpCheckup.tags.petct'),
        t('shieldServices.services.jpCheckup.tags.biomarkers'),
        t('shieldServices.services.jpCheckup.tags.vipRouting'),
      ],
    },
    {
      id: 'longevity',
      title: t('shieldServices.services.longevity.title'),
      category: t('shieldServices.services.longevity.category'),
      payment: t('shieldServices.services.longevity.payment'),
      detail: t('shieldServices.services.longevity.detail'),
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80',
      tags: [
        t('shieldServices.services.longevity.tags.antiAging'),
        t('shieldServices.services.longevity.tags.stemCell'),
        t('shieldServices.services.longevity.tags.coaching'),
      ],
    },
    {
      id: 'referral',
      title: t('shieldServices.services.referral.title'),
      category: t('shieldServices.services.referral.category'),
      payment: t('shieldServices.services.referral.payment'),
      detail: t('shieldServices.services.referral.detail'),
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      tags: [
        t('shieldServices.services.referral.tags.oncology'),
        t('shieldServices.services.referral.tags.secondOpinion'),
        t('shieldServices.services.referral.tags.fastTrack'),
      ],
    },
  ];

  return (
    <div className="space-y-6 -mx-6 px-6 pt-2 pb-8 bg-[#f8faff] min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#1a1610] to-black p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-amber-500/20 blur-[60px]" />
        
        <div className="relative z-10">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-500/80">{t('shieldServices.premium')}</p>
          <h1 className="mt-3 whitespace-pre-line text-[2.5rem] font-black tracking-[-0.04em] leading-tight md:text-[3rem]">
            {t('shieldServices.title')}
          </h1>
          <p className="mt-4 text-sm font-medium text-slate-400 max-w-[85%] leading-relaxed">
            {t('shieldServices.desc')}
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="grid gap-6">
        {services.map((service) => (
          <article 
            key={service.id} 
            className="group relative overflow-hidden rounded-[34px] bg-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Image Section */}
            <div className="relative h-[200px] w-full overflow-hidden bg-slate-900">
              <img 
                src={service.image} 
                alt={service.title} 
                className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <span className="rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#1a1610]">
                  {service.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-[1.4rem] font-black tracking-tight text-slate-900 leading-snug">
                {service.title}
              </h2>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="rounded-xl bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-slate-500 font-medium">
                {service.detail}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">{t('shieldServices.payment')}</p>
                  <p className="mt-1 text-[12px] font-bold text-amber-600">{service.payment}</p>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-transform active:scale-90 group-hover:bg-amber-500">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
