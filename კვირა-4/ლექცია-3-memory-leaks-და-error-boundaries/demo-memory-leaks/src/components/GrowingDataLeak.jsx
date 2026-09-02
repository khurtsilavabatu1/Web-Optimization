import { useState, useRef, useEffect } from 'react';

const dataTracker = {
  data: [],
  intervalId: null,
  add(item) {
    this.data.push(item);
  },
  clearAll() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.data = [];
  }
};

export { dataTracker };

export default function GrowingDataLeak({ onUpdate }) {
  const [isGrowing, setIsGrowing] = useState(false);
  const [dataSize, setDataSize] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const startGrowing = () => {
    if (dataTracker.intervalId) return;

    setIsGrowing(true);

    // ყოველ წამში დიდი მასივის დამატება — cleanup-ის გარეშე!
    dataTracker.intervalId = setInterval(() => {
      // დავამატოთ 1000 ელემენტი
      const largeChunk = new Array(1000).fill(null).map((_, i) => ({
        id: Date.now() + i,
        data: 'x'.repeat(100), // 100 სიმბოლო
        timestamp: new Date().toISOString(),
      }));

      dataTracker.add(largeChunk);

      if (mountedRef.current) {
        const size = dataTracker.data.length;
        setDataSize(size);
        setMemoryUsage(Math.round(size * 0.1)); // ~100KB per 1000 items
        onUpdate?.();
      }

      console.log(
        `%c+ მასივი გაიზარდა: ${dataTracker.data.length} chunks (~${Math.round(dataTracker.data.length * 100)}KB)`,
        'color: #e74c3c; font-weight: bold;'
      );
    }, 1000);

    console.log(
      `%c+ მონაცემები იწყებს ზრდას (cleanup არ არის!)`,
      'color: #e74c3c; font-weight: bold;'
    );
  };

  const stopGrowing = () => {
    if (dataTracker.intervalId) {
      clearInterval(dataTracker.intervalId);
      dataTracker.intervalId = null;
    }
    setIsGrowing(false);
    console.log('%c⏸ ზრდა შეჩერდა (მაგრამ მონაცემები კვლავ მეხსიერებაშია!)', 'color: #f39c12; font-weight: bold;');
  };

  const clearData = () => {
    dataTracker.clearAll();
    setIsGrowing(false);
    setDataSize(0);
    setMemoryUsage(0);
    onUpdate?.();
    console.log('%c✓ მონაცემები გასუფთავდა', 'color: #27ae60; font-weight: bold;');
  };

  return (
    <div className="leak-demo-card">
      <h3 className="leak-title">4. Growing Data Leak</h3>
      <p className="leak-description">
        მასივი უსასრულოდ იზრდება cleanup-ის გარეშე
      </p>

      <div className="leak-stats-row">
        <div className="leak-stat-item">
          <span className="leak-stat-label">Data Chunks:</span>
          <span className={`leak-stat-value ${dataSize > 0 ? 'danger' : ''}`}>
            {dataSize}
          </span>
        </div>
        <div className="leak-stat-item">
          <span className="leak-stat-label">~Memory:</span>
          <span className="leak-stat-value">{memoryUsage} KB</span>
        </div>
        <div className="leak-stat-item">
          <span className="leak-stat-label">Status:</span>
          <span className={`leak-status ${isGrowing ? 'growing' : ''}`}>
            {isGrowing ? 'იზრდება' : 'გაჩერებული'}
          </span>
        </div>
      </div>

      <div className="leak-memory-bar">
        <div
          className="leak-memory-fill growing"
          style={{ width: `${Math.min((memoryUsage / 2000) * 100, 100)}%` }}
        />
      </div>

      <div className="leak-actions">
        <button
          className="btn btn-warning"
          onClick={startGrowing}
          disabled={isGrowing}
        >
          დაიწყე ზრდა
        </button>
        <button
          className="btn btn-pause"
          onClick={stopGrowing}
          disabled={!isGrowing}
        >
          შეაჩერე
        </button>
        <button className="btn btn-reset" onClick={clearData}>
          გაასუფთავე
        </button>
      </div>

      <div className="leak-hint">
        💡 Hint: გაუშვი რამდენიმე წამი და დააკვირდი DevTools Memory Profiler-ს
      </div>
    </div>
  );
}
