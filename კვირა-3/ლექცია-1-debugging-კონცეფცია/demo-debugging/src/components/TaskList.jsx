import TaskCard from './TaskCard'

function TaskList({ tasks, onToggle, onDelete, onDeleteDelayed }) {
  if (tasks.length === 0) {
    return (
      <ul className="task-list">
        <li className="empty-state">დავალებები არ არის</li>
      </ul>
    )
  }

  return (
    <ul className="task-list">
      {/* BUG #5: Wrong Key Prop - array index-ს ვიყენებთ key-დ */}
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id} // უნდა იყოს task.id!
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onDeleteDelayed={onDeleteDelayed}
        />
      ))}
    </ul>
  )
}

export default TaskList
