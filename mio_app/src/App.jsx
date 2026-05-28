import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import ResearchPage from './pages/profile/MyNFTs';
import ShieldLayout from './pages/shield/ShieldLayout';
import HealthPlanPage from './pages/health/HealthPlanPage';
import HealthScorePage from './pages/health/HealthScorePage';
import HealthRiskFactorsPage from './pages/health/HealthRiskFactorsPage';
import ProfilePage from './pages/profile/ProfilePage';
import Settings from './pages/profile/Settings';
import PrivacyControl from './pages/profile/PrivacyControl';
import AIConsultationPage from './pages/AIConsultationPage';
import AssetCompletenessPage from './pages/health/AssetCompletenessPage';
import DigitalIdentityPage from './pages/profile/DigitalIdentityPage';
import MintActionPage from './pages/research/MintActionPage';
import CollectionPage from './pages/research/CollectionPage';
import SplashScreen from './pages/auth/SplashScreen';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Onboarding from './pages/auth/Onboarding';
import GenesisJourney from './pages/genesis/GenesisJourney';
import { DemoStateProvider } from './components/utils/DemoStateContext';

export default function App() {
  return (
    <DemoStateProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Auth routes — no bottom nav */}
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/genesis" element={<GenesisJourney />} />

          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/collection" element={<CollectionPage />} />
            <Route path="/mint/:packId" element={<MintActionPage />} />
            <Route path="/shield/challenges" element={<Navigate to="/health-plan?focus=institution" replace />} />
            <Route path="/shield/*" element={<ShieldLayout />} />
            <Route path="/health-plan" element={<HealthPlanPage />} />
            <Route path="/health-score" element={<HealthScorePage />} />
            <Route path="/asset-completeness" element={<AssetCompletenessPage />} />
            <Route path="/health-risk-factors" element={<HealthRiskFactorsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/settings" element={<Settings />} />
            <Route path="/profile/privacy" element={<PrivacyControl />} />
            <Route path="/profile/did" element={<DigitalIdentityPage />} />
            <Route path="/profile/nfts" element={<Navigate to="/research" replace />} />
            <Route path="/profile/flame-shield" element={<Navigate to="/shield" replace />} />
            <Route path="/health/*" element={<Navigate to="/research" replace />} />
            <Route path="/social/*" element={<Navigate to="/shield" replace />} />
            <Route path="/ai-consultation" element={<AIConsultationPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoStateProvider>
  );
}
