import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/utils/LanguageContext';

/**
 * AI Consultation Page
 * A highly interactive chat-based healthcare assistant.
 * Integrates 6 core actions directly into the chat workflow.
 */

export default function AIConsultationPage() {
  const { t } = useLanguage();

  const QUICK_ACTIONS = [
    { id: 'checkin', icon: 'check_circle', label: t('quickActions.healthCheckin'), spark: '+15 SPARK', color: 'bg-primary', text: t('ai.checkinText') },
    { id: 'upload', icon: 'photo_camera', label: t('quickActions.uploadReport'), spark: '+100-200 SPARK', color: 'bg-[#006b3f]', text: t('ai.uploadText') },
    { id: 'data', icon: 'edit_note', label: t('quickActions.recordData'), spark: '+5-10 SPARK', color: 'bg-slate-700', text: t('ai.dataText') },
    { id: 'diet', icon: 'nutrition', label: t('quickActions.recordDiet'), spark: '+5-10 SPARK', color: 'bg-[#2e7d32]', text: t('ai.dietText') },
    { id: 'meds', icon: 'medication', label: t('quickActions.medicationLog'), spark: '+10 SPARK', color: 'bg-[#1b5e20]', text: t('ai.medsText') },
    { id: 'survey', icon: 'assignment', label: t('quickActions.fillQuestionnaire'), spark: t('quickActions.pending'), color: 'bg-[#43a047]', text: t('ai.surveyText') },
  ];

  const INITIAL_MESSAGES = [
    {
      id: 1,
      role: 'ai',
      content: t('ai.greeting'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 2,
      role: 'ai',
      content: t('ai.intro'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ];

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isActionsExpanded, setIsActionsExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulated AI Response logic
    setTimeout(() => {
      let aiResponseContent = t('ai.respDefault');
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('report') || lowerText.includes('interpret') || lowerText.includes('解读') || lowerText.includes('报告')) {
        aiResponseContent = t('ai.respUpload');
      } else if (lowerText.includes('check-in') || lowerText.includes('feeling') || lowerText.includes('打卡') || lowerText.includes('健康')) {
        aiResponseContent = t('ai.respCheckin');
      } else if (lowerText.includes('data') || lowerText.includes('blood') || lowerText.includes('血压') || lowerText.includes('血糖')) {
        aiResponseContent = t('ai.respData');
      } else if (lowerText.includes('diet') || lowerText.includes('meal') || lowerText.includes('饮食') || lowerText.includes('记录')) {
        aiResponseContent = t('ai.respDiet');
      }

      const newAiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: aiResponseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ 
        type: 'tween', 
        ease: 'easeInOut',
        duration: 0.3 
      }}
      className="fixed inset-0 z-[60] bg-background flex flex-col overflow-hidden"
    >
      {/* 沉浸式关闭按钮 / Immersive Close Button */}
      <button 
        onClick={() => navigate(-1)}
        title={t('ai.closeTitle')}
        aria-label={t('ai.closeLabel')}
        className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary active:scale-90 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Chat Messages Area: Starts from absolute top for full immersion */}
      <main className={`flex-1 overflow-y-auto px-6 pt-6 ${isActionsExpanded ? 'pb-[320px]' : 'pb-[100px]'} space-y-6 z-10 scroll-smooth custom-scrollbar transition-all duration-300`}>
        {/* Top Spacer: Providing standard breathing room at the top */}
        <div className="h-24 flex-shrink-0" />
        
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm relative group ${
              msg.role === 'ai' 
                ? 'bg-white border border-primary/5 text-on-surface rounded-tl-none' 
                : 'vitality-gradient text-white rounded-tr-none shadow-md shadow-primary/20'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
              <span className={`text-[9px] mt-2 block opacity-40 font-bold ${msg.role === 'ai' ? 'text-on-surface-variant' : 'text-white'}`}>
                {msg.timestamp}
              </span>
              
              {/* Optional UI Elements for AI execution */}
              {msg.role === 'ai' && (msg.content.includes(t('ai.respUpload')) || msg.content.includes('upload your report') || msg.content.includes('上传')) && (
                <div className="mt-4 p-4 border-2 border-dashed border-primary/20 rounded-xl bg-primary/5 flex flex-col items-center">
                   <span className="material-symbols-outlined text-primary text-3xl mb-2">cloud_upload</span>
                   <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{t('ai.tapToUpload')}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-primary/5 flex gap-1">
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Area: Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-xl border-t border-on-surface/5 px-4 pt-1 pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        {/* Enhanced Toggle Handle */}
        <div className="flex justify-center -mt-4 mb-1">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsActionsExpanded(!isActionsExpanded)}
            className="w-8 h-8 bg-surface border border-on-surface/5 rounded-full flex items-center justify-center shadow-md text-primary active:bg-surface-container transition-colors"
          >
            <motion.span 
              animate={{ rotate: isActionsExpanded ? 0 : 180 }}
              className="material-symbols-outlined text-xl font-bold"
            >
              keyboard_arrow_down
            </motion.span>
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {isActionsExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 8 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              {/* Quick Actions Integration: 2-Row Grid Layout */}
              <div className="grid grid-cols-3 gap-y-4 gap-x-2 px-2 pt-4">
                {QUICK_ACTIONS.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(action.text)}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center shadow-lg group-hover:brightness-110 transition-all`}>
                      <span className="material-symbols-outlined text-white text-xl" style={{fontVariationSettings: '"FILL" 1'}}>{action.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tight text-center leading-tight px-1 group-hover:text-primary transition-colors">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('ai.inputPlaceholder')}
            className="w-full bg-surface-container-high/50 border border-on-surface/5 rounded-2xl px-5 py-3.5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner"
          />
          <button
            onClick={() => handleSend()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 vitality-gradient rounded-xl flex items-center justify-center text-white shadow-md active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>

      {/* Dynamic Background: Moved to bottom of stack to avoid layout interference */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full blur-[120px] opacity-10" />
      </div>
    </motion.div>
  );
}
