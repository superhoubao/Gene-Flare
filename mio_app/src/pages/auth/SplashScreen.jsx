import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* ─── Gene Network Background (Refined & Minimal) ──────────────── */
export function GeneNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    
    // Config
    const particleCount = 45;
    const connectionDist = 140;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.02;

        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
      }

      draw() {
        const opacity = 0.1 + (Math.sin(this.pulse) + 1) * 0.15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(83, 205, 205, ${opacity})`;
        ctx.fill();
      }
    }

    // Init
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(41, 181, 181, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

/* ─── Particle Field ───────────────────────────────────────────── */
export function ParticleField({ count = 60 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Aurora Orbs ──────────────────────────────────────────────── */
export function AuroraOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-left emerald orb */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(41, 181, 181,0.25) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bottom-right teal orb */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(128, 115, 231,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* Center subtle glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(83, 205, 205,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

/* ─── Loading Bar ──────────────────────────────────────────────── */
function LoadingBar({ progress }) {
  return (
    <div className="w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #29b5b5, #53cdcd, #8073e7)' }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
}

/* ─── App Logo ─────────────────────────────────────────────────── */
function AppLogo() {
  return (
    <motion.div
      className="relative flex items-center justify-center rounded-full overflow-hidden shadow-[0_0_40px_rgba(128,115,231,0.25)]"
      style={{ width: '120px', height: '120px' }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
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
          // 降级：如果未找到图片，显示默认的 CSS 样式
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #1b8b8b, #052626); display: flex; align-items: center; justify-content: center; border-radius: 50%;">
              <span class="material-symbols-outlined" style="color: #53cdcd; font-size: 40px;">genetics</span>
            </div>
          `;
        }}
      />
    </motion.div>
  );
}

/* ─── Main SplashScreen ────────────────────────────────────────── */
export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'ready'

  useEffect(() => {
    // Simulate loading progress
    const steps = [
      { to: 30, delay: 200 },
      { to: 60, delay: 600 },
      { to: 80, delay: 400 },
      { to: 95, delay: 500 },
      { to: 100, delay: 300 },
    ];

    let cumDelay = 0;
    const timers = steps.map(({ to, delay }) => {
      cumDelay += delay;
      return setTimeout(() => setProgress(to), cumDelay);
    });

    // After full load → show CTA
    const readyTimer = setTimeout(() => setPhase('ready'), cumDelay + 400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(readyTimer);
    };
  }, []);

  const handleStart = () => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding === 'true') {
      navigate('/login');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #0e0e1a 0%, #151526 40%, #1a1a2e 100%)' }}
    >
      {/* Background layers */}
      <AuroraOrbs />
      <ParticleField count={50} />
      <GeneNetwork />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <AppLogo />

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="space-y-2"
        >
          <h1
            className="text-5xl font-black tracking-[-0.06em] text-white"
            style={{ textShadow: '0 0 40px rgba(83, 205, 205,0.3)' }}
          >
            MIO
          </h1>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400/60">
            Radiant Research · Web3 Health
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-sm font-medium text-white/40 max-w-[26ch] leading-relaxed"
        >
          Your Health is Your Wealth.
        </motion.p>

        {/* Loading / CTA */}
        <AnimatePresence mode="wait">
          {phase === 'loading' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4 mt-4"
            >
              <LoadingBar progress={progress} />
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400/40">
                {progress < 40 ? 'Initializing genome engine...' :
                  progress < 75 ? 'Loading health models...' :
                    progress < 100 ? 'Securing DID vault...' : 'Ready'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4 mt-4 w-full max-w-xs"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(83, 205, 205,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                className="relative w-full overflow-hidden rounded-full py-4 px-8 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #1b8b8b 0%, #29b5b5 50%, #53cdcd 100%)' }}
              >
                {/* Sheen sweep */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                />
                <span className="relative">Get Started</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="text-xs font-bold text-white/30 hover:text-white/60 transition-colors tracking-wider"
              >
                Already have an account? Sign In →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(83, 205, 205,0.4), transparent)' }}
      />

    </div>
  );
}
