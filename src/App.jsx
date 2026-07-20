import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InteractiveGlobe from './components/InteractiveGlobe';
import ErrorBoundary from './components/ErrorBoundary';
import CookieBanner from './components/CookieBanner';
import CookiesPage from './pages/CookiesPage';

function GlobePage() {
  return (
    <>
      <div className="app-shell">
        <ErrorBoundary
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-black">
              <div className="text-center text-neutral-400 text-sm">
                Globe failed to initialise — please refresh.
              </div>
            </div>
          }
        >
          <InteractiveGlobe />
        </ErrorBoundary>
      </div>
      <CookieBanner />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
