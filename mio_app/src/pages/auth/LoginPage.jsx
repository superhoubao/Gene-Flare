import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* ─── Background layers ─────────────────────────────────────────── */
function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep dark base */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #020d08 0%, #021a10 50%, #010d07 100%)' }}
      />

      {/* Aurora orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)' }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
    </div>
  );
}

/* ─── Floating DNA strand decoration ───────────────────────────── */
function FloatingDots() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 3,
    dur: Math.random() * 5 + 4,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-emerald-400"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0, 0.5, 0], y: [0, -20, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Form Field ────────────────────────────────────────────────── */
function AuthField({ id, label, type = 'text', value, onChange, icon, placeholder, autoComplete, suffix }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative group">
      <label htmlFor={id} className="block text-xs font-black uppercase tracking-[0.22em] text-emerald-400/60 mb-2">
        {label}
      </label>
      <div className="relative">
        {/* Icon */}
        <span
          className={`absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] transition-colors duration-300 ${focused ? 'text-emerald-400' : 'text-white/25'}`}
          style={{ fontFamily: "'Material Symbols Outlined'" }}
        >
          {icon}
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-2xl bg-white/5 border pl-11 pr-12 py-4 text-sm font-medium text-white placeholder-white/20 outline-none transition-all duration-300"
          style={{
            borderColor: focused ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.06)',
            boxShadow: focused ? '0 0 0 3px rgba(52,211,153,0.08), inset 0 1px 0 rgba(255,255,255,0.04)' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        />

        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {suffix}
          </div>
        )}

        {/* Focus ring animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ boxShadow: '0 0 20px rgba(52,211,153,0.15)' }}
        />
      </div>
    </div>
  );
}

/* ─── Social Login Button ───────────────────────────────────────── */
function SocialButton({ icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl bg-white/5 border border-white/6 py-3.5 text-xs font-bold text-white/60 transition-all duration-200"
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

/* ─── Main LoginPage ────────────────────────────────────────────── */
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate network call
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    // Check if user has completed Genesis Journey
    const genesisCompleted = localStorage.getItem('genesisCompleted');
    if (genesisCompleted === 'true') {
      navigate('/');
    } else {
      navigate('/genesis');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-5 py-10">
      <AuthBackground />
      <FloatingDots />

      <div className="relative z-10 w-full max-w-sm">
        {/* Back arrow */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/splash')}
          className="flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors mb-10 text-xs font-bold uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          {/* Mini hex badge */}
          <motion.div
            className="w-12 h-12 mb-6 flex items-center justify-center rounded-2xl border border-emerald-500/20"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.05))' }}
            whileHover={{ rotate: 10 }}
          >
            <span className="material-symbols-outlined text-emerald-400" style={{ fontSize: 22 }}>genetics</span>
          </motion.div>

          <h1 className="text-3xl font-black tracking-[-0.05em] text-white mb-2">
            Welcome back
          </h1>
          <p className="text-sm font-medium text-white/35 leading-relaxed">
            Sign in to your MIO account to access your health genome.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-[28px] border border-white/6 p-7 space-y-5"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 32px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <AuthField
            id="login-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="mail"
            placeholder="you@example.com"
            autoComplete="email"
          />

          <AuthField
            id="login-password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="lock"
            placeholder="••••••••"
            autoComplete="current-password"
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/25 hover:text-white/60 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            }
          />

          {/* Forgot password */}
          <div className="flex justify-end">
            <button className="text-xs font-bold text-emerald-400/60 hover:text-emerald-300 transition-colors tracking-wide">
              Forgot password?
            </button>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs font-bold text-red-400 bg-red-400/10 rounded-xl px-4 py-3 border border-red-400/10"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={isLoading}
            className="relative w-full overflow-hidden rounded-2xl py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #065f46 0%, #10b981 60%, #34d399 100%)' }}
          >
            {/* Shimmer effect */}
            {!isLoading && (
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2.5">
              {isLoading ? (
                <>
                  <motion.span
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </span>
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-[11px] font-bold text-white/20 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          {/* Social logins */}
          <div className="flex gap-3">
            <SocialButton
              label="Apple"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-70"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>}
            />
            <SocialButton
              label="Google"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-70"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
            />
          </div>
        </motion.div>

        {/* Register link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-xs font-medium text-white/30"
        >
          New to MIO?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
          >
            Create account
          </button>
        </motion.p>
      </div>
    </div>
  );
}
