import { useState } from 'react'
import CodeExample from './CodeExample'

function FeatureCard({ feature }) {
  const [showCode, setShowCode] = useState(false)

  return (
    <article className={`feature-card ${feature.supported ? 'supported' : 'unsupported'}`}>
      <div className="feature-header">
        <h4>{feature.name}</h4>
        <span className={`feature-badge ${feature.supported ? 'supported' : 'unsupported'}`}>
          <span className="icon">{feature.supported ? '✓' : '✗'}</span>
          <span>{feature.supported ? 'მხარდაჭერილი' : 'არ მუშაობს'}</span>
        </span>
      </div>
      <p className="feature-description">{feature.description}</p>
      <div className="feature-actions">
        <button
          className={`toggle-code-btn ${showCode ? 'active' : ''}`}
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? 'კოდის დამალვა' : 'კოდის ნახვა'}
        </button>
      </div>
      {showCode && <CodeExample code={feature.codeExample} />}
    </article>
  )
}

export default FeatureCard
