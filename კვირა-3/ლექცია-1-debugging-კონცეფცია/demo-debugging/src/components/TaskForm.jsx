import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.trim()) {
      onAddTask(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="ახალი დავალება..."
      />
      <button type="submit">დამატება</button>
    </form>
  )
}

export default TaskForm
