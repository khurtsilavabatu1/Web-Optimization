import { useEffect, useRef, useState } from 'react'
import { fetchServerMetrics, serverLabel } from '../utils/fakeApi'

export default function ServerMonitor({ serverId }) {
  const renderCount = useRef(0)
  renderCount.current++

  const [ticks, setTicks] = useState(0)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(false)

  // ტაიმერი — „ცოცხალი" მონიტორინგი
  useEffect(() => {
    console.log('▶️ მონიტორინგის ინტერვალი დაიწყო')

    setInterval(() => {
      setTicks(previous => previous + 1)
      console.log('⏱ tick', new Date().toLocaleTimeString('ka-GE'))
    }, 1000)
  }, [])

  // მეტრიკის ჩატვირთვა არჩეული სერვერისთვის
  useEffect(() => {
    setLoading(true)

    fetchServerMetrics(serverId).then(data => {
      console.log('📥 მიღებული მონაცემები:', data.id)
      setMetrics(data)
      setLoading(false)
    })
  }, [serverId])

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>სერვერის მონიტორი</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
        <span className="spacer" />
        <span className="chip chip-info">tick: {ticks}</span>
      </div>
      <div className="panel-body">
        <p className="panel-note">
          არჩეულია: <strong>{serverLabel(serverId)}</strong>
        </p>

        {loading && <p className="panel-note">იტვირთება...</p>}

        {metrics && (
          <>
            <div className="stat-grid" style={{ marginTop: '0.5rem' }}>
              <div className="stat-box">
                <div className="stat-label">CPU</div>
                <div className="stat-value">{metrics.cpu}%</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">მეხსიერება</div>
                <div className="stat-value">{metrics.memory}%</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">RPS</div>
                <div className="stat-value">{metrics.rps}</div>
              </div>
            </div>
            <p className="panel-note mono">
              ნაჩვენები მონაცემები: {metrics.name} | მიღების დრო: {metrics.receivedAt}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
