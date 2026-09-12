import { useRef, useState } from 'react'

export default function CrashPanel({ crashMode, onCrash }) {
  const renderCount = useRef(0)
  renderCount.current++

  const [lastAction, setLastAction] = useState('—')

  // render-ის დროს მომხდარი შეცდომა
  if (crashMode === 'render') {
    const incident = null
    console.log('ინციდენტის სიმძიმე:', incident.severity)
  }

  const handleHandlerCrash = () => {
    setLastAction('event handler')
    const config = null
    console.log('ზღვარი:', config.threshold)
  }

  const handleAsyncCrash = () => {
    setLastAction('setTimeout')
    setTimeout(() => {
      const report = undefined
      console.log('ანგარიში:', report.lines.length)
    }, 500)
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>ინციდენტების პანელი</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
      </div>
      <div className="panel-body">
        <div className="btn-row">
          <button className="btn btn-danger btn-sm" onClick={() => onCrash('render')}>
            💥 render-ის შეცდომა
          </button>
          <button className="btn btn-sm" onClick={handleHandlerCrash}>
            ⚠️ handler-ის შეცდომა
          </button>
          <button className="btn btn-sm" onClick={handleAsyncCrash}>
            ⏳ async შეცდომა (setTimeout)
          </button>
        </div>
        <p className="panel-note">
          ბოლო მოქმედება: <strong>{lastAction}</strong>
          <br />
          სამივე ღილაკი შეცდომას იწვევს. სამივეს ერთნაირად ამუშავებს Error Boundary?
        </p>
      </div>
    </div>
  )
}
