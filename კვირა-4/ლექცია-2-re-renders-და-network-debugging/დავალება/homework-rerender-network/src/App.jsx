import { useState, useMemo, useEffect, useRef } from 'react'
import FilterBar from './components/FilterBar'
import TicketList from './components/TicketList'
import SlaPanel from './components/SlaPanel'
import ApiPanel from './components/ApiPanel'
import SymptomPanel from './components/SymptomPanel'
import { tickets as ticketLibrary } from './data'
import { filterTickets } from './utils/sla'

function App() {
  const renderCount = useRef(0)
  renderCount.current++

  const [tickets] = useState(ticketLibrary)
  const [searchTerm, setSearchTerm] = useState('')
  const [priority, setPriority] = useState('all')
  const [assignments, setAssignments] = useState({})
  const [resolvedIds, setResolvedIds] = useState([])

  useEffect(() => {
    console.log('🎯 App mounted')
  }, [])

  useEffect(() => {
    console.log('🔍 ფილტრი შეიცვალა:', JSON.stringify(searchTerm), '| priority:', priority)
  }, [searchTerm, priority])

  const openTickets = tickets.filter(ticket => !resolvedIds.includes(ticket.id))

  const visibleTickets = useMemo(
    () => filterTickets(openTickets, searchTerm, priority),
    [tickets, priority, resolvedIds]
  )

  const handleAssign = (ticketId, agentName) => {
    console.log('👤 აგენტის მიბმა:', ticketId, agentName)
    setAssignments(prev => ({ ...prev, [ticketId]: agentName }))
  }

  const handleResolve = (ticketId) => {
    console.log('✓ ტიკეტის დახურვა:', ticketId)
    setResolvedIds(prev => [...prev, ticketId])
  }

  const handleRestore = () => {
    console.log('↩️ დახურული ტიკეტების დაბრუნება')
    setResolvedIds([])
  }

  console.log('🔄 App rendering. Render count:', renderCount.current)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Support Inbox</h1>
        <span className="render-badge header-badge">App renders: {renderCount.current}</span>
        <p className="app-subtitle">
          დავალება — ზედმეტი რენდერები, memoization და Network debugging
        </p>
      </header>

      <div className="app-layout">
        <div className="main-content">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            priority={priority}
            onPriorityChange={setPriority}
            resultCount={visibleTickets.length}
            totalCount={openTickets.length}
          />
          <TicketList
            tickets={visibleTickets}
            assignments={assignments}
            resolvedCount={resolvedIds.length}
            onAssign={handleAssign}
            onResolve={handleResolve}
            onRestore={handleRestore}
          />
          <ApiPanel />
        </div>

        <aside className="sidebar">
          <SlaPanel
            tickets={openTickets}
            assignments={assignments}
            thresholds={{ breachMinutes: 240, riskMinutes: 120 }}
          />
        </aside>
      </div>

      <SymptomPanel />
    </div>
  )
}

export default App
