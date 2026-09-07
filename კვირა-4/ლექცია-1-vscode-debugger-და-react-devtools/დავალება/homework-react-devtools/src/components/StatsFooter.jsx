import { useRef, useEffect } from 'react'
import { computeLibraryStats } from '../utils/stats'
import { formatDuration } from '../utils/playlist'

// შენიშვნა: არანაირი React.memo და არანაირი useMemo —
// მძიმე გამოთვლა კომპონენტის სხეულშია და ყოველ რენდერზე თავიდან ეშვება
function StatsFooter({ tracks, playlist, settings }) {
  const renderCount = useRef(0)
  renderCount.current++

  const stats = computeLibraryStats(tracks, playlist)

  useEffect(() => {
    console.log('📊 StatsFooter mounted')
    return () => {
      console.log('👋 StatsFooter will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 StatsFooter re-rendered. Render count:', renderCount.current)
  })

  return (
    <section className="stats-footer">
      <div className="stats-header">
        <h2>ბიბლიოთეკის სტატისტიკა</h2>
        <span className="render-badge" title="რენდერების რაოდენობა">
          renders: {renderCount.current}
        </span>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">საშუალო ხანგრძლივობა</span>
          <strong className="stat-value">{formatDuration(stats.averageSeconds)}</strong>
        </div>
        <div className="stat-box">
          <span className="stat-label">სულ მოსმენები</span>
          <strong className="stat-value">{stats.totalPlays.toLocaleString(settings.locale)}</strong>
        </div>
        <div className="stat-box">
          <span className="stat-label">ტოპ ჟანრი</span>
          <strong className="stat-value">{stats.topGenre}</strong>
        </div>
        <div className="stat-box">
          <span className="stat-label">პლეილისტში მოხვედრა</span>
          <strong className="stat-value">{stats.playlistShare}%</strong>
        </div>
        {settings.showFingerprint && (
          <div className="stat-box">
            <span className="stat-label">Audio fingerprint</span>
            <strong className="stat-value">{stats.fingerprint.toLocaleString(settings.locale)}</strong>
          </div>
        )}
      </div>
    </section>
  )
}

export default StatsFooter
