import { useEffect, useState } from 'react'
import './HeavyModule.css'

// Simulates a heavy computation similar to the original heavy-library.js
function performHeavyComputation() {
  const startTime = performance.now();
  let result = 0;

  // Heavy computation
  for (let i = 0; i < 5000000; i++) {
    result += Math.sqrt(i) * Math.sin(i);
  }

  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);

  console.log('[HeavyModule] Computation completed:', result.toFixed(2), 'in', duration, 'ms');

  return { result, duration };
}

// This component is lazy-loaded when scrolled into view
function HeavyModule() {
  const [computationData, setComputationData] = useState(null);
  const [isComputing, setIsComputing] = useState(true);

  console.log('[HeavyModule] Component loaded at:', performance.now().toFixed(1), 'ms');

  useEffect(() => {
    // Perform computation when component mounts
    // Using requestIdleCallback for better performance (or setTimeout as fallback)
    const performComputation = () => {
      const data = performHeavyComputation();
      setComputationData(data);
      setIsComputing(false);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(performComputation);
    } else {
      setTimeout(performComputation, 0);
    }
  }, []);

  return (
    <div className="heavy-module">
      <div className="heavy-module-header">
        <h3>მძიმე გამოთვლების მოდული</h3>
        <span className="heavy-badge">Lazy Loaded</span>
      </div>

      {isComputing ? (
        <div className="computing-indicator">
          <div className="spinner"></div>
          <p>მიმდინარეობს გამოთვლები...</p>
        </div>
      ) : (
        <div className="computation-results">
          <div className="result-card">
            <div className="result-label">გამოთვლის შედეგი</div>
            <div className="result-value">{computationData?.result.toFixed(2)}</div>
          </div>
          <div className="result-card">
            <div className="result-label">დასრულების დრო</div>
            <div className="result-value">{computationData?.duration} ms</div>
          </div>
          <div className="result-card">
            <div className="result-label">ჩატვირთვის დრო</div>
            <div className="result-value">{performance.now().toFixed(0)} ms</div>
          </div>
        </div>
      )}

      <div className="heavy-module-info">
        <p>
          🎯 <strong>ოპტიმიზაცია:</strong> ეს მოდული იტვირთება მხოლოდ მაშინ, როცა მომხმარებელი
          ღილაკზე დააჭერს, რაც ამცირებს საწყისი bundle-ის ზომას.
        </p>
        <p>
          ⚡ გამოთვლები ასრულებს <code>requestIdleCallback</code>-ით, რათა არ დაბლოკოს მთავარი thread.
        </p>
      </div>

      <div className="utility-showcase">
        <h4>Utility Functions (ჩატვირთული lazy-ად)</h4>
        <div className="utility-grid">
          <div className="utility-item">formatPrice()</div>
          <div className="utility-item">formatDate()</div>
          <div className="utility-item">debounce()</div>
          <div className="utility-item">throttle()</div>
          <div className="utility-item">deepClone()</div>
          <div className="utility-item">generateId()</div>
        </div>
      </div>
    </div>
  )
}

export default HeavyModule
