import InteractiveGlobe from './components/InteractiveGlobe';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden touch-none">
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
  );
}
