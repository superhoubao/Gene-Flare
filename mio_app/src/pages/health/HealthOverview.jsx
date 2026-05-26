import avatarBoy from '../../assets/avatar_boy_v2.png';
import digitalTwinAsset from '../../assets/digital_twin_v3.png';
import cloud_a622122e66 from '../../assets/cloud/cloud_a622122e66.png';
import { useLanguage } from '../../components/utils/LanguageContext';

const AVATAR_3D = avatarBoy;

export default function HealthOverview() {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      {/* Digital Twin */}
      <section>
        <div className="bg-surface-container-lowest rounded-xl p-4 relative overflow-hidden flex flex-col items-center border border-slate-200 shadow-sm">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">{t('health.twinTitle')}</p>
          <div className="relative w-full aspect-[3/4] max-w-[320px] rounded-xl overflow-hidden bg-slate-50 shadow-inner">
            <img alt="Digital Twin" className="w-full h-full object-cover" src={digitalTwinAsset} />
            <div className="scan-line" />
            <div className="absolute bottom-4 right-4 text-right">
              <p className="text-xs font-black text-slate-400 leading-none">99.7%</p>
              <p className="text-[8px] font-bold text-slate-300 uppercase tracking-wider">{t('health.integrity')}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-200">{t('health.status.normal')} 3</span>
            <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-yellow-200">{t('health.status.attention')} 2</span>
            <span className="px-4 py-1.5 bg-red-100 text-red-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-200">{t('health.status.risk')} 0</span>
          </div>
        </div>
      </section>

      {/* Core Metrics */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">📊 {t('health.coreMetrics')}</h2>
          <a className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors" href="#">{t('health.manageMetrics')} &gt;</a>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-6 px-6 pb-2">
          {[
            { label: t('home.heartRate'), value: '72', unit: 'bpm', status: t('health.status.normal'), color: 'border-emerald-500', statusColor: 'text-emerald-700', arrow: 'arrow_downward', arrowColor: 'text-emerald-600' },
            { label: t('health.bp'), value: '120/80', unit: '', status: t('health.status.normal'), color: 'border-emerald-500', statusColor: 'text-emerald-700', arrow: 'horizontal_rule', arrowColor: 'text-slate-400' },
            { label: t('health.sugar'), value: '5.6', unit: 'mmol/L', status: t('health.status.attention'), color: 'border-amber-500', statusColor: 'text-amber-700', arrow: 'arrow_upward', arrowColor: 'text-amber-600' },
            { label: 'BMI', value: '23.1', unit: '', status: t('health.status.normal'), color: 'border-emerald-500', statusColor: 'text-emerald-700', arrow: 'arrow_downward', arrowColor: 'text-emerald-600' },
          ].map((m, i) => (
            <div key={i} className={`flex-shrink-0 w-[110px] bg-white rounded-xl p-3.5 space-y-1.5 border ${m.color} shadow-sm`}>
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-wider">{m.label}</p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-black text-slate-900 tracking-tighter">{m.value}</span>
                {m.unit && <span className="text-[9px] font-bold text-on-surface-variant/60">{m.unit}</span>}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-black ${m.statusColor} uppercase tracking-tighter`}>{m.status}</span>
                <span className={`material-symbols-outlined text-xs ${m.arrowColor}`}>{m.arrow}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Radar Chart */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">🧬 {t('health.organScores')}</h2>
          <a className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors" href="#">{t('health.detailedAnalysis')} &gt;</a>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center border border-slate-200">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <polygon className="radar-grid stroke-primary/30 fill-primary/5" points="100,10 178,55 178,145 100,190 22,145 22,55" />
              <polygon className="radar-grid stroke-amber-400/30 fill-amber-50/20" points="100,40 152,70 152,130 100,160 48,130 48,70" />
              <polygon className="radar-grid stroke-red-400/40 fill-red-50/30" points="100,70 126,85 126,115 100,130 74,115 74,85" />
              <line className="radar-grid stroke-slate-200" x1="100" x2="100" y1="10" y2="190" />
              <line className="radar-grid stroke-slate-200" x1="178" x2="22" y1="55" y2="145" />
              <line className="radar-grid stroke-slate-200" x1="178" x2="22" y1="145" y2="55" />
              <defs>
                <linearGradient id="radarGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#00502e',stopOpacity:0.6}} />
                  <stop offset="100%" style={{stopColor:'#046d40',stopOpacity:0.3}} />
                </linearGradient>
              </defs>
              <polygon className="fill-[url(#radarGradient)] stroke-primary stroke-[2.5]" points="100,20 170,58 165,140 100,175 45,145 35,55" />
              <circle className="fill-emerald-600" cx="100" cy="20" r="4" />
              <circle className="fill-emerald-600" cx="170" cy="58" r="4" />
              <circle className="fill-emerald-600" cx="165" cy="140" r="4" />
              <circle className="fill-amber-600" cx="100" cy="175" r="4" />
              <circle className="fill-emerald-600" cx="45" cy="145" r="4" />
              <circle className="fill-emerald-600" cx="35" cy="55" r="4" />
            </svg>
            <div className="absolute -top-4 text-[9px] font-bold text-slate-800 bg-white shadow-sm border border-slate-200 px-2 py-0.5 rounded-full">{t('health.radarLabel.cardio')} (92)</div>
            <div className="absolute top-1/4 -right-14 text-[9px] font-bold text-slate-800 bg-white shadow-sm border border-slate-200 px-2 py-0.5 rounded-full">{t('health.radarLabel.resp')} (85)</div>
            <div className="absolute bottom-1/4 -right-14 text-[9px] font-bold text-slate-800 bg-white shadow-sm border border-slate-200 px-2 py-0.5 rounded-full">{t('health.radarLabel.dig')} (78)</div>
            <div className="absolute -bottom-4 text-[9px] font-bold text-amber-700 bg-white shadow-sm border border-amber-100 px-2 py-0.5 rounded-full">{t('health.radarLabel.meta')} (72)</div>
            <div className="absolute bottom-1/4 -left-14 text-[9px] font-bold text-slate-800 bg-white shadow-sm border border-slate-200 px-2 py-0.5 rounded-full">{t('health.radarLabel.musc')} (80)</div>
            <div className="absolute top-1/4 -left-14 text-[9px] font-bold text-slate-800 bg-white shadow-sm border border-slate-200 px-2 py-0.5 rounded-full">{t('health.radarLabel.imm')} (88)</div>
          </div>
          <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary"><span className="w-3 h-3 bg-primary/10 border border-primary/20 rounded-sm" /> {t('health.radarLegend.optimal')}</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700"><span className="w-3 h-3 bg-amber-50 border border-amber-100 rounded-sm" /> {t('health.radarLegend.attention')}</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-700"><span className="w-3 h-3 bg-red-50 border border-red-100 rounded-sm" /> {t('health.radarLegend.risk')}</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900"><span className="w-3 h-3 bg-slate-200 border border-slate-300 rounded-sm" /> {t('health.radarLegend.current')}</div>
          </div>
        </div>
      </section>

      {/* Bio-Age Card */}
      <section>
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-primary to-primary-container rounded-xl p-6 text-white shadow-xl">
          <div className="relative z-10 flex items-center gap-5">
            <div className="flex-shrink-0 w-28 h-28 relative">
              <img alt="3D Avatar" className="w-full h-full object-cover rounded-[20px] relative z-10 shadow-lg border border-white/20" src={AVATAR_3D} />
            </div>
            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white/80 text-sm" style={{fontVariationSettings: '"FILL" 1'}}>bolt</span>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-90">{t('health.bioAge.peak')}</p>
                </div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  {t('health.bioAge.age')}: 35 <span className="text-white/60 opacity-60">→</span>
                  <span className="bg-white/10 px-3 py-1 rounded-xl border border-white/20 text-white text-2xl font-black">28</span>
                </h3>
                <p className="text-xs font-black text-white/70 uppercase tracking-widest">{t('health.bioAge.ageLabel')}</p>
              </div>
              <p className="text-[0.85rem] font-bold leading-tight text-white/95">
                {t('health.bioAge.desc')}
              </p>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
        </div>
      </section>

      {/* AI Health Alerts */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">⚠️ {t('health.alerts')} (2)</h2>
          <a className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors" href="#">{t('health.viewAll')} &gt;</a>
        </div>
        <div className="space-y-3">
          <div className="bg-surface-container-low rounded-xl p-5 flex gap-4 items-start border-l-4 border-yellow-400 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0 animate-pulse" />
            <div>
              <p className="text-[0.95rem] font-black text-slate-900 mb-1 leading-tight">{t('health.alertMetabolic')}</p>
              <p className="text-[0.85rem] text-slate-600/80 leading-snug">{t('health.alertMetabolicDesc')}</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-5 flex gap-4 items-start border-l-4 border-yellow-400 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-[0.95rem] font-black text-slate-900 mb-1 leading-tight">{t('health.alertSleep')}</p>
              <p className="text-[0.85rem] text-slate-600/80 leading-snug">{t('health.alertSleepDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
