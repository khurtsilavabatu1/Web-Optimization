import { useState, useEffect, useRef } from 'react';

// გლობალური ტრეკერი
const intervalTracker = {
  count: 0,
  ids: [],
  add(id) {
    this.count++;
    this.ids.push(id);
  },
  clearAll() {
    this.ids.forEach(id => clearInterval(id));
    this.ids = [];
    this.count = 0;
  }
};

export { intervalTracker };

export default function IntervalLeak({ onUpdate }) {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [memoryUsage, setMemoryUsage] = useState(0);

  // გაუშვი interval cleanup-ის გარეშე — LEAK!
  const startLeakyInterval = () => {
    const id = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 500);

    intervalTracker.add(id);
    setIsRunning(true);
    onUpdate?.();

    console.log(
      `%c+ ახალი Interval დაიწყო (clearInterval არ არის!) ID: ${id}`,
      'color: #e74c3c; font-weight: bold;'
    );
  };

  // სიმულირებული მეხსიერების გაზრდა
  useEffect(() => {
    if (isRunning) {
      const usage = intervalTracker.count * 25;
      setMemoryUsage(usage);
    }
  }, [counter, isRunning]);

  const stopAll = () => {
    intervalTracker.clearAll();
    setIsRunning(false);
    setMemoryUsage(0);
    setCounter(0);
    onUpdate?.();
    console.log('%c✓ ყველა interval გასუფთავდა', 'color: #27ae60; font-weight: bold;');
  };

  return (
    <div className="leak-demo-card">
      <h3 className="leak-title">1. setInterval Leak</h3>
      <p className="leak-description">
        ყოველ დაჭერაზე ახალი interval იწყება clearInterval-ის გარეშე
      </p>

      <div className="leak-stats-row">
        <div className="leak-stat-item">
          <span className="leak-stat-label">Counter:</span>
          <span className="leak-stat-value">{counter}</span>
        </div>
        <div className="leak-stat-item">
          <span className="leak-stat-label">Active Intervals:</span>
          <span className={`leak-stat-value ${intervalTracker.count > 0 ? 'danger' : ''}`}>
            {intervalTracker.count}
          </span>
        </div>
        <div className="leak-stat-item">
          <span className="leak-stat-label">~Memory:</span>
          <span className="leak-stat-value">{memoryUsage} KB</span>
        </div>
      </div>

      <div className="leak-memory-bar">
        <div
          className="leak-memory-fill"
          style={{ width: `${Math.min((memoryUsage / 500) * 100, 100)}%` }}
        />
      </div>

      <div className="leak-actions">
        <button className="btn btn-warning" onClick={startLeakyInterval}>
          დაიწყე ახალი Interval
        </button>
        <button className="btn btn-reset" onClick={stopAll}>
          გააჩერე ყველა
        </button>
      </div>
    </div>
  );
}
