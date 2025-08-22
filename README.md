# InternSphere — Intern & Manager Portal (MERN)

**Live:** https://internsphere-kdqj.onrender.com/

InternSphere helps managers assign tasks, track attendance and feedback, and lets interns submit work and see progress — all in one place.

## Features

### Managers
- Login to see interns
- Assign tasks with deadlines (email sent to intern)
- View intern progress (tasks, attendance, submissions)
- Give feedback and ratings
- See work submissions per intern

### Interns
- Login to see assigned tasks
- Update task status & submit work
- Mark attendance (check-in/check-out)
- View feedback and progress chart

## Tech Stack
- **Frontend:** React (Vite), Redux Toolkit, React Router, Tailwind CSS, react-hot-toast, Recharts  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Nodemailer  
- **Deploy:** Render

## Setup
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
