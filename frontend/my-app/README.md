InternSphere — Intern & Manager Portal (MERN) : 

Live site: https://internsphere-kdqj.onrender.com/

InternSphere helps managers assign tasks, track attendance and feedback, and lets interns submit work and see progress — all in one place.

🚀 Features

For Managers

Login to see Interns.

Assign tasks with deadlines

View intern progress (tasks, attendance, submissions)

Give feedback and ratings

See work submissions per intern

Email notification to intern on task assignment (Nodemailer)

For Interns

Login to see assigned tasks

Update task status (pending / completed) & submit work

Mark attendance (check-in / check-out) or auto check-in on login (optional)

View feedback and progress chart (pie chart)

🧰 Tech Stack

Frontend: React (Vite), Redux Toolkit, React Router, Tailwind CSS, react-hot-toast, Recharts

Backend: Node.js, Express.js, MongoDB (Mongoose), JWT Auth, Nodemailer

Deployment: Render / (any Node hosting)

Build Tools: Vite, Nodemon

📁 Project Structure

root/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   ├── attendanceController.js
│   │   ├── feedbackController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Attendance.js
│   │   ├── Feedback.js
│   │   └── Work.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── InternDashboard.jsx
    │   │   ├── ManagerDashboard.jsx
    │   │   ├── TaskDetail.jsx
    │   │   └── InternProgress.jsx
    │   ├── redux/
    │   │   ├── store.js
    │   │   └── authSlice.js
    │   ├── utils/constant.js
    │   └── main.jsx / App.jsx / routes
    ├── index.html
    └── package.json

🔐 Environment Variables

Create backend/.env:

MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/intern-sphere
JWT_SECRET=your_jwt_secret_here
PORT=5000

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password   # Use App Password if Gmail


Create frontend/src/utils/constant.js:

export const backendUrl = import.meta.env.VITE_API_BASE || "http://localhost:5000";


Create frontend/.env (optional):

VITE_API_BASE=http://localhost:5000

▶️ Local Setup
1) Backend
cd backend
npm install
npm run dev    # or: npm start

2) Frontend
cd frontend
npm install
npm run dev


Open: http://localhost:5173 (default Vite port)

🔑 Auth & Roles

Roles: manager, intern

Login returns a JWT token. Send it in headers:

Authorization: Bearer <token>

📡 API Overview (Quick)
Auth

POST /api/auth/register – { name, email, password, role }

POST /api/auth/login – { email, password } → { token, user }

Tasks

POST /api/tasks (manager) – { title, description, deadline, internId } → sends email to intern

PUT /api/tasks/:taskId/status (manager)

GET /api/tasks/intern/:internId (manager) – tasks for a specific intern

GET /api/tasks/my-tasks (intern)

GET /api/tasks/:taskId – task detail

Work Submissions

PUT /api/tasks/:taskId/submit (intern) – { work } (if using submit-on-task)

or POST /api/work (intern) – { title, description, fileUrl }

GET /api/work/:internId (manager) – list intern’s submissions

Attendance

POST /api/attendance (intern) – check-in / check-out toggle

GET /api/attendance/intern/:internId (manager)

Feedback

POST /api/feedback (manager) – { to, message, rating }

GET /api/feedback/my-feedback (intern)

Users

GET /api/users/interns (manager) – list interns (no passwords)

✉️ Email Notifications (Nodemailer)

When manager assigns a task, the backend uses utils/sendEmail.js to send an email:

Subject: “New Task Assigned”

Body includes title, description, and deadline

Works with Gmail App Password or any SMTP provider.

📊 Progress & Charts

Manager can view intern progress as a Pie Chart (Recharts):

Present vs Absent days

Completed vs Pending tasks

Attendance “Absent” can be inferred as working days – present days, or you can add a daily job to mark absences automatically.