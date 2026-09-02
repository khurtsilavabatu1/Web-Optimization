import { useState, useRef } from 'react';

const listenerTracker = {
  count: 0,
  handlers: [],
  add(handler) {
    this.count++;
    this.handlers.push(handler);
  },
  clearAll() {
    this.handlers.forEach(handler => {
      window.removeEventListener('resize', handler);
    });
    this.handlers = [];
    this.count = 0;
  }
};

export { listenerTracker };

export default function EventListenerLeak({ onUpdate }) {
  const [listenerCount, setListenerCount] = useState(0);
  const [lastResize, setLastResize] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const listenerNumRef = useRef(0);

  const addResizeListener = () => {
    listenerNumRef.current++;
    const listenerNum = listenerNumRef.current;

    const handler = () => {
      const timestamp = new Date().toLocaleTimeString('ka-GE');
      setLastResize(timestamp);
      console.log(
        `%cResize detected! (Listener #${listenerNum})`,
        'color: #e67e22; font-weight: bold;'
      );
    };

    // დამატება CLEANUP-ის გარეშე — ლიკი!
    window.addEventListener('resize', handler);
    listenerTracker.add(handler);

    setListenerCount(listenerTracker.count);
    setMemoryUsage(listenerTracker.count * 15);
    onUpdate?.();

    console.log(
      `%c+ Resize listener #${listenerNum} დაემატა (cleanup არ აქვს!)`,
      'color: #e74c3c; font-weight: bold;'
    );
  };

  const clearAllListeners = () => {
    listenerTracker.clearAll();
    setListenerCount(0);
    setMemoryUsage(0);
    setLastResize(null);
    onUpdate?.();
    console.log('%c✓ ყველა listener მოიხსნა', 'color: #27ae60; font-weight: bold;');
  };

  return (
    <div className="leak-demo-card">
      <h3 className="leak-title">2. Event Listener Leak</h3>
      <p className="leak-description">
        ყოველ დაჭერაზე ახალი resize listener ემატება cleanup-ის გარეშე
      </p>

      <div className="leak-stats-row">
        <div className="leak-stat-item">
          <span className="leak-stat-label">Listeners:</span>
          <span className={`leak-stat-value ${listenerCount > 0 ? 'danger' : ''}`}>
            {listenerCount}
          </span>
        </div>
        <div className="leak-stat-item">
          <span className="leak-stat-label">~Memory:</span>
          <span className="leak-stat-value">{memoryUsage} KB</span>
        </div>
      </div>

      {lastResize && (
        <div className="leak-info-box">
          ბოლო resize: {lastResize}
        </div>
      )}

      <div className="leak-memory-bar">
        <div
          className="leak-memory-fill"
          style={{ width: `${Math.min((memoryUsage / 300) * 100, 100)}%` }}
        />
      </div>

      <div className="leak-actions">
        <button className="btn btn-warning" onClick={addResizeListener}>
          დაამატე Listener
        </button>
        <button className="btn btn-reset" onClick={clearAllListeners}>
          გაასუფთავე
        </button>
      </div>

      <div className="leak-hint">
        💡 Hint: შეცვალე ბრაუზერის ზომა და დააკვირდი console-ს
      </div>
    </div>
  );
}
