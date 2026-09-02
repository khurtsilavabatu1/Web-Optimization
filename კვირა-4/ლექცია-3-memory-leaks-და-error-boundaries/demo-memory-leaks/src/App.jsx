import { useState } from 'react';
import IntervalLeak, { intervalTracker } from './components/IntervalLeak';
import EventListenerLeak, { listenerTracker } from './components/EventListenerLeak';
import DetachedDomLeak, { domNodeTracker } from './components/DetachedDomLeak';
import GrowingDataLeak, { dataTracker } from './components/GrowingDataLeak';
import ErrorBoundary from './components/ErrorBoundary';
import { CrashableComponent, SafeComponent } from './components/CrashButton';
import ExercisePanel from './components/ExercisePanel';
import './App.css';

function App() {
  const [totalLeaks, setTotalLeaks] = useState(0);

  const updateLeakStats = () => {
    const total =
      intervalTracker.count +
      listenerTracker.count +
      domNodeTracker.nodes.length +
      dataTracker.data.length;
    setTotalLeaks(total);
  };

  const resetAllLeaks = () => {
    intervalTracker.clearAll();
    listenerTracker.clearAll();
    domNodeTracker.clearAll();
    dataTracker.clearAll();
    setTotalLeaks(0);
    console.log('%c🧹 ყველა leak გასუფთავდა!', 'color: #27ae60; font-weight: bold; font-size: 16px;');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Memory Leaks & Error Boundaries</h1>
        <p className="app-subtitle">
          კვირა 4 / ლექცია 3 — მეხსიერების გაჟონვა და შეცდომების საზღვრები
        </p>
      </header>

      <main className="app-main">
        {/* Memory Leaks Section */}
        <section className="section section-leaks">
          <div className="section-header">
            <h2>Memory Leaks (მეხსიერების გაჟონვა)</h2>
            <div className="leak-counter-badge">
              <span className="leak-counter-label">Total Leaks:</span>
              <span className={`leak-counter-value ${totalLeaks > 0 ? 'danger' : ''}`}>
                {totalLeaks}
              </span>
            </div>
          </div>

          <div className="instructions-bar">
            გახსენით Performance Monitor (<kbd>Cmd+Shift+P</kbd> → "Performance Monitor")
            — JS Event Listeners-ის და JS Heap Size-ის სანახავად
          </div>

          <div className="leak-demos-grid">
            <IntervalLeak onUpdate={updateLeakStats} />
            <EventListenerLeak onUpdate={updateLeakStats} />
            <DetachedDomLeak onUpdate={updateLeakStats} />
            <GrowingDataLeak onUpdate={updateLeakStats} />
          </div>

          <div className="leak-controls">
            <button className="btn btn-danger-large" onClick={resetAllLeaks}>
              🧹 Reset All Leaks
            </button>
          </div>
        </section>

        {/* Error Boundaries Section */}
        <section className="section section-errors">
          <div className="section-header">
            <h2>Error Boundaries (შეცდომების საზღვრები)</h2>
          </div>

          <div className="instructions-bar">
            Error Boundary იჭერს render-ის შეცდომებს და ანაცვლებს fallback UI-ით.
            მეზობელი კომპონენტები აგრძელებენ მუშაობას.
          </div>

          <div className="error-demo-layout">
            <div className="error-demo-card">
              <h3 className="error-demo-title">იზოლირებული Boundary</h3>
              <p className="error-demo-desc">
                CrashableComponent-ს აქვს საკუთარი ErrorBoundary — crash-ი არ ვრცელდება.
              </p>
              <ErrorBoundary boundaryName="CrashableBoundary" showStack={true}>
                <CrashableComponent />
              </ErrorBoundary>
            </div>

            <div className="error-demo-card">
              <h3 className="error-demo-title">SafeComponent</h3>
              <p className="error-demo-desc">
                ცალკე Boundary-ში — მეზობლის crash-ს არ შეეხება.
              </p>
              <ErrorBoundary boundaryName="SafeBoundary" showStack={false}>
                <SafeComponent />
              </ErrorBoundary>
            </div>
          </div>

          <div className="error-limitations">
            <h3>Error Boundary-ის შეზღუდვები</h3>
            <table className="limitations-table">
              <thead>
                <tr>
                  <th>სიტუაცია</th>
                  <th>იჭერს?</th>
                  <th>ალტერნატივა</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Render-ის შეცდომა</td>
                  <td className="status-yes">იჭერს</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td>Event handler-ის შეცდომა</td>
                  <td className="status-no">ვერ იჭერს</td>
                  <td>
                    <code>try/catch</code>
                  </td>
                </tr>
                <tr>
                  <td>Async კოდი (setTimeout, fetch)</td>
                  <td className="status-no">ვერ იჭერს</td>
                  <td>
                    <code>try/catch</code>, <code>.catch()</code>
                  </td>
                </tr>
                <tr>
                  <td>Error Boundary-ის საკუთარი შეცდომა</td>
                  <td className="status-no">ვერ იჭერს</td>
                  <td>მშობელი Error Boundary</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Exercise Panel */}
        <section className="section section-exercises">
          <ExercisePanel />
        </section>
      </main>
    </div>
  );
}

export default App;
