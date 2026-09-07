import { useState } from 'react'

const CATEGORIES = ['ჯანმრთელობა', 'სწავლა', 'პროდუქტიულობა']

function HabitForm({ onAddHabit }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim()) {
      onAddHabit(title.trim(), category)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="ახალი ჩვევა..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">დამატება</button>
    </form>
  )
}

export default HabitForm
