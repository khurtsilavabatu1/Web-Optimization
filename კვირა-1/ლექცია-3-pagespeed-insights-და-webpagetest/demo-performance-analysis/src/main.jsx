/*
  ==========================================
  TechStore — არაოპტიმიზირებული React Entry Point
  ==========================================

  პრობლემები:
  1. No StrictMode — React-ის გაფრთხილებები არ ჩანს
  2. არ არის error boundary
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

// PROBLEM: არ არის StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
