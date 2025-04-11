import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container">
          <h1>Task Mate</h1>
          <p>Your advanced to-do list app</p>
        </div>
      </header>
      <main className="container app-main">
        <TaskList />
      </main>
      <footer className="app-footer">
        <div className="container text-center">
          <p>Task Mate - Advanced To-Do List Web App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
