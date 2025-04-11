import React from 'react';

const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-main">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id, task.completed)}
            className="task-checkbox"
          />
          
          <div className="task-info">
            <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`task-description ${task.completed ? 'completed' : ''}`}>
                {task.description}
              </p>
            )}
            
            <div className="task-meta">
              <span className="task-category">
                {task.category}
              </span>
              
              {task.dueDate && (
                <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
                  Due: {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="task-action-btn task-edit-btn"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="task-action-btn task-delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem; 