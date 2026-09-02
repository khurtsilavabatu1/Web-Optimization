import { useState } from 'react'
import './ContainerQueryDemo.css'

export default function ContainerQueryDemo({ useModern }) {
  const [containerWidth, setContainerWidth] = useState(600)

  return (
    <div className="demo-block">
      <h3 className="demo-title">Container Queries vs Media Queries</h3>
      <p className="demo-description">
        {useModern
          ? "Container Queries: ელემენტი რეაგირებს მშობელი კონტეინერის ზომაზე"
          : "Media Queries: ელემენტი რეაგირებს ეკრანის ზომაზე (viewport)"}
      </p>

      <div className="demo-controls">
        <label>კონტეინერის სიგანე: {containerWidth}px</label>
        <input
          type="range"
          min="300"
          max="800"
          value={containerWidth}
          onChange={(e) => setContainerWidth(Number(e.target.value))}
        />
      </div>

      <div
        className={`container-demo ${useModern ? 'modern' : 'fallback'}`}
        style={{ width: `${containerWidth}px` }}
      >
        <div className="demo-card">
          <div className="demo-card-icon">📊</div>
          <h4>სტატისტიკა</h4>
          <p>ლაიოუთი იცვლება კონტეინერის ზომის მიხედვით</p>
        </div>
      </div>

      <div className="demo-explanation">
        <div className="explanation-item">
          <strong>თანამედროვე:</strong>
          <code>@container (min-width: 500px)</code>
        </div>
        <div className="explanation-item">
          <strong>Fallback:</strong>
          <code>@media (min-width: 500px)</code>
        </div>
      </div>
    </div>
  )
}
