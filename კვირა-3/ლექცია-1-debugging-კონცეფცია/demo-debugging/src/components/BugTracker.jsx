import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import TimerBadge from './TimerBadge'

function BugTracker() {
  // State მართვა
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [filteredTasks, setFilteredTasks] = useState([])
  const [addCounter, setAddCounter] = useState(0)

  // დავალების დამატება
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: Date.now()
    }

    // BUG #6: Async Race Condition
    // სიმულირებული API call რომელიც ძველ state-ს იყენებს
    setTimeout(() => {
      // აქ tasks არის stale — ძველი მნიშვნელობა closure-დან
      setTasks([...tasks, newTask])
    }, 100)

    // Timer reset
    setAddCounter(prev => prev + 1)
  }

  // დავალების წაშლა
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // დავალების წაშლა დაგვიანებით (stale closure bug-ისთვის)
  const deleteTaskDelayed = (id) => {
    setTimeout(() => {
      // BUG #4: Stale Closure
      // tasks აქ არის closure-ში დაფიქსირებული ძველი მნიშვნელობა
      setTasks(prev => prev.filter(task => task.id !== id))
    }, 3000)
  }

  // დავალების სტატუსის ცვლილება
  const toggleTask = (id) => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ))
}

  // შესრულებულების წაშლა
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  // BUG #3: Missing useEffect Dependency
  // filter არ არის dependency array-ში, ამიტომ ფილტრაცია არ განახლდება
  useEffect(() => {
    if (filter === 'all') {
      setFilteredTasks(tasks)
    } else if (filter === 'active') {
      setFilteredTasks(tasks.filter(task => !task.completed))
    } else if (filter === 'completed') {
      setFilteredTasks(tasks.filter(task => task.completed))
    }
  }, [tasks,filter]) // filter აკლია!


  // აქტიური დავალებების რაოდენობა
  const activeCount = tasks.filter(task => !task.completed).length

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

      <TaskForm onAddTask={addTask} />

      {/* ფილტრის ღილაკები */}
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
          აქტიური
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          შესრულებული
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onDeleteDelayed={deleteTaskDelayed}
      />

      {/* Footer ინფორმაცია */}
      <div className="task-footer">
        <span className="task-counter">
          {activeCount} დავალება დარჩენილია
        </span>
        <button className="clear-completed-btn" onClick={clearCompleted}>
          შესრულებულების წაშლა
        </button>
      </div>

      {/* დრო ბოლო დამატებიდან — ცალკე კომპონენტში, BUG #1 აქ არის */}
      {tasks.length > 0 && (
        <TimerBadge onReset={addCounter} />
      )}
    </div>
  )
}

export default BugTracker
