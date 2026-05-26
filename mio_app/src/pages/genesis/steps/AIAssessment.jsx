import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    id: 'sleep',
    question: 'How many hours of sleep do you typically get?',
    icon: 'bedtime',
    options: [
      { label: '< 5 hours', value: 'low', score: 40 },
      { label: '5-7 hours', value: 'medium', score: 65 },
      { label: '7-9 hours', value: 'good', score: 90 },
      { label: '> 9 hours', value: 'over', score: 70 },
    ],
  },
  {
    id: 'stress',
    question: 'How would you rate your daily stress level?',
    icon: 'psychology',
    options: [
      { label: 'Very High', value: 'very_high', score: 30 },
      { label: 'High', value: 'high', score: 50 },
      { label: 'Moderate', value: 'moderate', score: 75 },
      { label: 'Low', value: 'low', score: 95 },
    ],
  },
  {
    id: 'water',
    question: 'How much water do you drink daily?',
    icon: 'water_drop',
    options: [
      { label: '< 1 liter', value: 'low', score: 40 },
      { label: '1-2 liters', value: 'medium', score: 70 },
      { label: '2-3 liters', value: 'good', score: 90 },
      { label: '> 3 liters', value: 'high', score: 85 },
    ],
  },
  {
    id: 'energy',
    question: 'Do you often feel fatigued during the day?',
    icon: 'bolt',
    options: [
      { label: 'Always', value: 'always', score: 30 },
      { label: 'Often', value: 'often', score: 50 },
      { label: 'Sometimes', value: 'sometimes', score: 70 },
      { label: 'Rarely', value: 'rarely', score: 95 },
    ],
  },
];

/**
 * Step 3: AI Health Assessment
 * Interactive Q&A with AI, generating a health report.
 */
export default function AIAssessment({ onNext }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [phase, setPhase] = useState('questions'); // 'questions' | 'analyzing' | 'report'
  const [analyzeProgress, setAnalyzeProgress] = useState(0);

  const handleAnswer = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setPhase('analyzing');
      }
    }, 400);
  };

  // Analyzing animation
  useEffect(() => {
    if (phase !== 'analyzing') return;
    const timer = setInterval(() => {
      setAnalyzeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase('report'), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [phase]);

  // Calculate health score from answers
  const healthScore = Object.values(answers).reduce((sum, opt) => sum + (opt?.score || 0), 0) / Math.max(Object.keys(answers).length, 1);
  const roundedScore = Math.round(healthScore);

  const getScoreColor = (score) => {
    if (score >= 80) return '#29b5b5';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      className="flex flex-col min-h-screen px-6 py-12"
    >
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center mx-auto mb-6"
        >
          <span className="material-symbols-outlined text-cyan-400 text-3xl" style={{ fontFamily: "'Material Symbols Outlined'" }}>
            psychology
          </span>
        </motion.div>

        <h2 className="text-3xl font-black tracking-tight text-white mb-2">
          {phase === 'report' ? 'Your Health Report' : 'AI Assessment'}
        </h2>
        <p className="text-sm text-white/40 font-medium">
          {phase === 'questions' && `Question ${currentQ + 1} of ${QUESTIONS.length}`}
          {phase === 'analyzing' && 'Generating personalized insights...'}
          {phase === 'report' && 'Based on your responses'}
        </p>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* ── Questions Phase ── */}
          {phase === 'questions' && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-6"
            >
              {/* AI Avatar + Question */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 border border-cyan-400/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-cyan-400 text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                    smart_toy
                  </span>
                </div>
                <div className="flex-1 rounded-2xl rounded-tl-md bg-white/5 border border-white/8 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ color: '#06b6d4', fontFamily: "'Material Symbols Outlined'" }}
                    >
                      {QUESTIONS[currentQ].icon}
                    </span>
                  </div>
                  <p className="text-base font-bold text-white leading-relaxed">
                    {QUESTIONS[currentQ].question}
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pl-12">
                {QUESTIONS[currentQ].options.map((opt, i) => (
                  <motion.button
                    key={opt.value}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(QUESTIONS[currentQ].id, opt)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      answers[QUESTIONS[currentQ].id]?.value === opt.value
                        ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                        : 'border-white/8 bg-white/[0.03] text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-sm font-bold">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Analyzing Phase ── */}
          {phase === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-8"
            >
              {/* Brain animation */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-32 h-32 rounded-full border-2 border-cyan-400/20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 rounded-full border border-emerald-400/30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="material-symbols-outlined text-cyan-400 text-4xl"
                    style={{ fontFamily: "'Material Symbols Outlined'" }}
                  >
                    psychology
                  </motion.span>
                </div>
              </div>

              {/* Progress */}
              <div className="w-48 space-y-2">
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                    style={{ width: `${analyzeProgress}%` }}
                  />
                </div>
                <p className="text-xs text-center text-white/30 font-bold uppercase tracking-wider">
                  {analyzeProgress < 40 ? 'Analyzing patterns...' :
                   analyzeProgress < 70 ? 'Cross-referencing data...' :
                   analyzeProgress < 100 ? 'Generating report...' : 'Complete!'}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Report Phase ── */}
          {phase === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score Ring */}
              <div className="flex justify-center mb-4">
                <div className="relative w-36 h-36">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="60" cy="60" r="52"
                      stroke={getScoreColor(roundedScore)}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '327', strokeDashoffset: '327' }}
                      animate={{ strokeDashoffset: 327 - (327 * roundedScore) / 100 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{roundedScore}</span>
                    <span className="text-[10px] font-bold text-white/30 uppercase">Health Score</span>
                  </div>
                </div>
              </div>

              {/* Dimension cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Physical', score: Math.min(100, roundedScore + 5), color: '#29b5b5' },
                  { label: 'Mental', score: Math.max(0, roundedScore - 8), color: '#06b6d4' },
                  { label: 'Lifestyle', score: Math.min(100, roundedScore + 2), color: '#8b5cf6' },
                ].map((dim) => (
                  <div key={dim.label} className="rounded-2xl bg-white/5 border border-white/5 p-3 text-center">
                    <p className="text-[10px] font-bold text-white/30 uppercase mb-2">{dim.label}</p>
                    <p className="text-xl font-black" style={{ color: dim.color }}>{dim.score}</p>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-white/30 uppercase tracking-wider">AI Recommendations</p>
                {[
                  { icon: 'bedtime', text: 'Optimize your sleep schedule for better recovery', color: '#8b5cf6' },
                  { icon: 'self_improvement', text: 'Consider stress management techniques like meditation', color: '#06b6d4' },
                ].map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <span
                      className="material-symbols-outlined text-lg mt-0.5 shrink-0"
                      style={{ color: rec.color, fontFamily: "'Material Symbols Outlined'" }}
                    >
                      {rec.icon}
                    </span>
                    <p className="text-sm font-medium text-white/50 leading-relaxed">{rec.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA (report phase) */}
      {phase === 'report' && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full rounded-2xl py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl mt-6"
          style={{ background: 'linear-gradient(135deg, #1b8b8b 0%, #29b5b5 60%, #53cdcd 100%)' }}
        >
          <span className="flex items-center justify-center gap-2">
            Continue to Mint
            <span className="material-symbols-outlined text-lg" style={{ fontFamily: "'Material Symbols Outlined'" }}>arrow_forward</span>
          </span>
        </motion.button>
      )}
    </motion.div>
  );
}
