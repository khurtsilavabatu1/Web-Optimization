import { useRef } from 'react'
import { computeSlaReport } from '../utils/sla'

export default function SlaPanel({ tickets, assignments, thresholds }) {
  const renderCount = useRef(0)
  renderCount.current++

  // SLA-ს ანგარიში ითვლება კომპონენტის სხეულში
  const report = computeSlaReport(tickets, assignments)

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>SLA ანგარიში</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
      </div>
      <div className="panel-body">
        <div className="stat-grid">
          <div className="stat-box">
            <div className="stat-label">SLA დარღვეული</div>
            <div className="stat-value">{report.breached}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">რისკის ზონაში</div>
            <div className="stat-value">{report.atRisk}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">მიბმული აგენტი</div>
            <div className="stat-value">{report.assigned}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">საშ. პირველი პასუხი</div>
            <div className="stat-value">{report.avgFirstResponse} წთ</div>
          </div>
        </div>

        <p className="panel-note">
          გამოთვლის ხანგრძლივობა ბოლო რენდერზე: <strong>{report.durationMs} ms</strong>
          <br />
          ზღვარი: დარღვევა &gt; {thresholds.breachMinutes} წთ, რისკი &gt; {thresholds.riskMinutes} წთ
        </p>
      </div>
    </div>
  )
}
