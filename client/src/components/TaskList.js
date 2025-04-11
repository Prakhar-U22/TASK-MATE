import React, { useState, useEffect } from 'react';
import taskService from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Available categories
  const categories = ['Work', 'Personal', 'Study', 'Health', 'Other'];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  const handleTaskComplete = async (id, completed) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const updatedTask = await taskService.updateTask(id, { ...taskToUpdate, completed: !completed });
      
      setTasks(tasks.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchTasks();
      return;
    }
    
    try {
      setLoading(true);
      const data = await taskService.searchTasks(searchQuery);
      setTasks(data);
    } catch (err) {
      setError('Failed to search tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setCategoryFilter(category);
    
    if (!category) {
      fetchTasks();
      return;
    }
    
    try {
      setLoading(true);
      const data = await taskService.filterTasksByCategory(category);
      setTasks(data);
    } catch (err) {
      setError('Failed to filter tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (taskData) => {
    try {
      if (editTask) {
        // Update existing task
        const updatedTask = await taskService.updateTask(editTask._id, taskData);
        setTasks(tasks.map(task => 
          task._id === editTask._id ? updatedTask : task
        ));
      } else {
        // Create new task
        const newTask = await taskService.createTask(taskData);
        setTasks([...tasks, newTask]);
      }
      
      setShowForm(false);
      setEditTask(null);
    } catch (err) {
      setError('Failed to save task. Please try again.');
      console.error(err);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditTask(null);
  };

  if (loading && tasks.length === 0) {
    return <div className="loading-container">Loading tasks...</div>;
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="task-list-title">Task Mate</h2>
        
        {/* Search & Filter */}
        <div className="task-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tasks..."
              className="form-control search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
          
          <div className="filter-container">
            <label className="form-label">Filter by Category:</label>
            <select 
              value={categoryFilter} 
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="form-control"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleAddTask}
            className="btn btn-success add-task-btn"
          >
            Add Task
          </button>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="task-error">
            {error}
          </div>
        )}
      </div>

      {/* Task Form */}
      {showForm && (
        <TaskForm 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancelForm} 
          task={editTask}
          categories={categories}
        />
      )}

      {/* Task List */}
      <div className="card">
        {tasks.length === 0 ? (
          <div className="empty-list">
            No tasks found. Add a new task to get started!
          </div>
        ) : (
          <ul className="task-items">
            {tasks.map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                onToggleComplete={handleTaskComplete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList; 