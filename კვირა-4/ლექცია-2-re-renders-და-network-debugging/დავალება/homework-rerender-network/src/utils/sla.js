// SLA-ს ანგარიში — „მძიმე" გამოთვლა, რომელიც რეალურ პროექტში
// დიდი მასივის აგრეგაციას ან სტატისტიკის დათვლას შეესაბამება.
const HEAVY_ITERATIONS = 2_000_000

export function computeSlaReport(ticketList, assignments) {
  const startedAt = performance.now()

  // === მძიმე ციკლი (იმიტაცია) ===
  let checksum = 0
  for (let i = 0; i < HEAVY_ITERATIONS; i++) {
    checksum += Math.sqrt(i % 97) * Math.sin(i % 31)
  }

  const breached = ticketList.filter(t => t.minutesOpen > 240).length
  const atRisk = ticketList.filter(t => t.minutesOpen > 120 && t.minutesOpen <= 240).length
  const assigned = ticketList.filter(t => assignments[t.id]).length

  const totalFirstResponse = ticketList.reduce((sum, t) => sum + t.firstResponse, 0)
  const avgFirstResponse = ticketList.length
    ? Math.round(totalFirstResponse / ticketList.length)
    : 0

  const durationMs = Math.round(performance.now() - startedAt)
  console.log('📊 computeSlaReport გაშვებულია.', durationMs, 'ms')

  return { breached, atRisk, assigned, avgFirstResponse, durationMs, checksum: Math.round(checksum) }
}

export function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours === 0) return `${minutes} წთ`
  return `${hours} სთ ${minutes} წთ`
}

export function filterTickets(ticketList, searchTerm, priority) {
  const term = searchTerm.trim().toLowerCase()

  return ticketList.filter(ticket => {
    if (priority !== 'all' && ticket.priority !== priority) return false
    if (!term) return true
    return (
      ticket.subject.toLowerCase().includes(term) ||
      ticket.customer.toLowerCase().includes(term)
    )
  })
}
