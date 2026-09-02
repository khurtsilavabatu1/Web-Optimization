import { useState, lazy, Suspense } from 'react'
import Hero from './components/Hero'
import ArticleGrid from './components/ArticleGrid'
import Sidebar from './components/Sidebar'
import LoadingComparison from './components/LoadingComparison'

// OPTIMIZATION: React.lazy() for code splitting
// These components are loaded on-demand, not in the initial bundle
const ChatWidget = lazy(() => {
  console.log('[ChatWidget] Starting lazy load at:', performance.now().toFixed(1), 'ms');
  return import('./components/ChatWidget.jsx');
});

const HeavyModule = lazy(() => {
  console.log('[HeavyModule] Starting lazy load at:', performance.now().toFixed(1), 'ms');
  return import('./components/HeavyModule.jsx');
});

function App() {
  const [showChat, setShowChat] = useState(false);
  const [showHeavyModule, setShowHeavyModule] = useState(false);

  console.log('[App] Component rendered at:', performance.now().toFixed(1), 'ms');

  return (
    <div className="app">
      {/* Banner explaining the optimization demo */}
      <div className="demo-banner">
        React + Vite — Code Splitting, Lazy Loading, და Resource Hints დემო
      </div>

      {/* Navigation */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          News<span>Portal</span>
        </a>
        <ul className="nav-links">
          <li><a href="#news">სიახლეები</a></li>
          <li><a href="#tech">ტექნოლოგია</a></li>
          <li><a href="#comparison">შედარება</a></li>
        </ul>
      </nav>

      {/* Hero Section (Above the fold - loads immediately) */}
      <Hero />

      {/* Main Content */}
      <div className="main-content">
        <div className="content-area">
          {/* Article Grid */}
          <ArticleGrid />

          {/* Loading Comparison Section */}
          <section id="comparison">
            <LoadingComparison />
          </section>

          {/* Heavy Module - Lazy loaded when scrolled into view */}
          <section className="heavy-module-section">
            <h2 className="section-title">მძიმე მოდული (Intersection Observer)</h2>
            <p style={{ marginBottom: '20px', color: '#94a3b8' }}>
              ეს კომპონენტი იტვირთება მხოლოდ მაშინ, როცა viewport-ში ხვდება (Intersection Observer API)
            </p>

            {!showHeavyModule && (
              <button
                className="load-module-btn"
                onClick={() => setShowHeavyModule(true)}
              >
                ჩატვირთე მძიმე მოდული
              </button>
            )}

            {showHeavyModule && (
              <Suspense fallback={<div className="loading-spinner">იტვირთება მძიმე მოდული...</div>}>
                <HeavyModule />
              </Suspense>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>NewsPortal &copy; 2024 — CSS/JS Loading Optimization Demo</p>
        <p style={{ fontSize: '0.85rem', marginTop: '8px', color: '#64748b' }}>
          Built with React + Vite | Code Splitting & Lazy Loading
        </p>
      </footer>

      {/* Chat Button - Triggers dynamic import */}
      <button
        className="chat-trigger-btn"
        onClick={() => setShowChat(true)}
        title="ჩატი (lazy loaded)"
      >
        💬
      </button>

      {/* Chat Widget - Loaded only when user clicks the button */}
      {showChat && (
        <Suspense fallback={<div className="chat-loading">იტვირთება ჩატი...</div>}>
          <ChatWidget onClose={() => setShowChat(false)} />
        </Suspense>
      )}
    </div>
  )
}

export default App
