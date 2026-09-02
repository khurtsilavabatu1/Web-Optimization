import React from 'react'

function CodeComparison({ modern, transpiled, title }) {
  return (
    <div className="code-comparison">
      {title && <h4 className="comparison-title">{title}</h4>}
      <div className="code-panels">
        <div className="code-panel">
          <div className="panel-header modern">თანამედროვე (ES2015+)</div>
          <pre className="code-content">{modern}</pre>
        </div>
        <div className="code-panel">
          <div className="panel-header transpiled">ტრანსპილირებული (ES5)</div>
          <pre className="code-content">{transpiled}</pre>
        </div>
      </div>
    </div>
  )
}

export default CodeComparison
