import { useRef, useEffect, useState } from 'react'
import { formatDuration } from '../utils/playlist'

// შენიშვნა: არანაირი React.memo — მშობლის ყოველ რენდერზე ესეც რენდერდება
function TrackCard({ track, onAddTrack, onDismissTrack }) {
  const renderCount = useRef(0)
  renderCount.current++

  // ლოკალური state — „დეტალების" გახსნა/დახურვა
  const [showDetails, setShowDetails] = useState(false)

  // ref-ი მხოლოდ ლოგისთვის, რომ unmount-ზე მიმდინარე სათაური დაიბეჭდოს
  const titleRef = useRef(track.title)
  titleRef.current = track.title

  useEffect(() => {
    console.log(`🎵 TrackCard mounted: ${titleRef.current}`)
    return () => {
      console.log(`👋 TrackCard unmounted: ${titleRef.current}`)
    }
  }, [])

  useEffect(() => {
    console.log(`🔄 TrackCard (${track.title}) re-rendered. Render count:`, renderCount.current)
  })

  return (
    <div className={`track-card ${showDetails ? 'expanded' : ''}`}>
      <span className="render-badge" title="რენდერების რაოდენობა">
        renders: {renderCount.current}
      </span>

      <div className="track-info">
        <h3 className="track-title">{track.title}</h3>
        <span className="track-artist">{track.artist}</span>
        <div className="track-meta">
          <span className="track-genre">{track.genre}</span>
          <span className="track-duration">{formatDuration(track.duration)}</span>
        </div>
      </div>

      {showDetails && (
        <div className="track-details">
          <div>მოსმენები: {track.plays.toLocaleString('ka-GE')}</div>
          <div>ხანგრძლივობა წამებში: {track.duration}</div>
          <div>ID: {track.id}</div>
        </div>
      )}

      <div className="track-actions">
        <button className="add-btn" onClick={() => onAddTrack(track)}>
          პლეილისტში დამატება
        </button>
        <button
          className="details-btn"
          onClick={() => setShowDetails(prev => !prev)}
        >
          {showDetails ? 'დეტალების დახურვა' : 'დეტალები'}
        </button>
        <button
          className="dismiss-btn"
          onClick={() => onDismissTrack(track.id)}
          title="არ მომწონს — სიიდან დამალვა"
        >
          🚫
        </button>
      </div>
    </div>
  )
}

export default TrackCard
