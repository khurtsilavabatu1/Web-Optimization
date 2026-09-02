import { useState } from 'react'
import './ColorMixDemo.css'

export default function ColorMixDemo({ useModern }) {
  const [color1, setColor1] = useState('#3b82f6')
  const [color2, setColor2] = useState('#8b5cf6')
  const [percentage, setPercentage] = useState(50)

  // Precomputed fallback color mixing
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const mixColors = (hex1, hex2, percent) => {
    const rgb1 = hexToRgb(hex1)
    const rgb2 = hexToRgb(hex2)
    const p = percent / 100
    const r = Math.round(rgb1.r * p + rgb2.r * (1 - p))
    const g = Math.round(rgb1.g * p + rgb2.g * (1 - p))
    const b = Math.round(rgb1.b * p + rgb2.b * (1 - p))
    return `rgb(${r}, ${g}, ${b})`
  }

  const fallbackColor = mixColors(color1, color2, percentage)

  return (
    <div className="demo-block">
      <h3 className="demo-title">color-mix() vs Precomputed Colors</h3>
      <p className="demo-description">
        {useModern
          ? "color-mix(): CSS-ში ფერების დინამიური შერევა"
          : "Fallback: წინასწარ გამოთვლილი ფერები JavaScript-ით"}
      </p>

      <div className="demo-controls">
        <div className="color-input">
          <label>ფერი 1:</label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
          />
          <span>{color1}</span>
        </div>
        <div className="color-input">
          <label>ფერი 2:</label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
          />
          <span>{color2}</span>
        </div>
        <div className="color-input">
          <label>პროპორცია: {percentage}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="color-preview">
        <div className="color-box" style={{ background: color1 }}>
          <span>ფერი 1</span>
        </div>
        <div className="color-mix-symbol">+</div>
        <div className="color-box" style={{ background: color2 }}>
          <span>ფერი 2</span>
        </div>
        <div className="color-mix-symbol">=</div>
        <div
          className="color-box mixed"
          style={{
            background: useModern
              ? `color-mix(in srgb, ${color1} ${percentage}%, ${color2})`
              : fallbackColor
          }}
        >
          <span>შერეული</span>
        </div>
      </div>

      <div className="demo-explanation">
        <div className="explanation-item">
          <strong>თანამედროვე:</strong>
          <code>color-mix(in srgb, {color1} {percentage}%, {color2})</code>
        </div>
        <div className="explanation-item">
          <strong>Fallback:</strong>
          <code>{fallbackColor}</code>
        </div>
      </div>
    </div>
  )
}
