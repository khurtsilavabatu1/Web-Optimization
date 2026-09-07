import { useRef, useEffect } from 'react'
import { formatDuration, totalPlaylistSeconds, totalPlaylistTracks } from '../utils/playlist'

// შენიშვნა: არანაირი React.memo — App-ის ყოველ რენდერზე ესეც რენდერდება
function PlaylistPanel({ playlist, onRemoveRow, onClearPlaylist }) {
  const renderCount = useRef(0)
  renderCount.current++

  const totalSeconds = totalPlaylistSeconds(playlist)
  const totalTracks = totalPlaylistTracks(playlist)

  useEffect(() => {
    console.log('🎧 PlaylistPanel mounted')
    return () => {
      console.log('👋 PlaylistPanel will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 PlaylistPanel re-rendered. Render count:', renderCount.current, '| Rows:', playlist.length)
  })

  return (
    <div className="playlist-panel">
      <div className="playlist-header">
        <h2>პლეილისტი</h2>
        <span className="render-badge" title="რენდერების რაოდენობა">
          renders: {renderCount.current}
        </span>
      </div>

      {playlist.length === 0 ? (
        <p className="playlist-empty">პლეილისტი ცარიელია</p>
      ) : (
        <>
          <ul className="playlist-items">
            {playlist.map(item => (
              <li key={item.id} className="playlist-item">
                <div className="playlist-item-info">
                  <span className="playlist-item-title">{item.title}</span>
                  <span className="playlist-item-artist">{item.artist}</span>
                </div>
                <div className="playlist-item-actions">
                  <span className="playlist-item-count">x{item.count}</span>
                  <span className="playlist-item-duration">{formatDuration(item.duration)}</span>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveRow(item.id)}
                    title="მწკრივის წაშლა"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="playlist-footer">
            <div className="playlist-total">
              <span>სულ: {totalTracks} ტრეკი</span>
              <strong>{formatDuration(totalSeconds)}</strong>
            </div>
            <button className="clear-btn" onClick={onClearPlaylist}>
              პლეილისტის გასუფთავება
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default PlaylistPanel
