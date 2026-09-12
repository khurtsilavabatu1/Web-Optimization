import { useEffect, useRef, useState } from 'react'

export default function ResizeWidget() {
  const renderCount = useRef(0)
  renderCount.current++

  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [events, setEvents] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
      setEvents(previous => previous + 1)
    }

    console.log('📐 resize listener დაემატა')
    window.addEventListener('resize', handleResize)
  }, [size])

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>ფანჯრის ზომა</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
      </div>
      <div className="panel-body">
        <div className="stat-grid">
          <div className="stat-box">
            <div className="stat-label">სიგანე</div>
            <div className="stat-value">{size.width}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">სიმაღლე</div>
            <div className="stat-value">{size.height}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">დაფიქსირებული მოვლენა</div>
            <div className="stat-value">{events}</div>
          </div>
        </div>
        <p className="panel-note">
          ზომის ერთი ცვლილება = რამდენი „დაფიქსირებული მოვლენა"? შეადარეთ.
        </p>
      </div>
    </div>
  )
}
