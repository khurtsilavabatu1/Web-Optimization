import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

console.log('[main.jsx] Module loaded at:', performance.now().toFixed(1), 'ms');

// Analytics component loaded asynchronously (similar to async script)
const loadAnalytics = () => {
  import('./components/Analytics.jsx').then(({ default: Analytics }) => {
    console.log('[Analytics] Loaded asynchronously at:', performance.now().toFixed(1), 'ms');
    // Initialize analytics
    Analytics.init();
  });
};

// Load analytics after page is interactive (non-blocking)
if (document.readyState === 'complete') {
  loadAnalytics();
} else {
  window.addEventListener('load', loadAnalytics);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('[main.jsx] React render initiated at:', performance.now().toFixed(1), 'ms');
