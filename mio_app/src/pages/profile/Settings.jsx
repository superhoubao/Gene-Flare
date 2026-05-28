import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../../components/layout/TopAppBar';
import { useLanguage } from '../../components/utils/LanguageContext';
import Modal from '../../components/common/Modal';
import { useDemoState } from '../../components/utils/DemoStateContext';

export default function Settings() {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

  const { state: demoState, updateState: updateDemoState } = useDemoState();

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

        {/* 开发者演示 Preference 分区 ———— 为编程小白特别设计 */}
        <div className="border-t border-outline-variant/20 pt-6 mt-4">
          <h3 className="text-xs font-black text-rose-500 uppercase tracking-wider mb-3 px-1">
            {lang === 'zh' ? '开发者演示工具 (DEV PREFERENCES)' : 'DEVELOPER TOOLS'}
          </h3>
          <div className="bg-rose-500/5 rounded-[24px] p-5 border border-rose-500/10 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-extrabold text-white">
                  {lang === 'zh' ? '开启状态切换悬浮调试球' : 'Show MIO Debug Controller'}
                </span>
                <span className="text-[10px] text-slate-400 leading-normal mt-1 break-words">
                  {lang === 'zh' 
                    ? '激活后，屏幕右上角会常驻 ⚡ 调试球，用于快速对比新手态与主权激活态。' 
                    : 'Show the Fixed ⚡ terminal button in top right corner for easy state demonstration.'
                  }
                </span>
              </div>
              <button
                onClick={() => updateDemoState({ showDebugBall: !demoState.showDebugBall })}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  demoState.showDebugBall ? 'bg-rose-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    demoState.showDebugBall ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <button 
              onClick={() => {
                updateDemoState({
                  isGenesisCompleted: false,
                  hasActivePlans: false,
                  isDidVerified: false,
                  showDebugBall: true,
                });
                localStorage.removeItem('genesisCompleted');
                localStorage.removeItem('genesisStep');
                localStorage.removeItem('genesisSpark');
                localStorage.removeItem('genesisSkipped');
                localStorage.removeItem('did_verified');
                alert('MIO System States & Journey reset successfully!');
                window.location.href = '/genesis';
              }}
              className="w-full py-2.5 text-center text-amber-500 font-extrabold text-xs rounded-xl border border-amber-500/20 hover:bg-amber-500/5 active:scale-95 transition-all"
            >
              Reset All States (Debug Journey)
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full py-3 text-center text-error font-semibold text-sm rounded-xl border border-error/20 hover:bg-error/5 active:scale-95 transition-all"
        >
          {t('settings.logout')}
        </button>

        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={() => {
            setIsLogoutModalOpen(false);
            
            // 清除与登录、创世和引导流程有关的所有本地状态缓存，以便重新体验
            localStorage.removeItem('did_verified');
            localStorage.removeItem('hasSeenOnboarding');
            localStorage.removeItem('tutorialCompleted');
            localStorage.removeItem('genesisCompleted');
            localStorage.removeItem('genesisStep');
            localStorage.removeItem('genesisSpark');
            localStorage.removeItem('genesisSkipped');
            
            // 直接跳转到 App 引导流程页
            navigate('/onboarding');
          }}
          type="danger"
          title={t('settings.logout')}
          message="Are you sure you want to sign out? You will need to log in again to access your genomic data."
          confirmText="Sign Out"
          cancelText="Stay Logged In"
        />
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
