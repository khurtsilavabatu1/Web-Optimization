import { useState, useEffect } from 'react'
import StyleToggle from './components/StyleToggle'
import FeatureDemo from './components/FeatureDemo'
import ContainerQueryDemo from './components/ContainerQueryDemo'
import ColorMixDemo from './components/ColorMixDemo'
import CssNestingDemo from './components/CssNestingDemo'
import SupportDetector from './components/SupportDetector'

function App() {
  const [useModern, setUseModern] = useState(true)

  useEffect(() => {
    // Toggle between modern.css and fallback.css
    const modernLink = document.getElementById('modern-css')
    const fallbackLink = document.getElementById('fallback-css')

    if (!modernLink || !fallbackLink) {
      // Create stylesheet links if they don't exist
      const modern = document.createElement('link')
      modern.id = 'modern-css'
      modern.rel = 'stylesheet'
      modern.href = '/src/modern.css'

      const fallback = document.createElement('link')
      fallback.id = 'fallback-css'
      fallback.rel = 'stylesheet'
      fallback.href = '/src/fallback.css'

      document.head.appendChild(modern)
      document.head.appendChild(fallback)
    }

    const modernStylesheet = document.getElementById('modern-css')
    const fallbackStylesheet = document.getElementById('fallback-css')

    if (useModern) {
      modernStylesheet.disabled = false
      fallbackStylesheet.disabled = true
    } else {
      modernStylesheet.disabled = true
      fallbackStylesheet.disabled = false
    }
  }, [useModern])

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <h1>CSS Compatibility Demo</h1>
          <p>
            თანამედროვე CSS ფუნქციები vs ძველი ბრაუზერების თავსებადობა
          </p>
          <StyleToggle useModern={useModern} onToggle={() => setUseModern(!useModern)} />
        </div>
      </header>

      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">WebOptimize</div>
          <ul className="nav-links">
            <li><a href="#features">ფუნქციები</a></li>
            <li><a href="#demos">დემო</a></li>
            <li><a href="#support">მხარდაჭერა</a></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <section className="section" id="features">
          <h2 className="section-title">CSS თვისებების შედარება</h2>
          <p className="section-subtitle">
            ქვემოთ მოცემულია თანამედროვე CSS ფუნქციები და მათი fallback ალტერნატივები
          </p>

          <div className="feature-grid">
            <FeatureDemo
              title="Container Queries"
              modern="@container (min-width: 400px)"
              fallback="@media (min-width: 400px)"
              description="კონტეინერის ზომაზე დაფუძნებული სტილები viewport-ის ნაცვლად"
            />
            <FeatureDemo
              title="color-mix()"
              modern="color-mix(in srgb, blue 50%, red)"
              fallback="Precomputed: #8000ff"
              description="ფერების დინამიური შერევა CSS-ში"
            />
            <FeatureDemo
              title="CSS Nesting"
              modern=".card { &:hover { ... } }"
              fallback=".card:hover { ... }"
              description="სელექტორების ჩადგმა Sass-ის მსგავსად"
            />
            <FeatureDemo
              title="@layer"
              modern="@layer base, components, utilities"
              fallback="Specificity management"
              description="CSS cascade-ის კონტროლი"
            />
            <FeatureDemo
              title=":has() Selector"
              modern=".card:has(img)"
              fallback="JavaScript class toggle"
              description="მშობელი ელემენტის სელექცია შვილის მიხედვით"
            />
            <FeatureDemo
              title="text-wrap: balance"
              modern="text-wrap: balance"
              fallback="Manual line breaks"
              description="ტექსტის ბალანსირებული გადატანა"
            />
          </div>
        </section>

        <section className="section demos-section" id="demos">
          <h2 className="section-title">ინტერაქტიული დემო</h2>

          <ContainerQueryDemo useModern={useModern} />
          <ColorMixDemo useModern={useModern} />
          <CssNestingDemo useModern={useModern} />
        </section>

        <section className="section" id="support">
          <h2 className="section-title">ბრაუზერის მხარდაჭერა</h2>
          <p className="section-subtitle">
            შეამოწმეთ თქვენი ბრაუზერის მხარდაჭერა თანამედროვე CSS ფუნქციებისთვის
          </p>
          <SupportDetector />
        </section>
      </main>

      <footer className="footer">
        <p>CSS Compatibility Demo — Vite + React</p>
        <p className="footer-mode">
          ამჟამინდელი რეჟიმი: <strong>{useModern ? 'თანამედროვე CSS' : 'Fallback CSS'}</strong>
        </p>
      </footer>
    </div>
  )
}

export default App
