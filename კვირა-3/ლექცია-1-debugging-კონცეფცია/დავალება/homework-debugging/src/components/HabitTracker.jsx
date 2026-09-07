import { useState, useEffect } from 'react'
import HabitForm from './HabitForm'
import HabitList from './HabitList'
import StreakBadge from './StreakBadge'

function HabitTracker() {
  const [habits, setHabits] = useState([])
  const [filter, setFilter] = useState('all')
  const [visibleHabits, setVisibleHabits] = useState([])
  const [addCounter, setAddCounter] = useState(0)

  // ჩვევის დამატება — სიმულირებული API call
  const addHabit = (title, category) => {
    const newHabit = {
      id: Date.now(),
      title,
      category,
      doneToday: false,
      streak: 0,
      createdAt: Date.now()
    }

    setTimeout(() => {
      setHabits([...habits, newHabit])
    }, 150)

    setAddCounter(addCounter + 1)
  }

  // დღევანდელი სტატუსის ცვლილება
  const toggleHabit = (id) => {
    const habit = habits.find(h => h.id === id)

    habit.doneToday = !habit.doneToday
    habit.streak = habit.doneToday ? habit.streak + 1 : habit.streak - 1

    setHabits(habits)
  }

  // ჩვევის წაშლა
  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  // ჩვევის წაშლა 5 წამში (გადაფიქრების დრო)
  const deleteHabitDelayed = (id) => {
    setTimeout(() => {
      setHabits(habits.filter(habit => habit.id !== id))
    }, 5000)
  }

  // შესრულებულების წაშლა
  const clearDone = () => {
    setHabits(habits.filter(habit => !habit.doneToday))
  }

  // ფილტრაცია
  useEffect(() => {
    if (filter === 'all') {
      setVisibleHabits(habits)
    } else if (filter === 'active') {
      setVisibleHabits(habits.filter(habit => !habit.doneToday))
    } else if (filter === 'done') {
      setVisibleHabits(habits.filter(habit => habit.doneToday))
    }
  }, [habits])

  const activeCount = habits.filter(habit => !habit.doneToday).length

  return (
    <div className="habit-manager">
      <h2>Habit Tracker</h2>

      <HabitForm onAddHabit={addHabit} />

      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          ყველა
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          შესასრულებელი
        </button>
        <button
          className={`filter-btn ${filter === 'done' ? 'active' : ''}`}
          onClick={() => setFilter('done')}
        >
          შესრულებული
        </button>
      </div>

      <HabitList
        habits={visibleHabits}
        onToggle={toggleHabit}
        onDelete={deleteHabit}
        onDeleteDelayed={deleteHabitDelayed}
      />

      <div className="habit-footer">
        <span className="habit-counter">
          {activeCount} ჩვევა დარჩენილია დღეს
        </span>
        <button className="clear-completed-btn" onClick={clearDone}>
          შესრულებულების წაშლა
        </button>
      </div>

      {habits.length > 0 && (
        <StreakBadge onReset={addCounter} />
      )}
    </div>
  )
}

export default HabitTracker
