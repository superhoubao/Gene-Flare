import { NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import TopAppBar from '../../components/layout/TopAppBar';
import avatarBoy from '../../assets/avatar_boy_v2.png';
import FlameShield from '../profile/FlameShield';
import ShieldServices from './ShieldServices';
import { useLanguage } from '../../components/utils/LanguageContext';

export default function ShieldLayout() {
  const location = useLocation();
  const { t } = useLanguage();

  const tabs = [
    { path: '/shield', label: t('shieldLayout.home'), end: true },
    { path: '/shield/services', label: t('shieldLayout.services') },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-on-surface">
      <TopAppBar 
        avatarSrc={avatarBoy} 
        title={t('nav.shield')}
      />
      <div className="px-6 pb-2 pt-3">
        <div className="mb-2">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/45">{t('shieldLayout.tabsLabel')}</p>
        </div>
        <nav className="runway-tabs flex w-full gap-2 rounded-[24px] bg-surface-container-low/50 p-1.5 backdrop-blur-md">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.end}
              className={({ isActive }) =>
                `flex-1 text-center py-3 text-[13px] font-bold whitespace-nowrap rounded-[20px] transition-all duration-300 ${
                  isActive || location.pathname === tab.path
                    ? 'bg-primary text-white shadow-[0_8px_16px_-6px_rgba(0,80,46,0.4)]'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-6 pb-32 pt-6">
        <Routes>
          <Route index element={<FlameShield />} />
          <Route path="challenges" element={<Navigate to="/health-plan?focus=institution" replace />} />
          <Route path="services" element={<ShieldServices />} />
        </Routes>
      </div>
    </div>
  );
}
