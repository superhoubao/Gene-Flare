import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* ─── Background (same dark aurora theme) ───────────────────────── */
function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #020d08 0%, #021a10 50%, #010d07 100%)' }} />
      <motion.div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
    </div>
  );
}

/* ─── Step indicator ────────────────────────────────────────────── */
function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="relative flex items-center">
          <motion.div
            className="rounded-full"
            animate={{
              width: i === current ? 24 : 6,
              backgroundColor: i < current ? '#10b981' : i === current ? '#34d399' : 'rgba(255,255,255,0.15)',
            }}
            style={{ height: 6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Form Field ─────────────────────────────────────────────────── */
function Field({ id, label, type = 'text', value, onChange, icon, placeholder, hint, suffix }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-black uppercase tracking-[0.22em] text-emerald-400/60">{label}</label>
      <div className="relative">
        <span 
          className={`absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] transition-colors duration-300 ${focused ? 'text-emerald-400' : 'text-white/25'}`}
          style={{ fontFamily: "'Material Symbols Outlined'" }}
        >
          {icon}
        </span>
        <input
          id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full rounded-2xl bg-white/5 border pl-11 pr-12 py-4 text-sm font-medium text-white placeholder-white/20 outline-none transition-all duration-300"
          style={{
            borderColor: focused ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.06)',
            boxShadow: focused ? '0 0 0 3px rgba(52,211,153,0.08)' : 'none',
          }}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {suffix}
          </div>
        )}
      </div>
      {hint && <p className="text-[11px] font-medium text-white/25 pl-1">{hint}</p>}
    </div>
  );
}

/* ─── Password Strength ─────────────────────────────────────────── */
function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ chars', ok: password.length >= 8 },
    { label: 'Uppercase', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /\d/.test(password) },
    { label: 'Symbol', ok: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ['#ef4444', '#f97316', '#eab308', '#10b981'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
      <div className="flex gap-1.5">
        {[0,1,2,3].map((i) => (
          <motion.div key={i} className="flex-1 h-1 rounded-full"
            animate={{ backgroundColor: i < score ? colors[score - 1] : 'rgba(255,255,255,0.08)' }}
            transition={{ duration: 0.3 }} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map((c) => (
            <span key={c.label} className={`text-[10px] font-bold flex items-center gap-1 ${c.ok ? 'text-emerald-400' : 'text-white/20'}`}>
              <span className="material-symbols-outlined" style={{ fontSize: 11 }}>{c.ok ? 'check' : 'close'}</span>
              {c.label}
            </span>
          ))}
        </div>
        {score > 0 && <span className="text-xs font-black" style={{ color: colors[score - 1] }}>{labels[score - 1]}</span>}
      </div>
    </motion.div>
  );
}

/* ─── Step panels ────────────────────────────────────────────────── */
const STEPS = [
  {
    key: 'account',
    title: 'Create Account',
    subtitle: 'Set up your MIO identity',
    icon: 'person_add',
  },
  {
    key: 'profile',
    title: 'Health Profile',
    subtitle: 'Tell us about yourself',
    icon: 'favorite',
  },
  {
    key: 'verify',
    title: 'Verify & Launch',
    subtitle: 'Almost there!',
    icon: 'verified',
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 0 fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 1 fields
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');

  // Step 2 state
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  const goNext = () => { setDir(1); setStep((s) => Math.min(s + 1, 2)); };
  const goPrev = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0)); };

  const handleFinish = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsLoading(false);
    setDone(true);
    setTimeout(() => navigate('/genesis'), 1500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-5 py-12">
      <AuthBackground />

      <div className="relative z-10 w-full max-w-sm">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={step === 0 ? () => navigate('/login') : goPrev}
          className="flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors mb-8 text-xs font-bold uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          {step === 0 ? 'Back to Login' : 'Previous'}
        </motion.button>

        {/* Step header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <StepIndicator current={step} total={3} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">{step + 1} / 3</span>
          </div>

          <motion.div
            className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 border border-emerald-500/20"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.05))' }}
            key={step}
            initial={{ scale: 0.7, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="material-symbols-outlined text-emerald-400" style={{ fontSize: 20 }}>{STEPS[step].icon}</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="text-3xl font-black tracking-[-0.05em] text-white mb-1">{STEPS[step].title}</h1>
              <p className="text-sm font-medium text-white/35">{STEPS[step].subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] border border-white/6 p-7 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 32px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-5"
            >
              {/* ── Step 0: Account ── */}
              {step === 0 && (
                <>
                  <Field id="reg-email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="mail" placeholder="you@example.com" />
                  <div className="space-y-3">
                    <Field 
                      id="reg-pass" 
                      label="Password" 
                      type={showPassword ? 'text' : 'password'} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      icon="lock" 
                      placeholder="Min. 8 characters" 
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
                    <PasswordStrength password={password} />
                  </div>
                  <Field 
                    id="reg-confirm" 
                    label="Confirm Password" 
                    type={showConfirm ? 'text' : 'password'} 
                    value={confirm} 
                    onChange={(e) => setConfirm(e.target.value)} 
                    icon="lock_reset" 
                    placeholder="Repeat your password"
                    hint={confirm && confirm !== password ? '⚠ Passwords do not match' : ''} 
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="text-white/25 hover:text-white/60 transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                          {showConfirm ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    }
                  />
                </>
              )}

              {/* ── Step 1: Profile ── */}
              {step === 1 && (
                <>
                  <Field id="reg-name" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} icon="badge" placeholder="Your real name" />
                  <Field id="reg-dob" label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} icon="cake" placeholder="" />
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.22em] text-emerald-400/60">Biological Sex</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Male', 'Female', 'Other'].map((s) => (
                        <motion.button
                          key={s} type="button"
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                          onClick={() => setSex(s)}
                          className="rounded-xl py-3 text-xs font-black transition-all border"
                          style={{
                            borderColor: sex === s ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.06)',
                            background: sex === s ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
                            color: sex === s ? '#34d399' : 'rgba(255,255,255,0.4)',
                          }}
                        >{s}</motion.button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── Step 2: Verify ── */}
              {step === 2 && (
                <>
                  {/* Summary card */}
                  <div className="rounded-2xl bg-white/4 border border-white/6 p-5 space-y-3">
                    {[
                      { label: 'Email', value: email || '—', icon: 'mail' },
                      { label: 'Name', value: name || '—', icon: 'badge' },
                      { label: 'Date of Birth', value: dob || '—', icon: 'cake' },
                      { label: 'Sex', value: sex || '—', icon: 'person' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-400/50" style={{ fontSize: 16 }}>{row.icon}</span>
                        <span className="text-[10px] font-bold text-white/30 w-20 uppercase tracking-wide flex-shrink-0">{row.label}</span>
                        <span className="text-sm font-bold text-white/75 truncate">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terms */}
                  <motion.label
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start gap-3 cursor-pointer select-none"
                  >
                    <motion.div
                      onClick={() => setAgreed(!agreed)}
                      className="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        borderColor: agreed ? '#10b981' : 'rgba(255,255,255,0.15)',
                        backgroundColor: agreed ? 'rgba(16,185,129,0.2)' : 'transparent',
                      }}
                    >
                      <AnimatePresence>
                        {agreed && (
                          <motion.span
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            className="material-symbols-outlined text-emerald-400" style={{ fontSize: 13 }}
                          >check</motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <span className="text-[11px] font-medium leading-relaxed text-white/35">
                      I agree to the{' '}
                      <span className="text-emerald-400 cursor-pointer hover:underline">Terms of Service</span> and{' '}
                      <span className="text-emerald-400 cursor-pointer hover:underline">Privacy Policy</span>. My genomic data is encrypted and owned by me.
                    </span>
                  </motion.label>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA Button */}
          <div className="mt-7">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3 py-3"
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30"
                    animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}
                  >
                    <span className="material-symbols-outlined text-emerald-400" style={{ fontSize: 28 }}>check_circle</span>
                  </motion.div>
                  <p className="text-sm font-black text-emerald-300">Account Created!</p>
                  <p className="text-xs text-white/30">Redirecting to your dashboard...</p>
                </motion.div>
              ) : (
                <motion.button
                  key="btn"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={step < 2 ? goNext : handleFinish}
                  disabled={
                    isLoading ||
                    (step === 0 && (!email || !password || confirm !== password || password.length < 8)) ||
                    (step === 1 && (!name || !dob || !sex)) ||
                    (step === 2 && !agreed)
                  }
                  className="relative w-full overflow-hidden rounded-2xl py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #065f46 0%, #10b981 60%, #34d399 100%)' }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                  />
                  <span className="relative flex items-center justify-center gap-2.5">
                    {isLoading ? (
                      <>
                        <motion.span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                        Creating account...
                      </>
                    ) : step < 2 ? (
                      <>Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span></>
                    ) : (
                      <>Launch MIO <span className="material-symbols-outlined text-[18px]">rocket_launch</span></>
                    )}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Login link */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center mt-8 text-xs font-medium text-white/30"
        >
          Already a member?{' '}
          <button onClick={() => navigate('/login')} className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">Sign In</button>
        </motion.p>
      </div>
    </div>
  );
}
