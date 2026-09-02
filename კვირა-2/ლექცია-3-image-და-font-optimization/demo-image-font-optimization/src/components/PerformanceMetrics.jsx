import { useEffect, useState } from 'react';

function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fcp: null,
    ttfb: null,
  });

  useEffect(() => {
    // Performance Observer for LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics((prev) => ({ ...prev, lcp: lastEntry.renderTime || lastEntry.loadTime }));
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Performance Observer for FCP
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }));
      }
    });

    fcpObserver.observe({ type: 'paint', buffered: true });

    // Navigation Timing API for TTFB
    const navTiming = performance.getEntriesByType('navigation')[0];
    if (navTiming) {
      const ttfb = navTiming.responseStart - navTiming.requestStart;
      setMetrics((prev) => ({ ...prev, ttfb }));
    }

    return () => {
      lcpObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  const formatMs = (value) => {
    if (!value) return '—';
    return `${Math.round(value)}ms`;
  };

  const getScoreClass = (value, thresholds) => {
    if (!value) return '';
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  return (
    <section className="section">
      <h2>Performance Metrics</h2>
      <p>
        ეს მეტრიკები Performance Observer API-ით აღირიცხება რეალურ დროში.
        LCP და FCP გვიჩვენებს თუ რამდენად სწრაფად ჩაიტვირთა გვერდი.
      </p>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>LCP</h3>
          <div className="metric-value">{formatMs(metrics.lcp)}</div>
          <div className="metric-label">Largest Contentful Paint</div>
        </div>

        <div className="metric-card">
          <h3>FCP</h3>
          <div className="metric-value">{formatMs(metrics.fcp)}</div>
          <div className="metric-label">First Contentful Paint</div>
        </div>

        <div className="metric-card">
          <h3>TTFB</h3>
          <div className="metric-value">{formatMs(metrics.ttfb)}</div>
          <div className="metric-label">Time to First Byte</div>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '1rem' }}>
        <strong>მეტრიკების ინტერპრეტაცია:</strong>
        <ol>
          <li><strong>LCP:</strong> კარგი &lt; 2.5s, საჭიროებს გაუმჯობესებას &lt; 4s</li>
          <li><strong>FCP:</strong> კარგი &lt; 1.8s, საჭიროებს გაუმჯობესებას &lt; 3s</li>
          <li><strong>TTFB:</strong> კარგი &lt; 800ms, საჭიროებს გაუმჯობესებას &lt; 1800ms</li>
        </ol>
      </div>
    </section>
  );
}

export default PerformanceMetrics;
