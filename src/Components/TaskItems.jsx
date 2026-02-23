function TaskItem({ task, onToggleCompleted, onToggleImportant, onDelete }) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleCompleted(task.id)}
      />
      <span>{task.text}</span>

      <button onClick={() => onToggleImportant(task.id)}>
        {task.important ? "★" : "☆"}
      </button>

      <button onClick={() => onDelete(task.id)}>Sil</button>
    </div>
  );
}

export default TaskItem;