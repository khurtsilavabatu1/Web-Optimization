import './StyleToggle.css'

export default function StyleToggle({ useModern, onToggle }) {
  return (
    <div className="style-toggle">
      <button
        className={`toggle-btn ${!useModern ? 'active' : ''}`}
        onClick={onToggle}
      >
        Fallback CSS
      </button>
      <div className="toggle-switch" onClick={onToggle}>
        <div className={`toggle-slider ${useModern ? 'modern' : 'fallback'}`}></div>
      </div>
      <button
        className={`toggle-btn ${useModern ? 'active' : ''}`}
        onClick={onToggle}
      >
        თანამედროვე CSS
      </button>
    </div>
  )
}
