import { useEffect, useRef, useState } from 'react'

// დახატული ზოლების „ქეში" — მოდულის დონეზე, რომ ანიმაციის ისტორია შევინახოთ
const renderedBars = []

const BAR_COUNT = 40

export default function ChartWidget() {
  const renderCount = useRef(0)
  renderCount.current++

  const hostRef = useRef(null)
  const [frames, setFrames] = useState(0)

  useEffect(() => {
    console.log('📈 გრაფიკის ხატვა დაიწყო')

    const intervalId = setInterval(() => {
      const host = hostRef.current
      if (!host) return

      // ძველი ზოლების მოშორება
      while (host.firstChild) {
        renderedBars.push(host.firstChild)
        host.removeChild(host.firstChild)
      }

      // ახალი კადრის დახატვა
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement('div')
        bar.className = 'chart-bar'
        bar.style.height = `${8 + Math.round(Math.random() * 52)}px`
        bar.dataset.label = `bar-${i}-${Date.now()}`
        bar.title = `მნიშვნელობა: ${Math.round(Math.random() * 100)}`
        host.appendChild(bar)
      }

      setFrames(previous => previous + 1)
    }, 500)

    return () => {
      console.log('📈 გრაფიკის ხატვა შეჩერდა')
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>ტრაფიკის გრაფიკი</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
        <span className="spacer" />
        <span className="chip">კადრი: {frames}</span>
      </div>
      <div className="panel-body">
        <div className="chart-host" ref={hostRef} />
        <p className="panel-note">
          ყოველი კადრი {BAR_COUNT} ელემენტს ხატავს ხელით (DOM API-თ), React-ის გარეშე.
        </p>
      </div>
    </div>
  )
}
