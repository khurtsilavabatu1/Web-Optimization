import { useEffect, useRef, useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import ServerMonitor from './components/ServerMonitor'
import ResizeWidget from './components/ResizeWidget'
import LogFeed from './components/LogFeed'
import ChartWidget from './components/ChartWidget'
import CrashPanel from './components/CrashPanel'
import SymptomPanel from './components/SymptomPanel'
import { serverIds, serverDelay, serverLabel } from './utils/fakeApi'

function App() {
  const renderCount = useRef(0)
  renderCount.current++

  const [showMonitor, setShowMonitor] = useState(false)
  const [showResize, setShowResize] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const [showChart, setShowChart] = useState(false)

  const [serverId, setServerId] = useState('srv-1')
  const [crashMode, setCrashMode] = useState(null)

  useEffect(() => {
    console.log('🎯 App mounted')
  }, [])

  console.log('🔄 App rendering. Render count:', renderCount.current)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Live Ops Console</h1>
        <span className="render-badge header-badge">App renders: {renderCount.current}</span>
        <p className="app-subtitle">
          დავალება — memory leak-ები, cleanup და Error Boundaries
        </p>
      </header>

      <div className="app-layout">
        <div className="main-content">
          <div className="panel">
            <div className="panel-header">
              <h2>ვიჯეტების მართვა</h2>
            </div>
            <div className="panel-body">
              <div className="btn-row">
                <button
                  className={showMonitor ? 'btn btn-primary btn-sm' : 'btn btn-sm'}
                  onClick={() => setShowMonitor(!showMonitor)}
                >
                  {showMonitor ? '■ სერვერის მონიტორი' : '▶ სერვერის მონიტორი'}
                </button>
                <button
                  className={showResize ? 'btn btn-primary btn-sm' : 'btn btn-sm'}
                  onClick={() => setShowResize(!showResize)}
                >
                  {showResize ? '■ ფანჯრის ზომა' : '▶ ფანჯრის ზომა'}
                </button>
                <button
                  className={showLogs ? 'btn btn-primary btn-sm' : 'btn btn-sm'}
                  onClick={() => setShowLogs(!showLogs)}
                >
                  {showLogs ? '■ ლაივ ლოგი' : '▶ ლაივ ლოგი'}
                </button>
                <button
                  className={showChart ? 'btn btn-primary btn-sm' : 'btn btn-sm'}
                  onClick={() => setShowChart(!showChart)}
                >
                  {showChart ? '■ ტრაფიკის გრაფიკი' : '▶ ტრაფიკის გრაფიკი'}
                </button>
              </div>

              <div className="toolbar" style={{ marginTop: '0.75rem' }}>
                <span className="field-label">სერვერი</span>
                <select
                  className="select"
                  value={serverId}
                  onChange={(event) => setServerId(event.target.value)}
                >
                  {serverIds.map(id => (
                    <option key={id} value={id}>
                      {serverLabel(id)} — {serverDelay(id)} ms
                    </option>
                  ))}
                </select>
                <span className="result-count">
                  ვიჯეტების ჩართვა/გამორთვა = mount / unmount
                </span>
              </div>
            </div>
          </div>

          <ErrorBoundary onReset={() => setCrashMode(null)}>
            {showMonitor && <ServerMonitor serverId={serverId} />}
            {showResize && <ResizeWidget />}
            {showLogs && <LogFeed />}
            {showChart && <ChartWidget />}
            <CrashPanel crashMode={crashMode} onCrash={setCrashMode} />
          </ErrorBoundary>
        </div>

        <aside className="sidebar">
          <div className="panel">
            <div className="panel-header">
              <h2>რა უნდა გავზომოთ</h2>
            </div>
            <div className="panel-body">
              <div className="list">
                <div className="list-row">
                  <div className="row-main">
                    <div className="row-title">JS Heap Size</div>
                    <div className="row-sub">იზრდება და არ ბრუნდება უკან?</div>
                  </div>
                </div>
                <div className="list-row">
                  <div className="row-main">
                    <div className="row-title">DOM Nodes</div>
                    <div className="row-sub">ეკრანზე იგივეა, რიცხვი კი იზრდება?</div>
                  </div>
                </div>
                <div className="list-row">
                  <div className="row-main">
                    <div className="row-title">Event Listeners</div>
                    <div className="row-sub">unmount-ის შემდეგ მცირდება?</div>
                  </div>
                </div>
              </div>
              <p className="panel-note">
                Performance Monitor: <span className="mono">Cmd+Shift+P</span> →
                „Performance Monitor"
              </p>
            </div>
          </div>
        </aside>
      </div>

      <SymptomPanel />
    </div>
  )
}

export default App
