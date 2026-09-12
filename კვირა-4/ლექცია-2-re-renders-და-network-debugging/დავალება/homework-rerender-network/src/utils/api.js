// ===== API ფუნქციები =====
// ლოკალური endpoint-ები (`public/` ფოლდერიდან) — მუშაობს ინტერნეტის გარეშეც:
//   /tickets.json        → არსებობს (200)
//   /tickets-archive.json → არ არსებობს (404)
// დისტანციური endpoint — TTFB / Headers / CORS სავარჯიშოებისთვის:
export const REMOTE_URL = 'https://jsonplaceholder.typicode.com/users'
export const CORS_URL = 'https://example.com/api/tickets'

export async function loadJson(url) {
  const startedAt = performance.now()

  const response = await fetch(url, { headers: { Accept: 'application/json' } })
  const text = await response.text()

  let data = []
  try {
    data = JSON.parse(text)
  } catch {
    // არასწორი JSON — ცარიელ მასივად ჩავთვლით, რომ აპლიკაცია „არ გატყდეს"
    data = []
  }

  const ms = Math.round(performance.now() - startedAt)
  console.log('🌐 loadJson:', url, '| status:', response.status, '|', ms, 'ms')

  return { data, status: response.status, statusText: response.statusText, ms }
}

// დაშბორდის მონაცემები — სამი დამოუკიდებელი endpoint
export async function loadDashboard() {
  const startedAt = performance.now()

  const ticketsResult = await loadJson('/tickets.json')
  const agentsResult = await loadJson('/agents.json')
  const targetsResult = await loadJson('/sla-targets.json')

  const totalMs = Math.round(performance.now() - startedAt)

  return {
    tickets: ticketsResult.data,
    agents: agentsResult.data,
    targets: targetsResult.data,
    parts: [ticketsResult.ms, agentsResult.ms, targetsResult.ms],
    totalMs,
  }
}
