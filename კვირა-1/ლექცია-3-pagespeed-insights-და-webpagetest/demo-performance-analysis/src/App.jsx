/*
  ==========================================
  TechStore — არაოპტიმიზირებული React აპლიკაცია
  ==========================================

  პრობლემები:
  1. LONG TASK — 2-second artificial delay in useEffect
  2. Heavy calculations on initial render
  3. No code splitting — all components loaded at once
  4. State updates cause full tree re-renders
  5. No React.memo, useMemo, or useCallback
  6. Inline styles computed on every render
  7. Event handlers recreated on every render
  8. Scroll listener without debounce
*/

import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Features from './components/Features'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

// PROBLEM: Heavy calculation function
function calculateScores() {
  console.time('calculateScores (Long Task)')
  let result = 0
  for (let i = 0; i < 8000000; i++) {
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i)
  }
  console.timeEnd('calculateScores (Long Task)')
  return result
}

function App() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [promoBanner, setPromoBanner] = useState(null)
  const [stats, setStats] = useState(null)

  // PROBLEM: Heavy calculation on every render (არ არის useMemo)
  const heavyComputation = calculateScores()

  // PROBLEM: 2-second artificial delay on mount (simulating slow initialization)
  useEffect(() => {
    console.log('Starting 2-second artificial delay...')
    setTimeout(() => {
      calculateScores() // Additional heavy calculation
      setIsLoading(false)
      console.log('Artificial delay complete')
    }, 2000)
  }, [])

  // PROBLEM: Dynamic content injection after delay (causes CLS)
  useEffect(() => {
    setTimeout(() => {
      setPromoBanner({
        text: 'სპეციალური შეთავაზება! ყველა პროდუქტზე 20% ფასდაკლება — მხოლოდ ამ კვირაში!'
      })
    }, 2500)

    setTimeout(() => {
      calculateScores()
      setStats({
        products: 200,
        avgPrice: 850,
        maxPrice: 2500,
        minPrice: 150
      })
    }, 1000)
  }, [])

  // PROBLEM: Scroll listener without debounce + forced reflow
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = Math.round((scrollY / docHeight) * 100)
      setScrollPercent(percent)

      // PROBLEM: Forced reflow — reading layout properties
      const cards = document.querySelectorAll('.product-card')
      cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        const h = card.offsetHeight
        card.style.opacity = rect.top < window.innerHeight ? '1' : '0.5'
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // PROBLEM: Continuous interval wasting CPU
  useEffect(() => {
    let counter = 0
    const interval = setInterval(() => {
      counter++
      const indicator = document.getElementById('scroll-indicator')
      if (indicator) {
        // Forced reflow
        indicator.style.left = indicator.offsetLeft + 'px'
        indicator.style.width = indicator.offsetWidth + 'px'
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    // PROBLEM: არ არის loading skeleton — empty screen-ი CLS-ს იწვევს
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#00ff88'
      }}>
        <div style={{ fontSize: '24px' }}>იტვირთება...</div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* PROBLEM: no semantic HTML — div instead of header */}
      <div className="top-bar">
        <div className="logo-text">TechStore</div>
        <div className="nav-area">
          <a href="#">მთავარი</a>
          <a href="#">პროდუქტები</a>
          <a href="#">ბრენდები</a>
          <a href="#">აქსესუარები</a>
          <a href="#">შეთავაზებები</a>
          <a href="#">კონტაქტი</a>
        </div>
        <div className="nav-icons">
          <a href="#"><i className="fas fa-search"></i></a>
          <a href="#"><i className="fas fa-shopping-cart"></i></a>
          <a href="#"><i className="fas fa-user"></i></a>
        </div>
      </div>

      <Hero />
      <Features />
      <ProductGrid />

      {/* PROBLEM: Dynamic banner injection (CLS) */}
      {promoBanner && (
        <div className="promo-banner">
          <strong>სპეციალური შეთავაზება!</strong><br />
          {promoBanner.text}
        </div>
      )}

      {/* PROBLEM: Stats injected dynamically (CLS) */}
      {stats && (
        <div className="stats-section">
          <h2 className="section-title">სტატისტიკა</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="number">{stats.products}</div>
              <div className="label">სულ პროდუქტი</div>
            </div>
            <div className="stat-card">
              <div className="number">₾{stats.avgPrice}</div>
              <div className="label">საშუალო ფასი</div>
            </div>
            <div className="stat-card">
              <div className="number">₾{stats.maxPrice}</div>
              <div className="label">მაქსიმალური</div>
            </div>
            <div className="stat-card">
              <div className="number">₾{stats.minPrice}</div>
              <div className="label">მინიმალური</div>
            </div>
          </div>
        </div>
      )}

      <Newsletter />
      <Footer />

      {/* PROBLEM: Scroll indicator with forced reflow */}
      <div className="scroll-indicator" id="scroll-indicator">
        <span id="scroll-percent">{scrollPercent}</span>%
      </div>
    </div>
  )
}

export default App
