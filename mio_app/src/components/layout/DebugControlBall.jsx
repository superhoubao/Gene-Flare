import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoState } from '../utils/DemoStateContext';

export default function DebugControlBall() {
  const { state, updateState } = useDemoState();
  const [isOpen, setIsOpen] = useState(false);

  if (!state.showDebugBall) return null;

  // 快捷配置一键切换
  const applyPreset = (preset) => {
    if (preset === 'NEWBIE') {
      updateState({
        isGenesisCompleted: false,
        hasActivePlans: false,
        isDidVerified: false,
      });
    } else if (preset === 'SOVEREIGN') {
      updateState({
        isGenesisCompleted: true,
        hasActivePlans: true,
        isDidVerified: true,
      });
    }
  };

  return (
    <>
      {/* 右上角精致毛玻璃悬浮调试球 */}
      <motion.button
        drag
        dragMomentum={false}
        whileHover={{ scale: 1.1, border: '1px solid rgba(251,191,36,0.5)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-[9999] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-emerald-500/20 bg-slate-900/60 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md transition-all active:shadow-inner"
      >
        <span className="material-symbols-outlined text-lg animate-pulse" style={{ fontFamily: "'Material Symbols Outlined'" }}>
          terminal
        </span>
        
        {/* 微弱环绕呼吸光晕 */}
        <span className="absolute inset-0 rounded-full border border-emerald-400/20 animate-ping opacity-60 pointer-events-none" />
      </motion.button>

      {/* 控制中心抽屉 */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9998] flex items-end justify-center md:items-start md:justify-end md:p-6 pointer-events-none">
            {/* 遮罩背景 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs pointer-events-auto"
            />

            {/* 控制面板卡片 */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative w-full max-w-sm overflow-hidden rounded-t-[34px] md:rounded-[30px] border border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl backdrop-blur-2xl pointer-events-auto md:top-28 md:right-0"
            >
              {/* 高端科技流金线条背景 */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-[60px] pointer-events-none" />
              <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-amber-500/10 blur-[60px] pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400" style={{ fontFamily: "'Material Symbols Outlined'" }}>tune</span>
                  <h3 className="text-sm font-black uppercase tracking-wider font-mono">MIO Studio Panel</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/5 p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="space-y-5">
                {/* 快捷模板演示 */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40 mb-2">演示预设模板</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => applyPreset('NEWBIE')}
                      className={`rounded-xl py-2.5 text-[11px] font-black uppercase tracking-wider transition-all border ${
                        !state.isGenesisCompleted && !state.hasActivePlans && !state.isDidVerified
                          ? 'bg-white text-slate-950 border-white shadow-[0_4px_12px_rgba(255,255,255,0.15)]'
                          : 'bg-white/5 text-white/80 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      🌱 新手体验态
                    </button>
                    <button
                      onClick={() => applyPreset('SOVEREIGN')}
                      className={`rounded-xl py-2.5 text-[11px] font-black uppercase tracking-wider transition-all border ${
                        state.isGenesisCompleted && state.hasActivePlans && state.isDidVerified
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-[0_4px_12px_rgba(245,158,11,0.3)]'
                          : 'bg-white/5 text-white/80 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      👑 高奢主权激活态
                    </button>
                  </div>
                </div>

                {/* 细节维度控制开关 */}
                <div className="border-t border-white/5 pt-4 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/40">细节维度微调</p>
                  
                  {/* 开关 1: 创世是否通关 */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-extrabold text-white/90">创世健康资产链</span>
                      <span className="text-[9px] text-white/40">控制首页新人 Bento 任务盒子与我的卡片</span>
                    </div>
                    <button
                      onClick={() => updateState({ isGenesisCompleted: !state.isGenesisCompleted })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        state.isGenesisCompleted ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          state.isGenesisCompleted ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* 开关 2: 计划是否激活 */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-extrabold text-white/90">已参与健康计划</span>
                      <span className="text-[9px] text-white/40">融合首页进度卡片、打卡任务及详情页视图</span>
                    </div>
                    <button
                      onClick={() => updateState({ hasActivePlans: !state.hasActivePlans })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        state.hasActivePlans ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          state.hasActivePlans ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* 开关 3: DID 是否激活 */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-extrabold text-white/90">ZK-DID 隐私盾验证</span>
                      <span className="text-[9px] text-white/40">控制研究页面 NFT 数据包的锁定与铸造</span>
                    </div>
                    <button
                      onClick={() => updateState({ isDidVerified: !state.isDidVerified })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        state.isDidVerified ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          state.isDidVerified ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 隐藏控制球 */}
                <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      updateState({ showDebugBall: false });
                      setIsOpen(false);
                      // 触发原生 alert 提示，告知小白用户从哪里找回
                      alert('调试球已被完美隐藏！您随时可以在「我的页面 (Profile)」->「设置 Preferences」最下方重新激活开启！');
                    }}
                    className="w-full rounded-xl bg-rose-500/10 border border-rose-500/20 py-2.5 text-center text-xs font-black uppercase tracking-widest text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                  >
                    ✕ 隐藏此悬浮调试球
                  </button>
                  <p className="text-center text-[9px] text-white/35 font-medium leading-relaxed">
                    隐藏后可在「我的 - 设置 Preferences」最下方找回
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
