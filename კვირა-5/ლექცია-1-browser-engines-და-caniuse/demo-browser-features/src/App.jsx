import { useState, useRef, useCallback } from 'react'
import BrowserInfo from './components/BrowserInfo'
import CodeExample from './components/CodeExample'

// ===== Browser detection utilities =====
const detectBrowserEngine = () => {
  const ua = navigator.userAgent.toLowerCase()
  const isChrome = ua.includes('chrome') && !ua.includes('edg')
  const isEdge = ua.includes('edg')
  const isFirefox = ua.includes('firefox')
  const isSafari = ua.includes('safari') && !ua.includes('chrome')

  if (isFirefox) return { engine: 'Gecko', browser: 'Firefox' }
  if (isSafari) return { engine: 'WebKit', browser: 'Safari' }
  if (isChrome || isEdge) return { engine: 'Blink', browser: isEdge ? 'Edge' : 'Chrome' }
  return { engine: 'Unknown', browser: 'Unknown' }
}

const getBrowserVersion = () => {
  const ua = navigator.userAgent
  const match = ua.match(/(firefox|chrome|safari|edg)[\/\s]([\d.]+)/i)
  return match ? match[2] : 'Unknown'
}

// ===== Feature detection =====
const featureSupport = {
  containerQueries: () => {
    try { return CSS.supports('container-type', 'inline-size') } catch { return false }
  },
  hasSelector: () => {
    try { return CSS.supports('selector(:has(*))') } catch { return false }
  },
  dvh: () => {
    try { return CSS.supports('height', '100dvh') } catch { return false }
  },
  dialog: () => typeof HTMLDialogElement !== 'undefined',
  structuredClone: () => typeof structuredClone === 'function',
  arrayAt: () => typeof Array.prototype.at === 'function',
}

// ===== Support badge component =====
function SupportBadge({ supported }) {
  return (
    <span className={`feature-badge ${supported ? 'supported' : 'unsupported'}`}>
      <span className="icon">{supported ? '✓' : '✗'}</span>
      {supported ? 'მხარდაჭერილი' : 'არ არის მხარდაჭერილი'}
    </span>
  )
}

// ===== Section wrapper =====
function DemoSection({ id, title, caniuseUrl, supported, children, codeExample }) {
  const [showCode, setShowCode] = useState(false)

  return (
    <section id={id} className="demo-section">
      <div className="section-header">
        <h2>{title}</h2>
        <SupportBadge supported={supported} />
      </div>

      <div className="demo-area">
        {children}
      </div>

      <div className="section-actions">
        <button
          className={`toggle-code-btn ${showCode ? 'active' : ''}`}
          onClick={() => setShowCode(prev => !prev)}
        >
          {showCode ? 'კოდის დამალვა' : 'კოდის ნახვა'}
        </button>
        <a
          href={caniuseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="caniuse-link"
        >
          caniuse.com
        </a>
      </div>

      {showCode && <CodeExample code={codeExample} />}
    </section>
  )
}

// ===== 1. Container Queries Demo =====
function ContainerQueriesDemo() {
  const [width, setWidth] = useState(500)

  return (
    <DemoSection
      id="container-queries"
      title="CSS Container Queries"
      caniuseUrl="https://caniuse.com/css-container-queries"
      supported={featureSupport.containerQueries()}
      codeExample={`.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: flex;
  flex-direction: column;
}

/* კონტეინერი >= 450px: ჰორიზონტალური */
@container card (min-width: 450px) {
  .card {
    flex-direction: row;
    align-items: center;
  }
}`}
    >
      <div className="slider-control">
        <label htmlFor="container-width-slider">
          კონტეინერის სიგანე: <strong>{width}px</strong>
        </label>
        <input
          id="container-width-slider"
          type="range"
          min="200"
          max="800"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
      <div className="cq-container" style={{ width: `${width}px` }}>
        <div className="cq-card">
          <div className="cq-card-image">
            <span>IMG</span>
          </div>
          <div className="cq-card-content">
            <h3>კომპონენტი</h3>
            <p>
              ეს ბარათი თავისი კონტეინერის სიგანეზე რეაგირებს.
              სლაიდერი გადაათრიეთ და ნახეთ როგორ იცვლება layout.
            </p>
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ===== 2. :has() Selector Demo =====
function HasSelectorDemo() {
  return (
    <DemoSection
      id="has-selector"
      title="CSS :has() Selector"
      caniuseUrl="https://caniuse.com/css-has"
      supported={featureSupport.hasSelector()}
      codeExample={`/* მშობელი ჰაილაითდება checked checkbox-ისას */
.form-group:has(input:checked) {
  background: rgba(59, 130, 246, 0.1);
  border-color: var(--accent);
}

/* JavaScript არ სჭირდება — წმინდა CSS! */`}
    >
      <p className="demo-description">
        მონიშნეთ checkbox-ები — მშობელი <code>.form-group</code> ელემენტი ავტომატურად
        შეიცვლის სტილს <code>:has(input:checked)</code> სელექტორის წყალობით.
        JavaScript არ გამოიყენება.
      </p>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" /> React
        </label>
        <label className="checkbox-label">
          <input type="checkbox" /> Vue
        </label>
        <label className="checkbox-label">
          <input type="checkbox" /> Angular
        </label>
        <label className="checkbox-label">
          <input type="checkbox" /> Svelte
        </label>
      </div>
    </DemoSection>
  )
}

// ===== 3. dvh Units Demo =====
function DvhUnitsDemo() {
  return (
    <DemoSection
      id="dvh-units"
      title="CSS dvh Units"
      caniuseUrl="https://caniuse.com/viewport-unit-variants"
      supported={featureSupport.dvh()}
      codeExample={`/* საბაზისო — ყველა ბრაუზერში მუშაობს */
.hero {
  min-height: 100vh;
}

/* Enhancement — dvh მხარდაჭერის შემთხვევაში */
@supports (min-height: 100dvh) {
  .hero {
    min-height: 100dvh;
  }
}`}
    >
      <p className="demo-description">
        Hero სექცია (ზემოთ) <code>100dvh</code>-ს იყენებს <code>100vh</code> fallback-ით.
        მობილურ ბრაუზერებში <code>100vh</code> address bar-ს არ ითვალისწინებს,
        ხოლო <code>100dvh</code> დინამიურად ადაპტირდება.
      </p>
      <div className="dvh-comparison">
        <div className="dvh-box vh-box">
          <span className="dvh-label">100vh</span>
          <p>მობილურზე address bar-ის ქვეშ კონტენტი იმალება</p>
        </div>
        <div className="dvh-box dvh-box-demo">
          <span className="dvh-label">100dvh</span>
          <p>დინამიურად ადაპტირდება address bar-ის ჩვენება/დამალვისას</p>
        </div>
      </div>
    </DemoSection>
  )
}

// ===== 4. Dialog Element Demo =====
function DialogDemo() {
  const dialogRef = useRef(null)

  const openModal = useCallback(() => {
    dialogRef.current?.showModal()
  }, [])

  const closeModal = useCallback((value) => {
    dialogRef.current?.close(value)
  }, [])

  const handleBackdropClick = useCallback((e) => {
    if (e.target === dialogRef.current) {
      closeModal('backdrop')
    }
  }, [closeModal])

  const handleClose = useCallback(() => {
    const val = dialogRef.current?.returnValue
    console.log(`Dialog closed — returnValue: "${val}"`)
  }, [])

  return (
    <DemoSection
      id="dialog-element"
      title="<dialog> Element"
      caniuseUrl="https://caniuse.com/dialog"
      supported={featureSupport.dialog()}
      codeExample={`<dialog id="my-dialog">
  <h2>მოდალის სათაური</h2>
  <p>კონტენტი...</p>
  <button onclick="this.closest('dialog').close('cancel')">
    დახურვა
  </button>
</dialog>

<script>
  const dialog = document.querySelector('#my-dialog')
  dialog.showModal()    // გახსნა modal-ად (backdrop-ით)
  dialog.close('confirm') // დახურვა returnValue-ით
  // Esc — ავტომატურად ხურავს
  // backdrop click — event listener-ით
</script>`}
    >
      <button className="demo-btn" onClick={openModal}>
        მოდალის გახსნა
      </button>

      <dialog
        ref={dialogRef}
        className="demo-dialog"
        onClick={handleBackdropClick}
        onClose={handleClose}
      >
        <div className="dialog-content">
          <h3>Native Dialog</h3>
          <p>
            ეს არის HTML <code>&lt;dialog&gt;</code> ელემენტი.
            ის ავტომატურად უზრუნველყოფს backdrop-ს, focus trapping-ს
            და Esc კლავიშით დახურვას.
          </p>
          <p className="dialog-hint">
            სცადეთ: Esc კლავიში, backdrop-ზე დაჭერა, ან ღილაკები.
          </p>
          <div className="dialog-actions">
            <button
              className="dialog-btn cancel"
              onClick={() => closeModal('cancel')}
            >
              დახურვა
            </button>
            <button
              className="dialog-btn confirm"
              onClick={() => closeModal('confirm')}
            >
              დადასტურება
            </button>
          </div>
        </div>
      </dialog>
    </DemoSection>
  )
}

// ===== 5. structuredClone Demo =====
function StructuredCloneDemo() {
  const [results, setResults] = useState(null)

  const runDemo = () => {
    // Create original object
    const original = {
      name: 'პროექტი',
      date: new Date(),
      tags: new Set(['react', 'vite', 'optimization']),
      nested: { level: 1, data: { value: 42 } }
    }

    // Clone with structuredClone
    const clone = structuredClone(original)

    // Modify clone
    clone.name = 'კლონი (შეცვლილი)'
    clone.nested.level = 999
    clone.tags.add('clone-tag')

    // JSON comparison
    const jsonClone = JSON.parse(JSON.stringify(original))

    setResults({
      original: {
        name: original.name,
        date: `${original.date} (${typeof original.date})`,
        tags: `Set(${original.tags.size}): {${[...original.tags].join(', ')}}`,
        nestedLevel: original.nested.level,
      },
      clone: {
        name: clone.name,
        date: `${clone.date} (${typeof clone.date})`,
        tags: `Set(${clone.tags.size}): {${[...clone.tags].join(', ')}}`,
        nestedLevel: clone.nested.level,
      },
      json: {
        date: `${JSON.stringify(jsonClone.date)} (${typeof jsonClone.date})`,
        tags: `${JSON.stringify(jsonClone.tags)} (Set დაიკარგა!)`,
      }
    })
  }

  return (
    <DemoSection
      id="structured-clone"
      title="structuredClone()"
      caniuseUrl="https://caniuse.com/mdn-api_structuredclone"
      supported={featureSupport.structuredClone()}
      codeExample={`const original = {
  date: new Date(),
  tags: new Set(['react', 'vite']),
  nested: { level: 1 }
}

// JSON.parse(JSON.stringify(...)) — კარგავს Date, Set
const bad = JSON.parse(JSON.stringify(original))
bad.date   // string! (Date დაიკარგა)
bad.tags   // {} (Set დაიკარგა)

// structuredClone — ინარჩუნებს ყველაფერს
const clone = structuredClone(original)
clone.date   // Date object
clone.tags   // Set`}
    >
      <button className="demo-btn" onClick={runDemo}>
        დემოს გაშვება
      </button>

      {results && (
        <div className="demo-results">
          <div className="result-block">
            <h4>ორიგინალი (კლონის ცვლილების შემდეგ):</h4>
            <pre><code>{`name: "${results.original.name}"
date: ${results.original.date}
tags: ${results.original.tags}
nested.level: ${results.original.nestedLevel}`}</code></pre>
            <p className="result-note">ორიგინალი არ შეცვლილა — deep copy მუშაობს!</p>
          </div>

          <div className="result-block">
            <h4>კლონი (structuredClone):</h4>
            <pre><code>{`name: "${results.clone.name}"
date: ${results.clone.date}
tags: ${results.clone.tags}
nested.level: ${results.clone.nestedLevel}`}</code></pre>
          </div>

          <div className="result-block warning">
            <h4>JSON.parse(JSON.stringify()) შედარება:</h4>
            <pre><code>{`date: ${results.json.date}
tags: ${results.json.tags}`}</code></pre>
            <p className="result-note">JSON მეთოდით Date string-ად იქცა, Set კი სრულად დაიკარგა.</p>
          </div>
        </div>
      )}
    </DemoSection>
  )
}

// ===== 6. Array.at() Demo =====
function ArrayAtDemo() {
  const [results, setResults] = useState(null)

  const runDemo = () => {
    const arr = ['HTML', 'CSS', 'JS', 'React', 'Vite']
    const str = 'თბილისი'

    setResults({
      array: arr,
      atNeg1: arr.at(-1),
      atNeg2: arr.at(-2),
      at0: arr.at(0),
      oldWay: arr[arr.length - 1],
      string: str,
      strAtNeg1: str.at(-1),
      strAt0: str.at(0),
    })
  }

  return (
    <DemoSection
      id="array-at"
      title="Array.at()"
      caniuseUrl="https://caniuse.com/mdn-javascript_builtins_array_at"
      supported={featureSupport.arrayAt()}
      codeExample={`const items = ['HTML', 'CSS', 'JS', 'React', 'Vite']

// ძველი გზა — ბოლო ელემენტი
items[items.length - 1]  // 'Vite'

// ახალი გზა
items.at(-1)   // 'Vite'
items.at(-2)   // 'React'
items.at(0)    // 'HTML'

// String-ზეც მუშაობს!
'თბილისი'.at(-1)  // 'ი'
'თბილისი'.at(0)   // 'თ'`}
    >
      <button className="demo-btn" onClick={runDemo}>
        დემოს გაშვება
      </button>

      {results && (
        <div className="demo-results">
          <div className="result-block">
            <h4>მასივი: [{results.array.map(i => `'${i}'`).join(', ')}]</h4>
            <pre><code>{`.at(-1)  =>  '${results.atNeg1}'   (ბოლო ელემენტი)
.at(-2)  =>  '${results.atNeg2}'  (ბოლოს წინა)
.at(0)   =>  '${results.at0}'   (პირველი)`}</code></pre>
          </div>

          <div className="result-block">
            <h4>ძველი vs ახალი გზა:</h4>
            <pre><code>{`// ძველი გზა:
items[items.length - 1]  =>  '${results.oldWay}'

// ახალი გზა:
items.at(-1)             =>  '${results.atNeg1}'`}</code></pre>
          </div>

          <div className="result-block">
            <h4>String: '{results.string}'</h4>
            <pre><code>{`'${results.string}'.at(-1)  =>  '${results.strAtNeg1}'
'${results.string}'.at(0)   =>  '${results.strAt0}'`}</code></pre>
            <p className="result-note">String-ზეც მუშაობს — ქართული სიმბოლოებითაც!</p>
          </div>
        </div>
      )}
    </DemoSection>
  )
}

// ===== Navigation items =====
const navItems = [
  { id: 'container-queries', label: 'Container Queries' },
  { id: 'has-selector', label: ':has() Selector' },
  { id: 'dvh-units', label: 'dvh Units' },
  { id: 'dialog-element', label: '<dialog>' },
  { id: 'structured-clone', label: 'structuredClone()' },
  { id: 'array-at', label: 'Array.at()' },
]

// ===== Main App =====
function App() {
  const browserInfo = {
    ...detectBrowserEngine(),
    version: getBrowserVersion(),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
  }

  return (
    <div className="app">
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-content">
          <h1>Browser Features Demo</h1>
          <p className="hero-subtitle">
            თანამედროვე CSS და JavaScript ფუნქციების ინტერაქტიული დემო
          </p>
          <nav className="hero-nav">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`} className="hero-nav-btn">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ===== Demo Sections ===== */}
      <main className="main-content">
        <ContainerQueriesDemo />
        <HasSelectorDemo />
        <DvhUnitsDemo />
        <DialogDemo />
        <StructuredCloneDemo />
        <ArrayAtDemo />

        {/* ===== Browser Info ===== */}
        <BrowserInfo info={browserInfo} />
      </main>

      {/* ===== Footer ===== */}
      <footer className="app-footer">
        <p>Web Optimization Course — კვირა 5, ლექცია 1: Browser Engines და caniuse</p>
        <p>
          <a href="https://caniuse.com" target="_blank" rel="noopener noreferrer">
            caniuse.com
          </a>
          {' — შეამოწმეთ ბრაუზერის მხარდაჭერა'}
        </p>
      </footer>
    </div>
  )
}

export default App
