import './FeatureDemo.css'

export default function FeatureDemo({ title, modern, fallback, description }) {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>

      <div className="feature-comparison">
        <div className="comparison-item modern">
          <div className="comparison-label">თანამედროვე</div>
          <code className="comparison-code">{modern}</code>
        </div>

        <div className="comparison-arrow">→</div>

        <div className="comparison-item fallback">
          <div className="comparison-label">Fallback</div>
          <code className="comparison-code">{fallback}</code>
        </div>
      </div>
    </div>
  )
}
