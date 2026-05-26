import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopAppBar from '../../components/layout/TopAppBar';
import { useLanguage } from '../../components/utils/LanguageContext';
import { PageTransition } from '../../components/animations/PageTransition';

export default function CollectionPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 每次进入金库页面时强制回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const collectedAssets = [
    {
      id: 'R-NFT #0821',
      type: t('collectionPage.assets.metabolic'),
      tier: 'S',
      yield: '12.45 GEF',
      integrity: '99.98%',
      status: t('collectionPage.active'),
      color: 'from-emerald-400 to-cyan-500'
    },
    {
      id: 'R-NFT #0712',
      type: t('collectionPage.assets.cardio'),
      tier: 'A',
      yield: '8.12 GEF',
      integrity: '98.50%',
      status: t('collectionPage.active'),
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'R-NFT #0605',
      type: t('collectionPage.assets.neuro'),
      tier: 'S',
      yield: '15.20 GEF',
      integrity: '99.10%',
      status: t('collectionPage.active'),
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#020604] text-white">
        <TopAppBar 
          transparent={true}
          showBack={true}
          onBack={() => navigate('/research')}
          title={t('collectionPage.title')} 
          rightIcon={null}
        />

        <main className="px-6 pb-32 pt-[84px] space-y-10">
          {/* Vault Header */}
          <section className="text-center space-y-2">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400"
            >
              {t('collectionPage.tag')}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black tracking-tighter italic"
            >
              {t('collectionPage.heading')}
            </motion.h1>
          </section>

          {/* Stats Bar */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[32px] bg-gradient-to-br from-emerald-900/40 to-emerald-950/20 border border-emerald-400/20 p-8"
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60">{t('collectionPage.vaultNetWorth')}</p>
                <p className="text-2xl font-black italic tracking-tighter text-white">35.77 GEF</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60">{t('collectionPage.annualApr')}</p>
                <p className="text-2xl font-black italic tracking-tighter text-emerald-400">+18.5%</p>
              </div>
            </div>
          </motion.section>

          {/* Asset Grid */}
          <section className="grid gap-6">
            {collectedAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileTap={{ scale: 0.98 }}
                className="relative group cursor-pointer"
              >
                {/* Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${asset.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex items-center gap-6">
                  {/* NFT Mini Preview */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${asset.color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full rounded-[14px] bg-[#020604] flex flex-col items-center justify-center relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${asset.color} opacity-20`} />
                      <span className="material-symbols-outlined text-3xl text-white/80 relative z-10">fingerprint</span>
                      <p className="text-[8px] font-black text-white/50 mt-1 relative z-10">{t('collectionPage.tier')} {asset.tier}</p>
                    </div>
                  </div>

                  {/* Asset Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-black tracking-tight">{asset.type}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        {asset.status}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-white/40">{asset.id}</p>
                    
                    <div className="pt-3 flex items-end justify-between">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{t('collectionPage.totalYield')}</p>
                        <p className="text-xl font-black text-emerald-100 tracking-tighter">{asset.yield}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{t('collectionPage.integrity')}</p>
                        <p className="text-sm font-bold text-white/80">{asset.integrity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        </main>

        {/* Global CSS for perspective if needed */}
        <style dangerouslySetInnerHTML={{ __html: `
          .vitality-gradient {
            background: linear-gradient(135deg, #29b5b5 0%, #059669 100%);
          }
        `}} />
      </div>
    </PageTransition>
  );
}
