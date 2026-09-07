function HabitCard({ habit, onToggle, onDelete, onDeleteDelayed }) {
  return (
    <li className={`habit-item ${habit.doneToday ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="habit-checkbox"
        checked={habit.doneToday}
        onChange={() => onToggle(habit.id)}
      />
      <span className="habit-text">
        {habit.title} — 🔥 {habit.streak}
      </span>
      {/* uncontrolled input — მნიშვნელობა DOM-ში ცხოვრობს და არა React-ის state-ში */}
      <input
        type="text"
        className="habit-note"
        placeholder="შენიშვნა..."
      />
      <span className="habit-time">{habit.category}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(habit.id)}
      >
        წაშლა
      </button>
      <button
        className="delete-btn"
        onClick={() => onDeleteDelayed(habit.id)}
        style={{ marginLeft: '8px' }}
      >
        5 წამში წაშლა
      </button>
    </li>
  )
}

export default HabitCard
