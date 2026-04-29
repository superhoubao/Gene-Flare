import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

export default function TopAppBar({ 
  title = null, 
  showBack = false, 
  rightIcon = null, 
  avatarSrc = null,
  onRightClick = null,
  onBack = null,
  transparent = false
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const resolvedTitle = title ?? t('topBar.defaultTitle');
  
  const titleClass = transparent ? "text-white" : "text-primary";

  const titleNode = typeof title === 'string'
    ? (
      <div className="flex items-center">
        <span className={`font-display text-xl font-black tracking-[-0.02em] leading-none ${titleClass}`}>{resolvedTitle}</span>
      </div>
    )
    : (title ?? (
      <div className="flex items-center">
        <span className={`font-display text-xl font-black tracking-[-0.02em] leading-none ${titleClass}`}>{resolvedTitle}</span>
      </div>
    ));

  return (
    <header className={transparent ? "absolute top-0 left-0 right-0 z-50 bg-transparent border-none" : "signal-command-bar"}>
      <div className="mx-auto flex h-[60px] w-full max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack || (() => navigate(-1))}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${transparent ? 'bg-white/20 backdrop-blur-md' : 'bg-white/55 shadow-[0_12px_24px_-18px_rgba(0,80,46,0.3)] hover:bg-surface-container-low'}`}
            >
              <span className={`material-symbols-outlined ${transparent ? 'text-white' : 'text-on-surface'}`}>arrow_back</span>
            </button>
          ) : avatarSrc ? (
            <img
              alt="User Avatar"
              className="h-10 w-10 rounded-2xl border border-white/10 object-cover shadow-[0_12px_24px_-18px_rgba(0,0,0,0.3)]"
              src={avatarSrc}
            />
          ) : null}
          {titleNode}
        </div>
        {rightIcon ? (
          <button 
            onClick={onRightClick}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${transparent ? 'bg-white/20 backdrop-blur-md' : 'bg-white/55 shadow-[0_12px_24px_-18px_rgba(0,80,46,0.3)]'}`}
          >
            <span className={`material-symbols-outlined ${transparent ? 'text-white' : 'text-on-surface'}`}>{rightIcon}</span>
          </button>
        ) : (
          <div className="h-11 w-11" />
        )}
      </div>
    </header>
  );
}
