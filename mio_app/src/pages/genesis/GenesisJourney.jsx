import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import SparkCounter from './components/SparkCounter';
import SparkReward from './components/SparkReward';
import StepProgress from './components/StepProgress';

import WelcomeGate from './steps/WelcomeGate';
import ActivateDID from './steps/ActivateDID'; // New Step
import ConnectHealth from './steps/ConnectHealth';
import HealthProfile from './steps/HealthProfile';
import AIAssessment from './steps/AIAssessment';
import FirstMint from './steps/FirstMint';
import GenesisComplete from './steps/GenesisComplete';

// Reward mapping based on step index (0-based)
const SPARK_REWARDS = {
  0: 0,   // Welcome
  1: 150, // Activate DID
  2: 100, // Connect Health
  3: 120, // Health Profile
  4: 150, // AI Assessment
  5: 130  // First Mint
};

/**
 * GenesisJourney — Main orchestrator
 * Updated to include Activate DID step.
 */
export default function GenesisJourney() {
  const navigate = useNavigate();

  // Restore progress from localStorage
  const savedStep = Number(localStorage.getItem('genesisStep') || 0);
  const savedSpark = Number(localStorage.getItem('genesisSpark') || 0);

  const [step, setStep] = useState(savedStep);
  const [spark, setSpark] = useState(savedSpark);
  const prevSparkRef = useRef(savedSpark);
  const [rewardVisible, setRewardVisible] = useState(false);
  const [pendingReward, setPendingReward] = useState(0);

  // Persist progress
  useEffect(() => {
    localStorage.setItem('genesisStep', String(step));
    localStorage.setItem('genesisSpark', String(spark));
  }, [step, spark]);

  // Award spark and show animation
  const awardSpark = useCallback((amount) => {
    prevSparkRef.current = spark;
    setPendingReward(amount);
    setRewardVisible(true);
    setSpark((prev) => prev + amount);
  }, [spark]);

  const handleStepComplete = useCallback(
    (stepIndex) => {
      const reward = SPARK_REWARDS[stepIndex];
      if (reward > 0) {
        awardSpark(reward);
      }
      setTimeout(() => {
        setStep(stepIndex + 1);
      }, reward > 0 ? 600 : 100);
    },
    [awardSpark]
  );

  const handleSkipAll = useCallback(() => {
    localStorage.removeItem('genesisCompleted');
    localStorage.setItem('genesisSkipped', 'true');
    localStorage.setItem('genesisStep', String(step));
    localStorage.setItem('genesisSpark', String(spark));
    navigate('/', { replace: true });
  }, [navigate, step, spark]);

  const handleFinish = useCallback(() => {
    localStorage.setItem('genesisCompleted', 'true');
    localStorage.setItem('sparkBalance', String(spark));
    localStorage.removeItem('genesisStep');
    localStorage.removeItem('genesisSpark');
    localStorage.removeItem('genesisSkipped');
    navigate('/health-plan', { replace: true });
  }, [navigate, spark]);

  const handleMintStep = useCallback(() => {
    setSpark((prev) => prev - 80);
    setTimeout(() => {
      awardSpark(130);
      setTimeout(() => setStep(6), 600); // Now 6 steps total + complete
    }, 100);
  }, [awardSpark]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0e0e1a 0%, #151526 50%, #010d07 100%)' }} />
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(41, 181, 181,0.15) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pt-14 pb-4">
        {step > 0 && step < 6 ? (
          <StepProgress current={step - 1} total={5} />
        ) : (
          <div />
        )}
        {step > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <SparkCounter count={spark} prevCount={prevSparkRef.current} />
          </motion.div>
        )}
      </div>

      <SparkReward
        amount={pendingReward}
        visible={rewardVisible}
        onDone={() => setRewardVisible(false)}
      />

      <div className="absolute inset-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <WelcomeGate key="welcome" onNext={() => setStep(1)} onSkip={handleSkipAll} />
          )}

          {step === 1 && (
            <ActivateDID key="activate" onNext={() => handleStepComplete(1)} />
          )}

          {step === 2 && (
            <ConnectHealth key="connect" onNext={() => handleStepComplete(2)} onSkip={() => handleStepComplete(2)} />
          )}

          {step === 3 && (
            <HealthProfile key="profile" onNext={() => handleStepComplete(3)} />
          )}

          {step === 4 && (
            <AIAssessment key="assessment" onNext={() => handleStepComplete(4)} />
          )}

          {step === 5 && (
            <FirstMint key="mint" sparkBalance={spark} onNext={handleMintStep} />
          )}

          {step === 6 && (
            <GenesisComplete key="complete" onFinish={handleFinish} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
