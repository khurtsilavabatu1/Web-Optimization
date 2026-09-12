import { useEffect, useRef, useState } from 'react'
import { loadJson, loadDashboard, REMOTE_URL, CORS_URL } from '../utils/api'

export default function ApiPanel() {
  const renderCount = useRef(0)
  renderCount.current++

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dashboard, setDashboard] = useState(null)

  const [liveSearch, setLiveSearch] = useState(false)
  const [serverTerm, setServerTerm] = useState('')
  const [requestCount, setRequestCount] = useState(0)
  const [liveRows, setLiveRows] = useState(0)

  // ძიების პარამეტრები — ობიექტი კომპონენტის სხეულში
  const searchOptions = { term: serverTerm, limit: 5 }

  useEffect(() => {
    if (!liveSearch) return

    loadJson(`/tickets.json?q=${encodeURIComponent(searchOptions.term)}&limit=${searchOptions.limit}`)
      .then(response => {
        setLiveRows(Array.isArray(response.data) ? response.data.length : 0)
        setRequestCount(count => count + 1)
      })
  }, [liveSearch, searchOptions])

  const runRequest = async (url, label) => {
    console.log('▶️ request:', label)
    setLoading(true)
    setDashboard(null)

    const response = await loadJson(url)

    setResult({ ...response, url, label })
    setError(null)
    setLoading(false)
  }

  const runDashboard = async () => {
    console.log('▶️ dashboard: 3 დამოუკიდებელი request')
    setLoading(true)
    setResult(null)

    const data = await loadDashboard()

    setDashboard(data)
    setLoading(false)
  }

  const runCorsTest = async () => {
    console.log('▶️ CORS ტესტი:', CORS_URL)
    try {
      const response = await fetch(CORS_URL)
      console.log('CORS პასუხი:', response.status)
    } catch (corsError) {
      console.error('CORS შეცდომა:', corsError.message)
      setError(`ქსელის/CORS შეცდომა: ${corsError.message} — დეტალები Console-ში`)
    }
  }

  const rows = Array.isArray(result?.data) ? result.data : []

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>API პანელი</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
      </div>
      <div className="panel-body">
        <div className="btn-row">
          <button className="btn btn-primary btn-sm" onClick={() => runRequest('/tickets.json', 'ტიკეტები (200)')}>
            ტიკეტების ჩატვირთვა
          </button>
          <button className="btn btn-sm" onClick={() => runRequest('/tickets-archive.json', 'არქივი (404)')}>
            არქივის ჩატვირთვა
          </button>
          <button className="btn btn-sm" onClick={runDashboard}>
            დაშბორდი (3 request)
          </button>
          <button className="btn btn-sm" onClick={() => runRequest(REMOTE_URL, 'დისტანციური (jsonplaceholder)')}>
            დისტანციური request
          </button>
          <button className="btn btn-ghost btn-sm" onClick={runCorsTest}>
            CORS ტესტი
          </button>
        </div>

        <div className="toolbar" style={{ marginTop: '0.75rem' }}>
          <button
            className={liveSearch ? 'btn btn-danger btn-sm' : 'btn btn-sm'}
            onClick={() => setLiveSearch(!liveSearch)}
          >
            {liveSearch ? 'ცოცხალი ძიების გამორთვა' : 'ცოცხალი ძიების ჩართვა'}
          </button>
          <input
            className="input"
            type="text"
            placeholder="სერვერზე ძიება..."
            value={serverTerm}
            onChange={(event) => setServerTerm(event.target.value)}
          />
          <span className="result-count">
            გაგზავნილი request-ები: <strong>{requestCount}</strong> | ჩანაწერი: {liveRows}
          </span>
        </div>

        {loading && <p className="panel-note">იტვირთება...</p>}

        {error && <div className="alert alert-error" style={{ marginTop: '0.75rem' }}>{error}</div>}

        {result && !loading && (
          <div style={{ marginTop: '0.75rem' }}>
            <div className="card-meta">
              <span className="chip chip-ok">წარმატება</span>
              <span className="chip">HTTP {result.status}</span>
              <span className="chip">{result.ms} ms</span>
              <span className="chip">{rows.length} ჩანაწერი</span>
            </div>
            <p className="panel-note mono">{result.url}</p>
            {rows.length > 0 && (
              <table className="data-table" style={{ marginTop: '0.5rem' }}>
                <thead>
                  <tr><th>#</th><th>თემა / სახელი</th></tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.subject || row.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {dashboard && !loading && (
          <div style={{ marginTop: '0.75rem' }}>
            <div className="card-meta">
              <span className="chip chip-info">ჯამური დრო: {dashboard.totalMs} ms</span>
              <span className="chip">ცალკეული: {dashboard.parts.join(' + ')} ms</span>
            </div>
            <p className="panel-note">
              ტიკეტი: {dashboard.tickets.length} | აგენტი: {dashboard.agents.length} |
              SLA სამიზნე (მაღალი): {dashboard.targets?.firstResponseMinutes?.high} წთ
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
