import { useState, useRef, useEffect } from 'react'
import FilterBar from './components/FilterBar'
import TrackList from './components/TrackList'
import PlaylistPanel from './components/PlaylistPanel'
import StatsFooter from './components/StatsFooter'
import SymptomPanel from './components/SymptomPanel'

// ===== მუსიკის ბიბლიოთეკა =====
const library = [
  { id: 1,  title: 'Midnight Drive', artist: 'Nika Room',   genre: 'ელექტრონული', duration: 225, plays: 18420 },
  { id: 2,  title: 'Neon Rain',      artist: 'Nika Room',   genre: 'ელექტრონული', duration: 245, plays: 9310  },
  { id: 3,  title: 'Paper Boats',    artist: 'Salome Vale', genre: 'პოპი',        duration: 198, plays: 24150 },
  { id: 4,  title: 'Solar Wind',     artist: 'Kirchi',      genre: 'როკი',        duration: 342, plays: 5120  },
  { id: 5,  title: 'Blue Marani',    artist: 'Trio Nabadi', genre: 'ჯაზი',        duration: 310, plays: 3640  },
  { id: 6,  title: 'Echo Chamber',   artist: 'Kirchi',      genre: 'როკი',        duration: 288, plays: 7830  },
  { id: 7,  title: 'Night Bus',      artist: 'Salome Vale', genre: 'პოპი',        duration: 154, plays: 15600 },
  { id: 8,  title: 'Amber Light',    artist: 'Trio Nabadi', genre: 'ჯაზი',        duration: 203, plays: 2410  },
  { id: 9,  title: 'Slow Motion',    artist: 'Nika Room',   genre: 'ელექტრონული', duration: 260, plays: 11200 },
  { id: 10, title: 'First Frost',    artist: 'Kirchi',      genre: 'როკი',        duration: 129, plays: 4300  },
]

const genres = ['ყველა', 'ელექტრონული', 'პოპი', 'როკი', 'ჯაზი']

function App() {
  const renderCount = useRef(0)
  renderCount.current++

  const [tracks] = useState(library)
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('ყველა')
  const [playlist, setPlaylist] = useState([])
  const [dismissedIds, setDismissedIds] = useState([])

  useEffect(() => {
    console.log('🎯 App mounted')
    return () => {
      console.log('👋 App will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔍 Search term changed:', JSON.stringify(searchTerm), '| genre:', genre)
  }, [searchTerm, genre])

  useEffect(() => {
    console.log('🎧 Playlist changed. Rows:', playlist.length)
  }, [playlist])

  // ფილტრაცია — ყოველ აკრეფაზე ხელახლა ეშვება (არ არის useMemo)
  const visibleTracks = tracks.filter(track => {
    if (dismissedIds.includes(track.id)) return false
    if (genre !== 'ყველა' && track.genre !== genre) return false

    return track.title.includes(searchTerm)
  })

  // პლეილისტში დამატება — ყოველ რენდერზე ახალი ფუნქცია იქმნება (არ არის useCallback)
  const handleAddTrack = (track) => {
    console.log('➕ Adding to playlist:', track.title)
    setPlaylist(prevPlaylist => {
      const existing = prevPlaylist.find(item => item.id === track.trackId)

      if (existing) {
        return prevPlaylist.map(item =>
          item.id === track.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      }

      return [...prevPlaylist, { ...track, count: 1 }]
    })
  }

  // პლეილისტიდან მწკრივის წაშლა
  const handleRemoveRow = (trackId) => {
    console.log('➖ Removing playlist row, track ID:', trackId)
    setPlaylist(prevPlaylist => prevPlaylist.filter(item => item.id !== trackId))
  }

  // პლეილისტის გასუფთავება
  const handleClearPlaylist = () => {
    console.log('🗑️ Clearing playlist')
    setPlaylist([])
  }

  // „არ მომწონს" — ტრეკი რეკომენდაციების სიიდან ქრება
  const handleDismissTrack = (trackId) => {
    console.log('🚫 Dismissing track ID:', trackId)
    setDismissedIds(prevIds => [...prevIds, trackId])
  }

  const handleRestoreDismissed = () => {
    console.log('↩️ Restoring dismissed tracks')
    setDismissedIds([])
  }

  console.log('🔄 App rendering. Render count:', renderCount.current)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Playlist Studio</h1>
        <span className="render-badge header-badge" title="App კომპონენტის რენდერების რაოდენობა">
          App renders: {renderCount.current}
        </span>
        <p className="app-subtitle">
          React DevTools-ის დავალება — Components ხე, Profiler და VS Code Debugger
        </p>
      </header>

      <div className="app-layout">
        <div className="main-content">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            genre={genre}
            genres={genres}
            onGenreChange={setGenre}
            resultCount={visibleTracks.length}
          />
          <TrackList
            tracks={visibleTracks}
            dismissedCount={dismissedIds.length}
            onAddTrack={handleAddTrack}
            onDismissTrack={handleDismissTrack}
            onRestoreDismissed={handleRestoreDismissed}
          />
        </div>

        <aside className="sidebar">
          <PlaylistPanel
            playlist={playlist}
            onRemoveRow={handleRemoveRow}
            onClearPlaylist={handleClearPlaylist}
          />
        </aside>
      </div>

      <StatsFooter
        tracks={tracks}
        playlist={playlist}
        settings={{ showFingerprint: true, locale: 'ka-GE' }}
      />

      <SymptomPanel />
    </div>
  )
}

export default App
