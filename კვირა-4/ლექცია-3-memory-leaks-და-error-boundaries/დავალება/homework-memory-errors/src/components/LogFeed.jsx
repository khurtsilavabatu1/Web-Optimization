import { useEffect, useRef, useState } from 'react'

// ლოგების ბუფერი — მოდულის დონეზე, რომ კომპონენტის unmount-ის შემდეგაც
// „შენარჩუნდეს ისტორია"
const LOG_BUFFER = []

const LEVELS = ['info', 'warn', 'error']
const MESSAGES = [
  'health check OK',
  'cache miss: /api/tickets',
  'slow query: 412 ms',
  'retry: upstream timeout',
  'deploy hook received',
  'queue depth: 18',
]

export default function LogFeed() {
  const renderCount = useRef(0)
  renderCount.current++

  const [lines, setLines] = useState([])
  const [bufferSize, setBufferSize] = useState(LOG_BUFFER.length)

  useEffect(() => {
    console.log('📜 ლოგების ნაკადი დაიწყო')

    const intervalId = setInterval(() => {
      const entry = {
        ts: new Date().toLocaleTimeString('ka-GE'),
        level: LEVELS[Math.floor(Math.random() * LEVELS.length)],
        message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        // სრული კონტექსტი „დებაგისთვის"
        payload: new Array(20_000).fill('log-payload-chunk'),
      }

      LOG_BUFFER.push(entry)

      setLines(LOG_BUFFER.slice(-8))
      setBufferSize(LOG_BUFFER.length)
    }, 300)

    return () => {
      console.log('📜 ლოგების ნაკადი შეჩერდა')
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>ლაივ ლოგი</h2>
        <span className="render-badge">renders: {renderCount.current}</span>
        <span className="spacer" />
        <span className="chip chip-warn">ბუფერი: {bufferSize}</span>
      </div>
      <div className="panel-body">
        <div className="log-view">
          {lines.length === 0 ? (
            <div className="empty">ლოგი ცარიელია</div>
          ) : (
            lines.map((line, index) => (
              <div className={`log-line log-${line.level}`} key={`${line.ts}-${index}`}>
                <span className="log-ts">{line.ts}</span>
                <span className="log-level">{line.level.toUpperCase()}</span>
                <span>{line.message}</span>
              </div>
            ))
          )}
        </div>
        <p className="panel-note">
          ეკრანზე ბოლო 8 ჩანაწერი ჩანს. ბუფერში კი — {bufferSize}.
        </p>
      </div>
    </div>
  )
}
