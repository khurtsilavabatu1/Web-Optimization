import { useRef, useEffect } from 'react'
import TrackCard from './TrackCard'

// შენიშვნა: არანაირი React.memo — App-ის ყოველ რენდერზე ესეც რენდერდება
function TrackList({ tracks, dismissedCount, onAddTrack, onDismissTrack, onRestoreDismissed }) {
  const renderCount = useRef(0)
  renderCount.current++

  useEffect(() => {
    console.log('📋 TrackList mounted')
    return () => {
      console.log('👋 TrackList will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 TrackList re-rendered. Render count:', renderCount.current, '| Tracks:', tracks.length)
  })

  return (
    <div className="track-list">
      <div className="track-list-header">
        <h2>რეკომენდაციები ({tracks.length})</h2>
        <span className="render-badge" title="რენდერების რაოდენობა">
          renders: {renderCount.current}
        </span>
        {dismissedCount > 0 && (
          <button className="restore-btn" onClick={onRestoreDismissed}>
            დამალულის დაბრუნება ({dismissedCount})
          </button>
        )}
      </div>

      {tracks.length === 0 ? (
        <div className="empty-state">ტრეკი ვერ მოიძებნა</div>
      ) : (
        <div className="tracks-grid">
          {tracks.map((track, index) => (
            <TrackCard
              key={index}
              track={track}
              onAddTrack={onAddTrack}
              onDismissTrack={onDismissTrack}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TrackList
