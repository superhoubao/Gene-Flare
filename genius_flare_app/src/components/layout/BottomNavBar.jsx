import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

export default function BottomNavBar() {
  const location = useLocation();
  const { t } = useLanguage();

  const tabs = [
    { path: '/', icon: 'home', label: t('nav.home') },
    { path: '/research', icon: 'neurology', label: t('nav.research') },
    { path: '/shield', icon: 'shield', label: t('nav.shield') },
    { path: '/profile', icon: 'person', label: t('nav.me') },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-[420px] -translate-x-1/2 items-center justify-around rounded-[30px] px-3 pb-3 pt-3 orbital-dock">
      {tabs.map((tab, i) => {
        const active = isActive(tab.path);

        return (
          <NavLink
            key={i}
            to={tab.path}
            className={`flex min-w-[72px] flex-col items-center justify-center rounded-[22px] px-3 py-2.5 active:scale-90 transition-all duration-400 ease-[var(--ease-out-expo,cubic-bezier(0.16,1,0.3,1))] ${
              active
                ? 'bg-primary/12 text-primary shadow-[0_14px_30px_-18px_rgba(0,80,46,0.4)]'
                : 'text-on-surface-variant/40 hover:text-primary/60'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl transition-transform duration-300 ${active ? 'scale-110' : ''}`}
              style={active ? { fontVariationSettings: '"FILL" 1' } : {}}
            >
              {tab.icon}
            </span>
            <span className="mt-1 font-label text-[9px] font-black tracking-[0.22em] uppercase">
              {tab.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
