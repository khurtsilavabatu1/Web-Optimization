import HabitCard from './HabitCard'

function HabitList({ habits, onToggle, onDelete, onDeleteDelayed }) {
  if (habits.length === 0) {
    return (
      <ul className="habit-list">
        <li className="empty-state">ჩვევები არ არის</li>
      </ul>
    )
  }

  return (
    <ul className="habit-list">
      {habits.map((habit, index) => (
        <HabitCard
          key={index}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
          onDeleteDelayed={onDeleteDelayed}
        />
      ))}
    </ul>
  )
}

export default HabitList
