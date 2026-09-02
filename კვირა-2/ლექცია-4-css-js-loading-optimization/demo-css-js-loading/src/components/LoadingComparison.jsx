import './LoadingComparison.css'

function LoadingComparison() {
  return (
    <div className="loading-comparison">
      <h2 className="section-title">CSS/JS Loading — შედარება და კონცეფციები</h2>

      {/* Script Loading Strategies */}
      <div className="comparison-section">
        <h3 className="comparison-title">📜 JavaScript Loading სტრატეგიები</h3>

        <div className="strategy-grid">
          <div className="strategy-card blocking">
            <div className="strategy-header">
              <h4>Normal &lt;script&gt;</h4>
              <span className="strategy-badge bad">Blocking</span>
            </div>
            <div className="strategy-diagram">
              <div className="timeline-item parse">HTML Parsing</div>
              <div className="timeline-item blocked">⏸ Blocked</div>
              <div className="timeline-item script">Script Download & Execute</div>
              <div className="timeline-item parse">HTML Parsing</div>
            </div>
            <p className="strategy-desc">
              HTML parsing ჩერდება სკრიპტის ჩამოტვირთვისა და შესრულების დროს.
              <strong> არ გამოიყენოთ!</strong>
            </p>
          </div>

          <div className="strategy-card async">
            <div className="strategy-header">
              <h4>&lt;script async&gt;</h4>
              <span className="strategy-badge neutral">Async</span>
            </div>
            <div className="strategy-diagram">
              <div className="timeline-item parse">HTML Parsing</div>
              <div className="timeline-item download">Download (parallel)</div>
              <div className="timeline-item blocked">⏸ Execute</div>
              <div className="timeline-item parse">HTML Parsing</div>
            </div>
            <p className="strategy-desc">
              პარალელურად იტვირთება, მაგრამ შესრულება ბლოკავს parsing-ს.
              <strong> Analytics, რეკლამებისთვის</strong>
            </p>
          </div>

          <div className="strategy-card defer">
            <div className="strategy-header">
              <h4>&lt;script defer&gt;</h4>
              <span className="strategy-badge good">Recommended</span>
            </div>
            <div className="strategy-diagram">
              <div className="timeline-item parse">HTML Parsing</div>
              <div className="timeline-item download">Download (parallel)</div>
              <div className="timeline-item parse">Parsing Complete</div>
              <div className="timeline-item script">Execute in Order</div>
            </div>
            <p className="strategy-desc">
              პარალელურად იტვირთება, შესრულდება DOMContentLoaded-მდე.
              <strong> რეკომენდირებული!</strong>
            </p>
          </div>

          <div className="strategy-card module">
            <div className="strategy-header">
              <h4>&lt;script type="module"&gt;</h4>
              <span className="strategy-badge good">Modern</span>
            </div>
            <div className="strategy-diagram">
              <div className="timeline-item parse">HTML Parsing</div>
              <div className="timeline-item download">Download (parallel)</div>
              <div className="timeline-item parse">Parsing Complete</div>
              <div className="timeline-item script">Execute (defer-like)</div>
            </div>
            <p className="strategy-desc">
              ES Modules ავტომატურად defer-ს იყენებს. Vite ამას იყენებს.
              <strong> თანამედროვე აპლიკაციებისთვის</strong>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Loading Strategies */}
      <div className="comparison-section">
        <h3 className="comparison-title">🎨 CSS Loading სტრატეგიები</h3>

        <div className="css-strategy-grid">
          <div className="css-strategy-card">
            <h4>❌ ყველა CSS ერთ ფაილში</h4>
            <code className="code-example bad">
              &lt;link rel="stylesheet" href="all-styles.css"&gt;
            </code>
            <p>
              <strong>პრობლემა:</strong> Render-blocking. 100KB CSS ფაილი ბლოკავს გვერდის rendering-ს,
              მაშინაც კი, როცა მხოლოდ 10KB გჭირდება above-the-fold-ისთვის.
            </p>
          </div>

          <div className="css-strategy-card">
            <h4>✅ Critical CSS Inlined</h4>
            <code className="code-example good">
              &lt;style&gt;<br/>
              &nbsp;&nbsp;/* Above-the-fold styles */<br/>
              &nbsp;&nbsp;.hero, .nav {'{ ... }'}<br/>
              &lt;/style&gt;<br/>
              &lt;link rel="preload" href="styles.css" as="style"<br/>
              &nbsp;&nbsp;onload="this.rel='stylesheet'"&gt;
            </code>
            <p>
              <strong>ოპტიმიზაცია:</strong> Critical CSS inline, დანარჩენი async იტვირთება.
              FCP (First Contentful Paint) მკვეთრად უმჯობესდება.
            </p>
          </div>

          <div className="css-strategy-card">
            <h4>✅ Media-Based CSS Loading</h4>
            <code className="code-example good">
              &lt;link rel="stylesheet" href="print.css"<br/>
              &nbsp;&nbsp;media="print"&gt;<br/>
              &lt;link rel="stylesheet" href="desktop.css"<br/>
              &nbsp;&nbsp;media="(min-width: 1024px)"&gt;
            </code>
            <p>
              <strong>ოპტიმიზაცია:</strong> არა-matching media query არ ბლოკავს rendering-ს.
              Print CSS არ აფერხებს საწყის ჩატვირთვას.
            </p>
          </div>
        </div>
      </div>

      {/* React-Specific Optimizations */}
      <div className="comparison-section react-section">
        <h3 className="comparison-title">⚛️ React/Vite Optimizations (ამ დემოში)</h3>

        <div className="react-optimizations">
          <div className="optimization-item">
            <div className="opt-icon">📦</div>
            <div className="opt-content">
              <h4>Code Splitting (React.lazy)</h4>
              <code>const ChatWidget = lazy(() =&gt; import('./ChatWidget'))</code>
              <p>
                ChatWidget და HeavyModule არ შედის საწყის bundle-ში.
                იტვირთება მხოლოდ საჭიროების შემთხვევაში.
              </p>
            </div>
          </div>

          <div className="optimization-item">
            <div className="opt-icon">⏱️</div>
            <div className="opt-content">
              <h4>Dynamic Imports</h4>
              <code>import('./Analytics.jsx').then(module =&gt; ...)</code>
              <p>
                Analytics ასინქრონულად იტვირთება page load-ის შემდეგ,
                არ აფერხებს მთავარ ფუნქციონალს.
              </p>
            </div>
          </div>

          <div className="optimization-item">
            <div className="opt-icon">👁️</div>
            <div className="opt-content">
              <h4>Intersection Observer</h4>
              <code>useEffect(() =&gt; observer.observe(ref.current), [])</code>
              <p>
                HeavyModule იტვირთება მხოლოდ მაშინ, როცა viewport-ში ჩნდება.
                Below-the-fold კომპონენტების lazy loading.
              </p>
            </div>
          </div>

          <div className="optimization-item">
            <div className="opt-icon">🔗</div>
            <div className="opt-content">
              <h4>Resource Hints</h4>
              <code>&lt;link rel="preconnect" href="https://api.example.com"&gt;</code>
              <p>
                DNS prefetch და preconnect აჩქარებს მესამე მხარის რესურსების ჩამოტვირთვას.
              </p>
            </div>
          </div>

          <div className="optimization-item">
            <div className="opt-icon">🎯</div>
            <div className="opt-content">
              <h4>requestIdleCallback</h4>
              <code>requestIdleCallback(() =&gt; heavyTask())</code>
              <p>
                არაკრიტიკული გამოთვლები ხდება idle time-ში,
                არ აფერხებს UI-ს.
              </p>
            </div>
          </div>

          <div className="optimization-item">
            <div className="opt-icon">⚡</div>
            <div className="opt-content">
              <h4>Vite HMR & Tree-Shaking</h4>
              <code>vite build --mode production</code>
              <p>
                Vite ავტომატურად აკეთებს tree-shaking-ს და chunk splitting-ს.
                Production build ოპტიმიზირებულია.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="comparison-section tips-section">
        <h3 className="comparison-title">💡 Performance Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-number">1</span>
            <p>გამოიყენეთ <code>defer</code> ყველა სკრიპტისთვის, რომელიც DOM-ზეა დამოკიდებული</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">2</span>
            <p>Critical CSS გახადეთ inline (მაქსიმუმ 14KB), დანარჩენი async</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">3</span>
            <p>გამოიყენეთ <code>preconnect</code> მესამე მხარის API-ებისთვის</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">4</span>
            <p>Lazy load below-the-fold კომპონენტები</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">5</span>
            <p>Analytics და tracking იტვირთეთ <code>async</code>-ად</p>
          </div>
          <div className="tip-card">
            <span className="tip-number">6</span>
            <p>შეამოწმეთ bundle size: <code>npm run build</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingComparison
