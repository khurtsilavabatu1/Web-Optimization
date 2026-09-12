// ===== იმიტირებული მონიტორინგის API =====
// დაყოვნება თითოეული სერვერისთვის ფიქსირებულია — ეს აუცილებელია, რომ
// „ვინ პირველი დაბრუნდა" სცენარი ყოველთვის ერთნაირად გამეორდეს.
const SERVERS = {
  'srv-1': { name: 'srv-1 · Frankfurt', delayMs: 2000, cpu: 74, memory: 61, rps: 1840 },
  'srv-2': { name: 'srv-2 · Tbilisi',   delayMs: 400,  cpu: 38, memory: 44, rps: 920  },
  'srv-3': { name: 'srv-3 · Warsaw',    delayMs: 1200, cpu: 56, memory: 72, rps: 1310 },
}

export const serverIds = Object.keys(SERVERS)

export function serverLabel(serverId) {
  return SERVERS[serverId]?.name ?? serverId
}

export function serverDelay(serverId) {
  return SERVERS[serverId]?.delayMs ?? 0
}

export function fetchServerMetrics(serverId, options = {}) {
  const server = SERVERS[serverId]

  return new Promise((resolve, reject) => {
    if (!server) {
      reject(new Error(`უცნობი სერვერი: ${serverId}`))
      return
    }

    console.log(`📡 მეტრიკის მოთხოვნა: ${serverId} (დაყოვნება ${server.delayMs} ms)`)

    const timer = setTimeout(() => {
      resolve({
        id: serverId,
        name: server.name,
        cpu: server.cpu + Math.round(Math.random() * 6 - 3),
        memory: server.memory + Math.round(Math.random() * 4 - 2),
        rps: server.rps + Math.round(Math.random() * 80 - 40),
        receivedAt: new Date().toLocaleTimeString('ka-GE'),
      })
    }, server.delayMs)

    // AbortController-ის მხარდაჭერა — გამოსწორებაში დაგჭირდებათ
    if (options.signal) {
      options.signal.addEventListener('abort', () => {
        clearTimeout(timer)
        const abortError = new Error('მოთხოვნა გაუქმდა')
        abortError.name = 'AbortError'
        reject(abortError)
      })
    }
  })
}
