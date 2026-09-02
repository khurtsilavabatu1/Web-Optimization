function TaskCard({ task, onToggle, onDelete, onDeleteDelayed }) {
  // დროის ფორმატირება
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('ka-GE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      {/* uncontrolled input — მისი მნიშვნელობა DOM-ში ცხოვრობს და არა React-ის state-ში */}
      <input
        type="text"
        className="task-note"
        placeholder="შენიშვნა..."
      />
      <span className="task-time">{formatTime(task.createdAt)}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        წაშლა
      </button>
      <button
        className="delete-btn"
        onClick={() => onDeleteDelayed(task.id)}
        style={{ marginLeft: '8px' }}
      >
        3 წამში წაშლა
      </button>
    </li>
  )
}

export default TaskCard
