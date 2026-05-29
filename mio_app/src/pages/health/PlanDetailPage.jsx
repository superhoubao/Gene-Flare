import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopAppBar from '../../components/layout/TopAppBar';
import Modal from '../../components/common/Modal';
import headerImg from '../../assets/cloud/cloud_3878ef2da9.png';
import { useLanguage } from '../../components/utils/LanguageContext';
import { useDemoState } from '../../components/utils/DemoStateContext';

export default function PlanDetailPage() {
  const { t, lang: language } = useLanguage();
  const navigate = useNavigate();
  const { updateState } = useDemoState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isZh = language === 'zh';

  const handleStart = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    updateState({ hasActivePlans: true });
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface relative pb-32">
      <TopAppBar showBack title={isZh ? '计划详情' : 'Plan Details'} rightIcon={null} transparent />
      
      {/* Immersive Header Image */}
      <div className="relative w-full h-72 md:h-80">
        <img src={headerImg} alt="Plan Immersive Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30 pointer-events-none" />
      </div>

      <main className="px-6 pt-2 space-y-8 relative z-10 -mt-16">
        {/* Header Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block text-[10px] font-black bg-primary-container text-on-primary-container px-3 py-1 rounded-full uppercase tracking-wider">
              {isZh ? '7天计划' : '7-DAY PLAN'}
            </span>
            <span className="inline-block text-[10px] font-black bg-amber-500/20 text-amber-600 px-3 py-1 rounded-full uppercase tracking-wider">
              {isZh ? '睡眠修复' : 'SLEEP RECOVERY'}
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {isZh ? '睡眠修复方案' : 'Sleep Repair Protocol'}
          </h1>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            {isZh 
              ? '通过连续7天的睡眠监测与行为干预，修复夜间恢复曲线，提升深度睡眠质量。'
              : 'Rebuild night recovery stability and generate a cleaner fatigue-risk history through 7-day tracking.'}
          </p>
        </section>

        {/* Why this plan & Problem solved */}
        <section className="bg-surface-container rounded-[24px] p-6 shadow-sm border border-outline-variant/30">
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">target</span>
            {isZh ? '为何推荐此计划' : 'Why This Plan'}
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{isZh ? '改善睡眠连续性' : 'Improve Sleep Continuity'}</h4>
                <p className="text-xs text-slate-600 mt-1">{isZh ? '监测数据显示您的深度睡眠时间不足，此计划将帮助分析并重建睡眠规律。' : 'Data indicates insufficient deep sleep; this plan helps analyze and rebuild sleep patterns.'}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{isZh ? '心血管健康干预' : 'Cardiovascular Care'}</h4>
                <p className="text-xs text-slate-600 mt-1">{isZh ? '结合每日心率与活动量，为您的心脏健康提供早期干预建议。' : 'Early intervention suggestions based on your daily heart rate and activity levels.'}</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Tasks Included */}
        <section>
          <h3 className="text-lg font-black text-slate-900 mb-4">{isZh ? '包含的日常任务' : 'Daily Tasks'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-[20px] shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="material-symbols-outlined text-blue-500">directions_walk</span>
              <span className="text-sm font-bold text-slate-900">{isZh ? '每日6000步' : '6,000 Steps'}</span>
            </div>
            <div className="bg-white p-4 rounded-[20px] shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="material-symbols-outlined text-indigo-500">bedtime</span>
              <span className="text-sm font-bold text-slate-900">{isZh ? '23:00前入睡' : 'Sleep by 23:00'}</span>
            </div>
            <div className="bg-white p-4 rounded-[20px] shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="material-symbols-outlined text-teal-500">water_drop</span>
              <span className="text-sm font-bold text-slate-900">{isZh ? '全天饮水2L' : '2L Water Daily'}</span>
            </div>
            <div className="bg-white p-4 rounded-[20px] shadow-sm border border-outline-variant/30 flex flex-col gap-2">
              <span className="material-symbols-outlined text-purple-500">self_improvement</span>
              <span className="text-sm font-bold text-slate-900">{isZh ? '10分钟正念' : '10m Mindfulness'}</span>
            </div>
          </div>
        </section>

        {/* Rewards */}
        <section className="bg-gradient-to-br from-[#090b14] via-[#0d0f1a] to-[#121424] rounded-[24px] p-6 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full pointer-events-none" />
          <h3 className="text-lg font-black text-white mb-4">{isZh ? '计划收益' : 'Expected Outcomes'}</h3>
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">bolt</span>
                <span className="text-sm font-bold text-white">SPARK {isZh ? '奖励' : 'Rewards'}</span>
              </div>
              <span className="text-amber-400 font-mono font-black">+200</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">eco</span>
                <span className="text-sm font-bold text-white">GEF {isZh ? '生态积分' : 'Eco Points'}</span>
              </div>
              <span className="text-emerald-400 font-mono font-black">+50</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400">monitor_heart</span>
                <span className="text-sm font-bold text-white">{isZh ? '综合健康提升' : 'Health Boost'}</span>
              </div>
              <span className="text-blue-400 font-black">~12%</span>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent pointer-events-none z-20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="w-full bg-slate-900 text-white py-4 rounded-full font-black text-lg shadow-xl pointer-events-auto flex items-center justify-center gap-2"
        >
          {isZh ? '确认并开启计划' : 'Start Plan Now'}
          <span className="material-symbols-outlined">arrow_forward</span>
        </motion.button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={isZh ? '开启睡眠修复方案' : 'Start Sleep Protocol'}
        message={isZh ? '确认开启此计划？这将会为你生成每日健康任务并更新你的健康轨迹。' : 'Are you sure you want to start this plan? It will generate daily tasks and track your progress.'}
        confirmText={isZh ? '确认开启' : 'Confirm & Start'}
        cancelText={isZh ? '再想想' : 'Cancel'}
      />
    </div>
  );
}
