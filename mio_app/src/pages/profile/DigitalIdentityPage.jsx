import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../components/utils/LanguageContext';
import { useState, useEffect } from 'react';
import TopAppBar from '../../components/layout/TopAppBar';

export default function DigitalIdentityPage() {
  const { lang: language } = useLanguage();
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(localStorage.getItem('did_verified') === 'true');
  const [isVerifying, setIsVerifying] = useState(false);

  // Sync state to localStorage to affect Research page
  useEffect(() => {
    localStorage.setItem('did_verified', isVerified);
  }, [isVerified]);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 3000);
  };

  // Mock DID Data (Dynamic based on state)
  const didInfo = {
    id: isVerified ? "did:flare:z8u3v2x9w1m0k7n5p4" : "did:flare:pending...",
    status: isVerified ? "Verified" : "Unverified",
    creditScore: isVerified ? 842 : "--",
    level: isVerified ? "Platinum Contributor" : "New Explorer",
    joinedDate: isVerified ? "2024-01-12" : "2024-04-27",
    linkedBiometrics: isVerified ? [
      { type: "Heart Rate", status: "Active", strength: "High", lastSync: "2m ago" },
      { type: "Sleep Pattern", status: "Active", strength: "Medium", lastSync: "1h ago" },
      { type: "Metabolic", status: "Active", strength: "Low", lastSync: "Just now" }
    ] : [
      { type: "Heart Rate", status: "Disconnected", strength: "None", lastSync: "--" },
      { type: "Sleep Pattern", status: "Disconnected", strength: "None", lastSync: "--" },
      { type: "Metabolic", status: "Disconnected", strength: "None", lastSync: "--" }
    ],
    zkProofs: isVerified ? [
      { id: "zk-0821", type: "Heart Health", date: "2024-04-26", status: "Success" },
      { id: "zk-0799", type: "Sleep Quality", date: "2024-04-20", status: "Success" }
    ] : []
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <TopAppBar 
        title={language === 'zh' ? '数字身份档案' : 'Digital Identity'} 
        showBack={true} 
      />

      <main className="px-5 pt-4">
        {/* Profile Card */}
        <section className="relative overflow-hidden rounded-[34px] bg-slate-900 p-8 text-white shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-emerald-500/30 p-1">
                <img 
                  src="https://api.dicebear.com/7.x/shapes/svg?seed=Flare" 
                  alt="DID Avatar" 
                  className="h-full w-full rounded-full bg-emerald-100"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full ${isVerified ? 'bg-emerald-500' : 'bg-slate-500'} text-white shadow-lg`}>
                <span className="material-symbols-outlined text-sm">{isVerified ? 'verified' : 'pending'}</span>
              </div>
            </div>

            <h2 className="mt-5 text-2xl font-black tracking-tight uppercase italic">
              {didInfo.level}
            </h2>
            <div className="mt-2 flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="text-[10px] font-mono text-emerald-400/80">{didInfo.id}</span>
              <span className="material-symbols-outlined text-xs text-white/40 cursor-pointer hover:text-white transition-colors">content_copy</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
            <div className="text-center border-r border-white/10 group/score cursor-help" onClick={() => {
              document.getElementById('methodology-section').scrollIntoView({ behavior: 'smooth' });
            }}>
              <div className="flex items-center justify-center gap-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Health Credit</p>
                <span className="material-symbols-outlined text-[12px] text-white/30">info</span>
              </div>
              <p className="mt-1 text-3xl font-black text-emerald-400">{didInfo.creditScore}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Rewards</p>
              <p className="mt-1 text-3xl font-black text-white">2.4k <span className="text-xs font-bold text-slate-500 italic">GEF</span></p>
            </div>
          </div>
        </section>
        
        {/* Score Methodology */}
        <section id="methodology-section" className="mt-8 rounded-[28px] border border-emerald-100 bg-emerald-50/30 p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-emerald-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">analytics</span>
            {language === 'zh' ? '信用评分维度' : 'Score Methodology'}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div>
                <p className="text-[11px] font-black text-emerald-900 uppercase tracking-tight">
                  {language === 'zh' ? '生物特征一致性 (40%)' : 'Biological Integrity (40%)'}
                </p>
                <p className="mt-1 text-[11px] font-medium text-emerald-700/80 leading-relaxed">
                  {language === 'zh' ? '通过 ZK-Flare 证明确认健康数据来源于唯一的真实人类。' : 'Confirmed via ZK-Flare that data originates from a unique, verified human.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div>
                <p className="text-[11px] font-black text-emerald-900 uppercase tracking-tight">
                  {language === 'zh' ? '数据贡献质量 (50%)' : 'Data Contribution Quality (50%)'}
                </p>
                <p className="mt-1 text-[11px] font-medium text-emerald-700/80 leading-relaxed">
                  {language === 'zh' ? '基于您上传数据的丰富程度、准确性以及记录的持续天数。' : 'Based on richness, accuracy, and longevity of health records contributed.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div>
                <p className="text-[11px] font-black text-emerald-900 uppercase tracking-tight">
                  {language === 'zh' ? '网络治理贡献 (10%)' : 'Eco-System Participation (10%)'}
                </p>
                <p className="mt-1 text-[11px] font-medium text-emerald-700/80 leading-relaxed">
                  {language === 'zh' ? '参与 MIO 社区治理、研究投票及节点验证行为。' : 'Activity in MIO governance, research voting, and node validation.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Biometrics Status */}
        <section className="mt-8">
          <div className="flex items-center justify-between px-2 mb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
              {language === 'zh' ? '已验证生物特征' : 'Verified Biometrics'}
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">ZK-Secured</span>
          </div>
          
          <div className="space-y-3">
            {didInfo.linkedBiometrics.map((item) => (
              <div key={item.type} className="flex items-center justify-between rounded-[24px] bg-white p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <span className="material-symbols-outlined">
                      {item.type === 'Heart Rate' ? 'favorite' : item.type === 'Sleep Pattern' ? 'bedtime' : 'database'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{item.type}</p>
                    <p className="text-xs font-medium text-slate-400">Last synced: {item.lastSync}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-black uppercase tracking-wider ${
                    item.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'
                  }`}>{item.status}</p>
                  <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3].map((b) => (
                      <div key={b} className={`h-1 w-3 rounded-full ${
                        (item.strength === 'High' && b <= 3) || 
                        (item.strength === 'Medium' && b <= 2) || 
                        (item.strength === 'Low' && b <= 1) 
                        ? 'bg-emerald-400' : 'bg-slate-100'
                      }`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ZK Evidence */}
        <section className="mt-8">
          <h3 className="px-2 mb-4 text-sm font-black uppercase tracking-widest text-slate-900">
            {language === 'zh' ? '零知识证明记录' : 'ZK-Proof Evidence'}
          </h3>
          <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-white">
            {didInfo.zkProofs.map((proof, idx) => (
              <div key={proof.id} className={`flex items-center justify-between p-4 ${idx !== 0 ? 'border-t border-slate-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-500 text-lg">verified_user</span>
                  <div>
                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{proof.type}</p>
                    <p className="text-[10px] font-mono text-slate-400">{proof.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400">{proof.date}</p>
                  <p className="text-[10px] font-black text-emerald-500 uppercase italic">Proof Active</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {!isVerified && (
          <div className="fixed bottom-8 left-0 right-0 z-50 px-6">
            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full relative overflow-hidden rounded-full vitality-gradient py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_20px_50px_rgba(0,255,127,0.3)] active:scale-95 transition-all"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {language === 'zh' ? '正在核验 ZK 证明...' : 'GENERATING ZK-PROOF...'}
                </div>
              ) : (
                language === 'zh' ? '同步健康数据并核验' : 'SYNC HEALTH & VERIFY DID'
              )}
            </button>
          </div>
        )}

        {isVerified && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/research')}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-2 text-xs font-black uppercase tracking-widest text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              {language === 'zh' ? '返回研究中心' : 'BACK TO RESEARCH'}
            </button>
          </div>
        )}

        <div className="mt-12 text-center px-8 pb-12">
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            {language === 'zh' 
              ? '您的数字身份完全由私钥控制，MIO 不会存储您的身份原文。所有验证均通过 ZK-Flare 协议在链上完成。'
              : 'Your digital identity is controlled entirely by your private keys. MIO does not store your raw identity data. All verifications are ZK-Proofs on-chain.'
            }
          </p>
        </div>
      </main>
    </div>
  );
}
