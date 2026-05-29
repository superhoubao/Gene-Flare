import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* ─── Slide Data ────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    title: 'Genomic Sovereignty',
    subtitle: 'Your DNA, Your Property',
    description: 'Secure your unique genetic blueprint using blockchain encryption. You own your data, forever.',
    icon: 'genetics',
    color: '#29b5b5',
    gradient: 'from-emerald-500/20 to-transparent'
  },
  {
    id: 2,
    title: 'AI Longevity Co-pilot',
    subtitle: 'Smart Health Insights',
    description: 'Real-time diagnostic insights and personalized longevity plans powered by state-of-the-art AI models.',
    icon: 'psychology',
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-transparent'
  },
  {
    id: 3,
    title: 'Health to Wealth',
    subtitle: 'Contribute & Earn',
    description: 'Turn your health into value. Securely share anonymized data for research and earn protocol rewards.',
    icon: 'account_balance_wallet',
    color: '#53cdcd',
    gradient: 'from-teal-500/20 to-transparent'
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      setDirection(1);
      setCurrent(current + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleSkip = () => {
    finishOnboarding();
  };

  const finishOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    localStorage.setItem('tutorialCompleted', 'true');
    // 如果已经绑定过DID（说明不是首次启动，而是从首页任务链重新进来的），直接跳转回首页
    const isLogged = localStorage.getItem('did_verified') !== null;
    if (isLogged) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0e0e1a] overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30" 
          style={{ background: 'radial-gradient(circle at 50% 30%, rgba(41, 181, 181,0.15) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex justify-end p-6">
        <button 
          onClick={handleSkip}
          className="text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content Slider */}
      <div className="flex-1 relative flex flex-col items-center justify-center px-8 text-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            className="w-full flex flex-col items-center"
          >
            {/* Animated Icon Container */}
            <motion.div 
              className={`w-32 h-32 rounded-[40px] flex items-center justify-center mb-10 relative`}
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {SLIDES[current].icon !== 'genetics' && (
                <>
                  <div className={`absolute inset-0 rounded-[40px] bg-gradient-to-br ${SLIDES[current].gradient} blur-xl opacity-50`} />
                  <div className="absolute inset-0 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md" />
                </>
              )}
              {SLIDES[current].icon === 'genetics' ? (
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-2xl flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 bg-[#8073e7]/40 blur-2xl rounded-full"
                    animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.85, 1.15, 0.85] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.img 
                    src="/src/assets/logo-dark.png" 
                    alt="App Logo" 
                    className="relative z-10 w-full h-full object-cover rounded-full scale-[1.35]" 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <span class="material-symbols-outlined" style="font-size: 56px; color: ${SLIDES[current].color}; text-shadow: 0 0 30px ${SLIDES[current].color}66; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-family: 'Material Symbols Outlined';">genetics</span>
                      `;
                    }}
                  />
                </div>
              ) : (
                <span 
                  className="material-symbols-outlined relative z-10"
                  style={{ 
                    fontSize: 56, 
                    color: SLIDES[current].color, 
                    textShadow: `0 0 30px ${SLIDES[current].color}66`,
                    fontFamily: "'Material Symbols Outlined'"
                  }}
                >
                  {SLIDES[current].icon}
                </span>
              )}
              
              {/* Floating accents */}
              <motion.div 
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40"
                animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-2 w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400/40"
                animate={{ y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: SLIDES[current].color }}>
                  {SLIDES[current].title}
                </p>
                <h2 className="text-4xl font-black tracking-tighter text-white">
                  {SLIDES[current].subtitle}
                </h2>
              </div>
              <p className="text-sm font-medium text-white/40 leading-relaxed max-w-[280px] mx-auto">
                {SLIDES[current].description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="relative z-20 p-10 flex flex-col items-center gap-8">
        {/* Progress Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <div 
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{ 
                width: i === current ? 24 : 6,
                backgroundColor: i === current ? SLIDES[current].color : 'rgba(255,255,255,0.1)'
              }}
            />
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="relative w-full max-w-[240px] py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] text-white overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, #1b8b8b 0%, #29b5b5 100%)' }}
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            {current === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            <span 
              className="material-symbols-outlined text-[18px]"
              style={{ fontFamily: "'Material Symbols Outlined'" }}
            >
              {current === SLIDES.length - 1 ? 'rocket_launch' : 'arrow_forward'}
            </span>
          </span>
        </motion.button>
      </div>
    </div>
  );
}
