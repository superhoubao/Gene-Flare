import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopAppBar from '../../components/layout/TopAppBar';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function Settings() {
  const { t, lang, setLang } = useLanguage();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const sections = [
    {
      title: t('settings.account'),
      items: [
        { icon: 'badge', label: t('settings.identityBinding'), value: t('settings.verified') },
        { icon: 'lock', label: t('settings.passwordPin'), value: '' },
        { icon: 'fingerprint', label: t('settings.biometricLogin'), value: t('settings.faceId') },
        { icon: 'account_balance_wallet', label: t('settings.walletSecurity'), value: '' },
      ],
    },
    {
      title: t('settings.notifications'),
      items: [
        { icon: 'notifications', label: t('settings.healthReminders'), toggle: true, on: true },
        { icon: 'campaign', label: t('settings.socialUpdates'), toggle: true, on: true },
        { icon: 'local_offer', label: t('settings.promotions'), toggle: true, on: false },
      ],
    },
    {
      title: t('settings.preferences'),
      items: [
        { icon: 'language', label: t('settings.language'), value: t('settings.langName'), id: 'language-select' },
        { icon: 'dark_mode', label: t('settings.darkMode'), toggle: true, on: false },
        { icon: 'text_fields', label: t('settings.fontSize'), value: t('settings.medium') },
      ],
    },
    {
      title: t('settings.storageData'),
      items: [
        { icon: 'cached', label: t('settings.clearCache'), value: '124 MB' },
        { icon: 'system_update', label: t('settings.appVersion'), value: 'v1.2.0' },
      ],
    },
    {
      title: t('settings.legal'),
      items: [
        { icon: 'description', label: t('settings.termsOfService') },
        { icon: 'privacy_tip', label: t('settings.privacyPolicy') },
        { icon: 'gavel', label: t('settings.licenses') },
      ],
    },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文 (简体)' },
  ];

  return (
    <>
      <TopAppBar title={t('settings.title')} showBack rightIcon={null} />
      <main className="px-6 pt-4 pb-32 space-y-8">
        {sections.map((section, si) => (
          <div key={si}>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3 px-1">{section.title}</h3>
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm border border-outline-variant/10">
              <div className="divide-y divide-surface-container-low">
                {section.items.map((item, ii) => (
                  <div 
                    key={ii} 
                    onClick={() => {
                      if (item.id === 'language-select') setIsLangModalOpen(true);
                    }}
                    className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-on-surface-variant text-xl">{item.icon}</span>
                      <span className="text-sm font-medium text-on-surface">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-on-surface-variant">{item.value}</span>
                      {item.toggle !== undefined ? (
                        <div className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${item.on ? 'bg-primary' : 'bg-slate-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${item.on ? 'translate-x-5' : 'translate-x-1'}`} />
                        </div>
                      ) : (
                        <span className="material-symbols-outlined text-outline-variant text-lg">chevron_right</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button className="w-full py-3 text-center text-error font-semibold text-sm rounded-xl border border-error/20 hover:bg-error/5 transition-colors">
          {t('settings.logout')}
        </button>
      </main>

      {/* Language Selection Sheet */}
      <AnimatePresence>
        {isLangModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLangModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 w-full bg-surface rounded-t-[32px] p-8 z-[101] tonal-elevation-2"
            >
              <div className="w-12 h-1 bg-outline-variant/50 rounded-full mx-auto mb-8" />
              <h2 className="text-xl font-headline font-black text-secondary mb-6">{t('settings.language')}</h2>
              
              <div className="space-y-4">
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${
                      lang === l.code 
                        ? 'bg-primary/10 border-2 border-primary' 
                        : 'bg-surface-container-low border-2 border-transparent'
                    }`}
                  >
                    <span className={`font-bold ${lang === l.code ? 'text-primary' : 'text-on-surface'}`}>
                      {l.name}
                    </span>
                    {lang === l.code && (
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
