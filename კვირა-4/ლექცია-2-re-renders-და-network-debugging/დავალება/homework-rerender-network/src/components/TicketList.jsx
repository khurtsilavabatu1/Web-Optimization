import { useRef } from 'react'
import TicketCard from './TicketCard'

export default function TicketList({ tickets, assignments, resolvedCount, onAssign, onResolve, onRestore }) {
  const renderCount = useRef(0)
  renderCount.current++

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>ტიკეტები</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
        <span className="spacer" />
        {resolvedCount > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={onRestore}>
            დახურულის დაბრუნება ({resolvedCount})
          </button>
        )}
      </div>
      <div className="panel-body">
        {tickets.length === 0 ? (
          <div className="empty">ტიკეტი ვერ მოიძებნა</div>
        ) : (
          <div className="card-grid">
            {tickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                assignedTo={assignments[ticket.id]}
                badges={[ticket.channel, `${ticket.messages} შეტყობინება`]}
                onAssign={onAssign}
                onResolve={(id) => onResolve(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
