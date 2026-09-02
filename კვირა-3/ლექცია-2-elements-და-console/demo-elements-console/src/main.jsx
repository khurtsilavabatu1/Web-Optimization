import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

// Expose global appState for console exercises
window.appState = {
  users: [
    {
      id: 1,
      name: 'ნინო',
      email: 'nino@example.com',
      role: 'დეველოპერი',
      active: true,
      settings: { theme: 'dark', language: 'ka', notifications: true }
    },
    {
      id: 2,
      name: 'გიორგი',
      email: 'giorgi@example.com',
      role: 'დიზაინერი',
      active: true,
      settings: { theme: 'light', language: 'ka', notifications: false }
    },
    {
      id: 3,
      name: 'მარიამი',
      email: 'mariam@example.com',
      role: 'მენეჯერი',
      active: false,
      settings: { theme: 'dark', language: 'en', notifications: true }
    },
  ],
  tasks: [
    { id: 1, title: 'Code Review', status: 'done', priority: 'high', assignee: 'ნინო' },
    { id: 2, title: 'Design Mockups', status: 'in-progress', priority: 'medium', assignee: 'გიორგი' },
    { id: 3, title: 'Sprint Planning', status: 'pending', priority: 'high', assignee: 'მარიამი' },
    { id: 4, title: 'Bug Fixes', status: 'done', priority: 'low', assignee: 'ნინო' },
    { id: 5, title: 'Performance Testing', status: 'in-progress', priority: 'high', assignee: 'ნინო' },
  ],
  settings: {
    appName: 'DevTools Playground',
    version: '2.0.0',
    features: {
      darkMode: true,
      analytics: false,
      experimental: true
    },
    limits: {
      maxUsers: 100,
      maxTasks: 500,
      sessionTimeout: 3600
    }
  },
  stats: {
    totalUsers: 3,
    activeUsers: 2,
    completedTasks: 2,
    pendingTasks: 3
  }
};

// Expose helper functions for console practice
window.helpers = {
  greet: (name) => `გამარჯობა, ${name}!`,

  calculateTaskStats: () => {
    const tasks = window.appState.tasks;
    return {
      total: tasks.length,
      done: tasks.filter(t => t.status === 'done').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      pending: tasks.filter(t => t.status === 'pending').length
    };
  },

  getActiveUsers: () => {
    return window.appState.users.filter(u => u.active);
  },

  getUserByEmail: (email) => {
    return window.appState.users.find(u => u.email === email);
  }
};

console.log('%c🎯 DevTools Playground — React Edition', 'color: #4a6cf7; font-size: 20px; font-weight: bold;');
console.log('%c📚 სავარჯიშო გვერდი Elements და Console პანელების შესასწავლად', 'color: #666; font-size: 14px;');
console.log('');
console.log('%cConsole-ში ხელმისაწვდომი ობიექტები:', 'font-weight: bold; color: #00b894;');
console.log('  • window.appState — აპლიკაციის მდგომარეობა (users, tasks, settings, stats)');
console.log('  • window.helpers — დამხმარე ფუნქციები');
console.log('');
console.log('%cსცადეთ:', 'font-weight: bold; color: #fdcb6e;');
console.log('  console.table(window.appState.users)');
console.log('  console.table(window.appState.tasks)');
console.log('  window.helpers.calculateTaskStats()');
console.log('');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
