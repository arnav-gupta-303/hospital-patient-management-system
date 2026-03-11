# 🏥 Hospital Patient Management System

A premium, full-stack hospital administration dashboard designed for seamless patient record management. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and optimized for high performance.

---

## 🌟 Key Features

- **💎 Elite Dashboard**: Real-time visualization of patient statistics (Total, Admitted, Discharged, Outpatients).
- **📋 Full Patient Lifecycle**: Complete CRUD operations with a smooth, intuitive interface.
- **🔍 Advanced Search**: Instant, real-time filtering of patient records by name.
- **🎨 Glassmorphic UI**: Modern, sleek design with subtle micro-animations and responsive layouts.
- **⚡ Performance First**: Optimized with Vite for lightning-fast frontend delivery and local development.
- **🛡️ Secure Connectivity**: Robust integration with MongoDB Atlas for persistent storage.

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Lucide Icons, Custom CSS Modules
- **Backend**: Node.js, Express.js (v5)
- **Database**: MongoDB Atlas with Mongoose
- **State/Routing**: React Hooks, React Router 7
- **Feedback**: React Hot Toast

## 📂 Project Architecture

```text
/backend          # Express.js Server
├── /models       # Data schemas
├── /controllers  # Business logic
├── /routes       # API endpoints
└── server.js     # Server entry point

/frontend         # React/Vite Client
├── /components   # Reusable UI modules
├── /pages        # Application views
└── /services     # API integration
```

---

## 🚀 Quick Start (Local)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Access to a MongoDB Atlas cluster

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with your MONGO_URI
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Accessible at: **`http://localhost:5173`**

---

## 🌐 Deployment (Render)

This project is pre-configured for **Render.com** deployment.

### Backend (Web Service)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Env Vars**: Add `MONGO_URI` (your production DB string).

### Frontend (Static Site)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Env Vars**: `VITE_API_URL` (URL of your deployed backend API).

---

## 📄 Documentation & Testing
Detailed API documentation is available in [API.md](./API.md).
For a full feature walkthrough and proof of verification, see [walkthrough.md](./walkthrough.md).

*Managed by Antigravity AI*

