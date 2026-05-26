import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import QuickActions from '../../pages/QuickActions';
import AIConsultationFAB from './AIConsultationFAB';

export default function AppLayout() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const location = useLocation();
  const topLevelPaths = ['/', '/research', '/shield', '/profile'];
  const sectionPathsWithDock = ['/shield/services'];
  const isMainRoute = topLevelPaths.includes(location.pathname) || sectionPathsWithDock.includes(location.pathname);
  const hideBottomNav = location.pathname === '/ai-consultation' || !isMainRoute;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Outlet />
      
      {!hideBottomNav && (
        <>
          <BottomNavBar />
          <AIConsultationFAB />
        </>
      )}

      {/* 弹窗抽屉的基于 Framer Motion 动画 */}
      <QuickActions isOpen={showQuickActions} onClose={() => setShowQuickActions(false)} />
    </div>
  );
}
