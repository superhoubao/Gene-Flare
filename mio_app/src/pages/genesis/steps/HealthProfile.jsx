import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * A Premium Horizontal Ruler Picker component
 */
const RulerPicker = ({ min, max, unit, value, onChange, step = 1 }) => {
  const scrollRef = useRef(null);
  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  
  // Handle scroll to update value
  const onScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = 12; // Width of each tick mark + gap
    const index = Math.round(scrollLeft / itemWidth);
    const newValue = min + index;
    if (newValue !== value && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  // Initial scroll position
  useEffect(() => {
    if (scrollRef.current && value) {
      const itemWidth = 12;
      scrollRef.current.scrollLeft = (value - min) * itemWidth;
    }
  }, []);

  return (
    <div className="relative w-full h-24 overflow-hidden group">
      {/* Center Indicator */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10 flex flex-col items-center">
        <div className="w-[3px] h-8 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]" />
        <div className="mt-2 text-xl font-black text-emerald-400 font-mono">
          {value}<span className="text-[10px] ml-1 uppercase opacity-60">{unit}</span>
        </div>
      </div>

      {/* Ruler Track */}
      <div 
        ref={scrollRef}
        onScroll={onScroll}
        className="w-full h-full overflow-x-scroll no-scrollbar flex items-end pb-4 cursor-grab active:cursor-grabbing"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* Padding for center alignment */}
        <div className="flex-shrink-0 w-1/2" />
        
        {range.map((num) => (
          <div 
            key={num} 
            className="flex-shrink-0 w-[12px] flex flex-col items-center justify-end h-12"
            style={{ scrollSnapAlign: 'center' }}
          >
            {num % 5 === 0 ? (
              <>
                <div className="w-[1.5px] h-6 bg-white/40 rounded-full" />
                <span className="text-[8px] font-bold text-white/20 mt-1">{num % 10 === 0 ? num : ''}</span>
              </>
            ) : (
              <div className="w-[1px] h-3 bg-white/10 rounded-full" />
            )}
          </div>
        ))}

        <div className="flex-shrink-0 w-1/2" />
      </div>

      {/* Fades */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#021a10] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#021a10] to-transparent pointer-events-none" />
    </div>
  );
};

export default function HealthProfile({ onNext }) {
  const [profile, setProfile] = useState({
    gender: 'Male',
    age: 28,
    height: 175,
    weight: 65
  });

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen px-6 pt-24 pb-12"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-black text-white mb-2">Health Profile</h2>
        <p className="text-sm text-white/40 px-6">Slide the rulers to set your metrics. This calibrates your rewards.</p>
      </div>

      <div className="flex-1 space-y-10">
        {/* Gender - Keeps original buttons as they are discrete */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center text-emerald-400/60">Select Gender</p>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                key={g}
                onClick={() => handleChange('gender', g)}
                className={`py-3 rounded-2xl border transition-all font-bold text-xs ${
                  profile.gender === g 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'bg-white/5 border-white/10 text-white/20'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Age Ruler */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center text-emerald-400/60">Age</p>
          <RulerPicker 
            min={18} 
            max={100} 
            unit="Years" 
            value={profile.age} 
            onChange={(v) => handleChange('age', v)} 
          />
        </div>

        {/* Height Ruler */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center text-emerald-400/60">Height</p>
          <RulerPicker 
            min={120} 
            max={220} 
            unit="cm" 
            value={profile.height} 
            onChange={(v) => handleChange('height', v)} 
          />
        </div>

        {/* Weight Ruler */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center text-emerald-400/60">Weight</p>
          <RulerPicker 
            min={30} 
            max={150} 
            unit="kg" 
            value={profile.weight} 
            onChange={(v) => handleChange('weight', v)} 
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/20"
        >
          Confirm Metrics
        </motion.button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </motion.div>
  );
}
