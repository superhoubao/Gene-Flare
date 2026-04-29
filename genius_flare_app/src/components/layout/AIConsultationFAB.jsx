import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AIConsultationFAB() {
  const navigate = useNavigate();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 400); // 停止滑动400ms后恢复
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <motion.button
      onClick={() => navigate('/ai-consultation')}
      className="fixed bottom-28 right-4 z-50 flex items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(46,204,113,0.3)] overflow-hidden"
      style={{ width: 64, height: 64 }}
      animate={{
        scale: isScrolling ? 0.7 : 1,
        opacity: isScrolling ? 0.4 : 1,
        x: isScrolling ? 16 : 0, // 滑动时向右边缘收缩
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* 内部呼吸发光体 */}
      {!isScrolling && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* 核心视觉：星轨与 AI 核心 */}
      <div className="relative flex items-center justify-center w-12 h-12 z-10">
        {/* 外层正向旋转星轨 */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full text-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="60 40 20 40" className="opacity-40" />
          <circle cx="50" cy="4" r="3" fill="#00E5FF" className="drop-shadow-[0_0_6px_rgba(0,229,255,1)]" />
        </motion.svg>
        
        {/* 内层反向旋转虚线星轨 */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full text-teal-300 scale-75"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="15 25" className="opacity-60" />
        </motion.svg>

        {/* 核心发光 AI 图标 (脉冲缩放) */}
        <motion.span 
          className="material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-br from-white via-teal-200 to-primary text-[28px]"
          style={{ filter: 'drop-shadow(0px 0px 10px rgba(46,204,113,0.9))' }}
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          auto_awesome
        </motion.span>
      </div>
    </motion.button>
  );
}
