import { useState, useEffect } from 'react'
import './SupportDetector.css'

export default function SupportDetector() {
  const [support, setSupport] = useState({})

  useEffect(() => {
    const checkSupport = () => {
      const features = {
        'Container Queries': CSS.supports('container-type: inline-size'),
        'color-mix()': CSS.supports('color', 'color-mix(in srgb, red, blue)'),
        'CSS Nesting': CSS.supports('selector(&)'),
        '@layer': CSS.supports('@layer') || typeof CSSLayerBlockRule !== 'undefined',
        ':has()': CSS.supports('selector(:has(p))'),
        'text-wrap: balance': CSS.supports('text-wrap', 'balance'),
        'dvh unit': CSS.supports('height', '100dvh'),
        'backdrop-filter': CSS.supports('backdrop-filter', 'blur(10px)') ||
                          CSS.supports('-webkit-backdrop-filter', 'blur(10px)'),
        'gap in flexbox': CSS.supports('gap', '1rem') &&
                          CSS.supports('display', 'flex'),
        'scrollbar-width': CSS.supports('scrollbar-width', 'thin'),
      }
      setSupport(features)
    }

    checkSupport()
  }, [])

  return (
    <div className="support-detector">
      <div className="support-grid">
        {Object.entries(support).map(([feature, isSupported]) => (
          <div key={feature} className={`support-item ${isSupported ? 'supported' : 'not-supported'}`}>
            <div className="support-icon">
              {isSupported ? '✓' : '✗'}
            </div>
            <div className="support-info">
              <div className="support-feature">{feature}</div>
              <div className="support-status">
                {isSupported ? 'მხარდაჭერილია' : 'არ არის მხარდაჭერილი'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="support-summary">
        <h4>შეჯამება</h4>
        <p>
          თქვენი ბრაუზერი უჭერს მხარს <strong>{Object.values(support).filter(Boolean).length}</strong> ფუნქციას{' '}
          <strong>{Object.keys(support).length}</strong>-დან
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(Object.values(support).filter(Boolean).length / Object.keys(support).length * 100) || 0}%`
            }}
          ></div>
        </div>
      </div>

      <div className="support-note">
        <strong>შენიშვნა:</strong> CSS.supports() API-ით შეამოწმეთ ბრაუზერის მხარდაჭერა runtime-ში.
        ეს საშუალებას გაძლევთ დაწეროთ progressive enhancement კოდი.
      </div>
    </div>
  )
}
