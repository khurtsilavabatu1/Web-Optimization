import React, { useState } from 'react'
import RunButton from './RunButton'

function PolyfillCard({ name, implementation, example, nativeSupport }) {
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setOutput('')

    setTimeout(() => {
      try {
        const result = example()
        setOutput(result)
      } catch (error) {
        setOutput(`Error: ${error.message}`)
      }
      setIsRunning(false)
    }, 100)
  }

  return (
    <div className="polyfill-card">
      <div className="polyfill-header">
        <h4>{name}</h4>
        <span className={`support-badge ${nativeSupport ? 'supported' : 'not-supported'}`}>
          {nativeSupport ? 'Native Support' : 'Needs Polyfill'}
        </span>
      </div>

      <div className="polyfill-implementation">
        <div className="implementation-label">Polyfill Implementation:</div>
        <pre className="code-content">{implementation}</pre>
      </div>

      <div className="polyfill-example">
        <RunButton onClick={handleRun} disabled={isRunning} />
        {output && (
          <div className="output-box">
            <div className="output-label">შედეგი:</div>
            <pre className="output-content">{output}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default PolyfillCard
