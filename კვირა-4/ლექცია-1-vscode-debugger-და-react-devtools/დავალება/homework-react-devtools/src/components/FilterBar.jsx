import { useRef, useEffect } from 'react'

// შენიშვნა: არანაირი React.memo — App-ის ყოველ რენდერზე ესეც რენდერდება
function FilterBar({ searchTerm, onSearchChange, genre, genres, onGenreChange, resultCount }) {
  const renderCount = useRef(0)
  renderCount.current++

  useEffect(() => {
    console.log('🔎 FilterBar mounted')
    return () => {
      console.log('👋 FilterBar will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 FilterBar re-rendered. Render count:', renderCount.current)
  })

  return (
    <div className="filter-bar">
      <span className="render-badge" title="რენდერების რაოდენობა">
        renders: {renderCount.current}
      </span>

      <input
        type="text"
        className="filter-search"
        placeholder="ტრეკის ძიება სათაურით..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="filter-genre"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        {genres.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <span className="filter-result-count">ნაპოვნია: {resultCount}</span>
    </div>
  )
}

export default FilterBar
