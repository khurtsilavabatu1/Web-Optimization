import { useRef, useEffect } from 'react'

// შენიშვნა: არანაირი React.memo — ყოველ state ცვლილებაზე ხელახლა რენდერდება
function SearchBar({ searchTerm, onSearchChange }) {
  const renderCount = useRef(0)
  renderCount.current++

  useEffect(() => {
    console.log('🔎 SearchBar mounted')
    return () => {
      console.log('👋 SearchBar will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 SearchBar re-rendered. Render count:', renderCount.current)
  })

  return (
    <div className="search-bar">
      <span className="render-badge" title="რენდერების რაოდენობა">
        renders: {renderCount.current}
      </span>
      <input
        type="text"
        placeholder="პროდუქტის ძიება..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
