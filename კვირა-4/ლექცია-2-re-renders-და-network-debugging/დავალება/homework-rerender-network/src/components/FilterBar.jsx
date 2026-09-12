import { useRef } from 'react'
import { priorities } from '../data'

export default function FilterBar({ searchTerm, onSearchChange, priority, onPriorityChange, resultCount, totalCount }) {
  const renderCount = useRef(0)
  renderCount.current++

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>ფილტრი</h2>
        <span className="spacer" />
        <span className="render-badge" title="FilterBar-ის რენდერების რაოდენობა">
          renders: {renderCount.current}
        </span>
      </div>
      <div className="panel-body">
        <div className="toolbar">
          <input
            className="input"
            type="text"
            placeholder="ძიება თემით ან კლიენტით..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <select
            className="select"
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value)}
          >
            {priorities.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <span className="result-count">
            ნაპოვნია: <strong>{resultCount}</strong> / {totalCount}
          </span>
        </div>
      </div>
    </div>
  )
}
