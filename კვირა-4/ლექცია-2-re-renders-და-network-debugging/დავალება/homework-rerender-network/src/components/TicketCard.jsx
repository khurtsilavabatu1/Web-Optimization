import React, { useRef, useState } from 'react'
import { agents, priorityLabels } from '../data'
import { formatMinutes } from '../utils/sla'

function TicketCard({ ticket, assignedTo, badges, onAssign, onResolve }) {
  const renderCount = useRef(0)
  renderCount.current++

  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className={`card ${showDetails ? 'expanded' : ''}`}>
      <span className="render-badge" title="TicketCard-ის რენდერების რაოდენობა">
        renders: {renderCount.current}
      </span>

      <div className="card-title">#{ticket.id} — {ticket.subject}</div>
      <div className="card-sub">{ticket.customer}</div>

      <div className="card-meta">
        <span className={`chip chip-${ticket.priority}`}>{priorityLabels[ticket.priority]}</span>
        {badges.map(badge => (
          <span className="chip" key={badge}>{badge}</span>
        ))}
        <span className="chip">{formatMinutes(ticket.minutesOpen)}</span>
      </div>

      {showDetails && (
        <div className="card-details">
          <div>შეტყობინებები: {ticket.messages}</div>
          <div>პირველი პასუხი: {ticket.firstResponse} წთ</div>
          <div>ღიაა: {ticket.minutesOpen} წუთი</div>
          <div>აგენტი: {assignedTo || '—'}</div>
        </div>
      )}

      <div className="card-actions">
        <button className="btn btn-primary btn-sm" onClick={() => onAssign(ticket.id, agents[ticket.id % agents.length])}>
          {assignedTo ? `აგენტი: ${assignedTo}` : 'აგენტის მიბმა'}
        </button>
        <button className="btn btn-sm" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'დახურვა' : 'დეტალები'}
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onResolve(ticket.id)}>
          დახურვა ✓
        </button>
      </div>
    </div>
  )
}

export default React.memo(TicketCard)
