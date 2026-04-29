import { useState } from 'react';
import TopAppBar from '../../components/layout/TopAppBar';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function PrivacyControl() {
  const { t } = useLanguage();
  const [permissions, setPermissions] = useState({
    wearable_ai: true, wearable_anon: true, wearable_trade: false,
    exam_ai: true, exam_anon: false, exam_trade: false,
    questionnaire_ai: true, questionnaire_anon: true, questionnaire_trade: true,
    genetic_ai: false, genetic_anon: false, genetic_trade: false,
  });

  const toggle = (key) => setPermissions(prev => ({ ...prev, [key]: !prev[key] }));

  const dataTypes = [
    { key: 'wearable', label: t('profilePrivacy.wearableData'), icon: 'watch', desc: t('profilePrivacy.wearableDesc') },
    { key: 'exam', label: t('profilePrivacy.physicalExam'), icon: 'lab_panel', desc: t('profilePrivacy.physicalExamDesc') },
    { key: 'questionnaire', label: t('profilePrivacy.questionnaireData'), icon: 'assignment', desc: t('profilePrivacy.questionnaireDesc') },
    { key: 'genetic', label: t('profilePrivacy.geneticData'), icon: 'genetics', desc: t('profilePrivacy.geneticDesc') },
  ];

  const permTypes = [
    { suffix: '_ai', label: t('profilePrivacy.aiAnalysis') },
    { suffix: '_anon', label: t('profilePrivacy.anonymousAggregate') },
    { suffix: '_trade', label: t('profilePrivacy.tradeable') },
  ];

  return (
    <>
      <TopAppBar title={t('profilePrivacy.title')} showBack />
      <main className="px-6 pt-4 pb-32 space-y-8">
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {t('profilePrivacy.desc')}
        </p>

        {/* Per Data-Type Controls */}
        {dataTypes.map((dt) => (
          <section key={dt.key} className="bg-surface-container-lowest rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">{dt.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-on-surface">{dt.label}</h4>
                <p className="text-[10px] text-on-surface-variant">{dt.desc}</p>
              </div>
            </div>
            <div className="space-y-3">
              {permTypes.map((pt) => {
                const key = dt.key + pt.suffix;
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-on-surface">{pt.label}</span>
                    <button
                      onClick={() => toggle(key)}
                      className={`w-10 h-6 rounded-full relative transition-colors ${permissions[key] ? 'bg-primary' : 'bg-slate-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${permissions[key] ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Global Actions */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-tertiary">{t('profilePrivacy.globalMgmt')}</h3>
          {[
            { label: t('profilePrivacy.disableTrading'), icon: 'block', color: 'text-tertiary' },
            { label: t('profilePrivacy.disableAggregation'), icon: 'visibility_off', color: 'text-tertiary' },
            { label: t('profilePrivacy.exportAll'), icon: 'download', color: 'text-primary' },
            { label: t('profilePrivacy.deleteAccount'), icon: 'delete_forever', color: 'text-tertiary' },
          ].map((a, i) => (
            <button key={i} className={`w-full flex items-center gap-3 p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-low transition-colors text-left ${a.color}`}>
              <span className="material-symbols-outlined">{a.icon}</span>
              <span className="text-sm font-medium">{a.label}</span>
            </button>
          ))}
        </section>
      </main>
    </>
  );
}
