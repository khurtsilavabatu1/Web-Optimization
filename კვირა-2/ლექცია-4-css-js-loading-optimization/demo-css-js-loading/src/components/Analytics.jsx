// Analytics Module - Loaded asynchronously (similar to async script)
// This simulates third-party analytics like Google Analytics, Mixpanel, etc.

const Analytics = {
  init() {
    console.log('[Analytics] Initialized at:', performance.now().toFixed(1), 'ms');

    // Collect page load metrics
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
          const firstPaintTime = perfData.responseEnd - perfData.navigationStart;

          console.log('[Analytics] Page Performance Metrics:', {
            pageLoadTime: pageLoadTime + 'ms',
            domContentLoadedTime: domContentLoadedTime + 'ms',
            firstPaintTime: firstPaintTime + 'ms',
            url: window.location.pathname,
            userAgent: navigator.userAgent.substring(0, 50) + '...',
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toISOString()
          });

          // Track Core Web Vitals if available
          if ('PerformanceObserver' in window) {
            try {
              // FCP - First Contentful Paint
              const fcpObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.name === 'first-contentful-paint') {
                    console.log('[Analytics] FCP (First Contentful Paint):', entry.startTime.toFixed(1), 'ms');
                  }
                }
              });
              fcpObserver.observe({ entryTypes: ['paint'] });

              // LCP - Largest Contentful Paint
              const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('[Analytics] LCP (Largest Contentful Paint):', lastEntry.startTime.toFixed(1), 'ms');
              });
              lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            } catch (e) {
              console.log('[Analytics] Web Vitals tracking not fully supported');
            }
          }
        }, 0);
      });
    }

    // Track user interactions
    this.trackClicks();
    this.trackScrollDepth();
  },

  trackClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        console.log('[Analytics] Click tracked:', {
          element: target.tagName,
          text: target.textContent.substring(0, 30),
          timestamp: performance.now().toFixed(1) + 'ms'
        });
      }
    });
  },

  trackScrollDepth() {
    let maxScroll = 0;
    const checkScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercentage > maxScroll && scrollPercentage % 25 === 0) {
        maxScroll = scrollPercentage;
        console.log('[Analytics] Scroll depth:', scrollPercentage + '%');
      }
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(checkScroll);
    }, { passive: true });
  },

  // Simulate sending data to analytics server
  send(eventName, data) {
    console.log('[Analytics] Event sent:', eventName, data);
    // In real app: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(data) })
  }
};

export default Analytics;
