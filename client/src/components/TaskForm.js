import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, onCancel, task, categories }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: categories[0],
    completed: false
  });

  // Populate form if editing existing task
  useEffect(() => {
    if (task) {
      const dueDateFormatted = task.dueDate 
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';
      
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: dueDateFormatted,
        category: task.category || categories[0],
        completed: task.completed || false
      });
    }
  }, [task, categories]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="task-form">
      <h3 className="form-title">
        {task ? 'Edit Task' : 'Add New Task'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Task title"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Task description"
            rows="3"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-checkbox">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          <label htmlFor="completed">Mark as completed</label>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;