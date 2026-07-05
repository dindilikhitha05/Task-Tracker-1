# Task Tracker

Monorepo with a Create React App frontend and a Node/Express + MongoDB backend.

Structure
- `client/` — React frontend (Create React App) using Axios and Tailwind CSS.
- `backend/` — Express API with Mongoose models.

Running locally

Prerequisites: Node.js, npm, MongoDB (local or Atlas).

1) Backend

 - Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` (e.g., `mongodb://localhost:27017/task-tracker`).
 - From the `backend/` folder:

```bash
npm install
npm run dev   # requires nodemon (dev) or `npm start` to run normally
```

2) Frontend

 - Copy `client/.env.example` to `client/.env` and set `REACT_APP_API_URL` (e.g., `http://localhost:5000`).
 - From the `client/` folder:

```bash
npm install
npm start
```

Environment variables
- Backend: `MONGO_URI`, `PORT` (optional)
- Frontend: `REACT_APP_API_URL`

Deployment notes
- The frontend is CRA; you can deploy it to Vercel/Netlify. Ensure `REACT_APP_API_URL` points to the deployed backend URL.
- The backend can be deployed to Render, Heroku, or any Node-capable host. Use a managed MongoDB (Atlas) and set `MONGO_URI` accordingly.
# Task Tracker

A full-stack MERN task tracking application with CRUD operations, status filtering, responsive UI, loading states, and basic validation.

## Features
- Add, edit, delete, and toggle tasks
- Filter tasks by All, Completed, and Pending
- Responsive Tailwind-powered interface
- RESTful API with MongoDB persistence
- Loading and empty states

## Project Structure
- client/src/components: reusable UI components
- client/src/pages: dashboard page
- client/src/services: Axios API helpers
- server/controllers: task business logic
- server/models: Mongoose Task schema
- server/routes: API endpoints

## Setup Instructions
### 1. Install root dependencies
```bash
npm install
```

### 2. Start the backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 3. Start the frontend
```bash
cd client
npm install
npm start
```

### 4. Run both together
```bash
npm run dev
```

## API Documentation
### Base URL
```text
http://localhost:5000/api/tasks
```

### Endpoints
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

### Example Requests
#### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write report","description":"Finish the weekly update","status":"pending"}'
```

#### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"title":"Write report","status":"completed"}'
```

#### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/:id
```

## Screenshots / GIF Placeholder
Add screenshots of the dashboard and task form here once the app is running locally.
