# Task Tracker

Task Tracker is a full-stack task management app for creating, organizing, filtering, and completing daily tasks. It includes a responsive React dashboard, RESTful Express API, and MongoDB persistence.

## Tech Stack

- React 18
- Node.js
- Express
- MongoDB with Mongoose
- Tailwind CSS
- Axios

## Features

- Create, read, update, and delete tasks
- Filter tasks by all, completed, and pending status
- Mark tasks complete or pending
- Sort by due date, priority, or newest task
- Track task priority and due dates
- Responsive dashboard layout
- Centralized API error handling

## Folder Structure

```text
task-tracker/
|-- client/
|   |-- public/
|   |   +-- index.html
|   |-- src/
|   |   |-- assets/
|   |   |   +-- README.md
|   |   |-- components/
|   |   |   |-- FilterTabs.js
|   |   |   |-- ProgressBar.js
|   |   |   |-- TaskForm.jsx
|   |   |   |-- TaskItem.jsx
|   |   |   +-- TaskList.jsx
|   |   |-- pages/
|   |   |   +-- Dashboard.jsx
|   |   |-- services/
|   |   |   +-- task-service.js
|   |   |-- utils/
|   |   |   |-- date-utils.js
|   |   |   +-- filter-tasks.js
|   |   |-- App.js
|   |   |-- index.css
|   |   +-- index.js
|   |-- .env.example
|   |-- package.json
|   |-- package-lock.json
|   |-- postcss.config.js
|   +-- tailwind.config.js
|-- server/
|   |-- config/
|   |   +-- db.js
|   |-- controllers/
|   |   +-- taskController.js
|   |-- middleware/
|   |   +-- errorHandler.js
|   |-- models/
|   |   +-- Task.js
|   |-- routes/
|   |   +-- TaskRoutes.js
|   |-- .env.example
|   |-- package.json
|   |-- package-lock.json
|   +-- server.js
|-- .gitignore
|-- package.json
|-- package-lock.json
+-- README.md
```

## Environment Variables

Create local `.env` files from the examples before running the app:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Client variables:

```text
REACT_APP_API_URL=http://localhost:5000
```

Server variables:

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-tracker
NODE_ENV=development
```

## Setup Instructions

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd task-tracker
```

Start the React client:

```bash
cd client
npm install
npm start
```

In a second terminal, start the Express server:

```bash
cd task-tracker/server
npm install
npm start
```

You can also run both apps from the project root after installing root dependencies:

```bash
npm install
npm run dev
```

## API

The server exposes task routes at:

```text
http://localhost:5000/api/tasks
```

Available endpoints:

- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

<!-- updated -->