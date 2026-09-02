import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ArticleGrid from './components/ArticleGrid'
import Sidebar from './components/Sidebar'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ViewportInfo from './components/ViewportInfo'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />

      <main className="main-content">
        <div className="content-wrapper">
          <ArticleGrid />
          <Sidebar />
        </div>
      </main>

      <Newsletter />
      <Footer />
      <ViewportInfo />

      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="დაბრუნება ზევით"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default App
