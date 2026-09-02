import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('%c User Dashboard - Sources & Network Practice ', 'background: #4f46e5; color: white; font-size: 14px; padding: 8px;');
console.log('ეს აპლიკაცია შექმნილია DevTools-ის Sources და Network panel-ების შესასწავლად.');
console.log('გახსენით DevTools და დააკვირდით API requests-ს Network tab-ში!');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
