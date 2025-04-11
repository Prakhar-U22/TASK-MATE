import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API service functions
export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await apiClient.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (id) => {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with id ${id}:`, error);
      throw error;
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await apiClient.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task with id ${id}:`, error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting task with id ${id}:`, error);
      throw error;
    }
  },

  // Search tasks
  searchTasks: async (query) => {
    try {
      const response = await apiClient.get(`/tasks/search/${query}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching tasks with query "${query}":`, error);
      throw error;
    }
  },

  // Filter tasks by category
  filterTasksByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/tasks/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error filtering tasks by category "${category}":`, error);
      throw error;
    }
  }
};

export default taskService; 