# Task Mate - Advanced To-Do List Web App

Task Mate is a full-stack web application built with React, Node.js, Express, and MongoDB that helps you manage your tasks efficiently.

## Features

- Add tasks with title, description, due date, and category
- Edit existing tasks
- Delete tasks
- Mark tasks as completed/incomplete
- Search tasks by title or description
- Filter tasks by category
- Mobile-responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB

## Project Structure

The project is organized into two main directories:

- `client`: React frontend application
- `server`: Node.js/Express backend application

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)

### Backend Setup

1. Navigate to the server directory:
   ```
   cd task-mate/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd task-mate/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/search/:query` - Search tasks
- `GET /api/tasks/category/:category` - Filter tasks by category 