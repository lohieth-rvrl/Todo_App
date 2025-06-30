# ✅ Todo Task Manager Web Application

A full-stack task management web app built for the Katomaran Hackathon. This project enables users to authenticate with Google, create and manage tasks, collaborate by sharing tasks with others, and experience real-time updates—all through a clean and responsive user interface.

---

## 🎯 Objective

This application was developed to demonstrate complete full-stack engineering capabilities, including:

- OAuth 2.0 authentication with Google
- RESTful API development
- Real-time updates with Socket.IO
- Task sharing and collaboration
- Responsive and clean UI/UX
- Cloud-based deployment on Vercel (Frontend) and Render (Backend)

---

## 🌐 Live Application

- **Frontend (Vercel)**: [https://todo-app-ebon-theta-75.vercel.app](https://todo-app-tau-blue-88.vercel.app/)  
- **Backend (Render)**: [https://managatodo.onrender.com](https://todobackend-focg.onrender.com)

---

## 🧪 Loom Demo

🎥 [Watch Project Walkthrough](https://drive.google.com/file/d/1GpBqdKa1GLdtKHaZIoRv0UCPme5bneXd/view?usp=sharing)

---

## 🧱 Tech Stack

### 🔧 Backend
- Node.js, Express.js
- MongoDB Atlas with Mongoose
- Socket.IO for real-time sync
- JWT for user session management
- CORS, dotenv, Helmet

### 💻 Frontend
- React (Vite)
- @react-oauth/google for Google Sign-In
- Axios for API requests
- Framer Motion for animations
- Toastify for user feedback
- React Router DOM for routing

### ☁️ Deployment
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas

---

## 🖼 Architecture Diagram

![Architecture Diagram](https://github.com/user-attachments/assets/35c05a42-7e12-484e-a588-ef8d6f2f01d1)

---

## 🚀 Features

### ✅ Authentication
- Google OAuth 2.0 login
- JWT-based session token signed on backend
- User-specific task isolation

### ✅ Task Management
- Create, Read, Update, Delete tasks
- Assign task priority and status
- Due date input and automatic overdue checks

### ✅ Sharing & Collaboration
- Share tasks with users via email
- Shared tasks appear in both dashboards
- View-only or editable based on context

### ✅ Real-Time & UX
- Live updates via Socket.IO
- Responsive for mobile + desktop
- Filter tasks: pending, in-progress, completed, overdue, due today
- Toasts and modals for user actions

---

## 🔐 Environment Variables

### 📦 Backend (`server/.env`)
```env
PORT=8000
MONGO_URI=your_mongo_atlas_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret
```

### 🌐 Frontend (`client/.env`)
```env
VITE_API_URL=https://managatodo.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 💻 Local Development Setup

### 🔽 Clone Repo
```bash
git clone https://github.com/your-username/todo-task-manager.git
cd todo-task-manager
```

### 🧑‍💻 Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 🖥 Backend Setup
```bash
cd server
npm install
node index.js
```

---

## 🧾 API Overview

### `POST /api/auth/google`
- Expects Google credential
- Returns JWT token

### `GET /api/todo`
- Fetch tasks (owned + shared)

### `POST /api/todo`
- Add new task

### `PUT /api/todo/:id`
- Edit existing task

### `DELETE /api/todo/:id`
- Delete task

---

## 🔍 Assumptions

- Only Google login is implemented (GitHub/Facebook can be added similarly)
- User sharing is handled via Google email (must exist in DB)
- Real-time functionality uses Socket.IO
- Cold starts may occur due to free-tier hosting on Render

---

## ✅ Submission Checklist

- ✅ Public GitHub Repo with README  
- ✅ Google OAuth Integrated  
- ✅ Full CRUD for tasks  
- ✅ Task sharing implemented  
- ✅ Real-time updates with Socket.IO  
- ✅ Responsive design with filters  
- ✅ Architecture diagram attached  
- ✅ Loom video demo included  
- ✅ Public URLs for both client and server  
- ✅ Modular code with clean structure  

---

## 👨‍💻 Author

**Lohieth R V R L**  
Email: lohiethrvrl212@gmail.com  
GitHub: [github.com/lohiethrvrl212](https://github.com/lohiethrvrl212)

---

> 🏁 **This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)**

---

**✨ Thank you for reading ✨**
