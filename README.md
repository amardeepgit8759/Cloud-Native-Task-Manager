# ⚡ Cloud-Native Task Manager

A modern, full-stack microservices task management application built with a **React 19 + Vite** frontend, a **Python Flask REST API** backend, **MongoDB**, and **Kubernetes** orchestration configurations.

![React](https://img.shields.io/badge/Frontend-React_19_%2B_Vite-61DAFB?logo=react)
![Python](https://img.shields.io/badge/Backend-Flask-3776AB?logo=flask)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Kubernetes](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5?logo=kubernetes)

---

## 📐 Project Architecture

```
Cloud-Native-Task-Manager/
├── app/                  # Python Flask REST API Backend
│   ├── app.py            # Main application & routing logic
│   ├── config.py         # Database & app configuration
│   ├── models.py         # PyMongo database connection
│   ├── Dockerfile        # Docker container image spec
│   └── requirements.txt  # Python dependencies
├── frontend/             # React + Vite Frontend
│   ├── src/
│   │   ├── App.jsx       # Main task manager interface
│   │   └── index.css     # Light theme glassmorphic styling
│   ├── package.json      # Node dependencies & dev scripts
│   └── vite.config.js    # Vite setup & API dev proxy
└── k8s/                  # Kubernetes Infrastructure Manifests
    ├── deployment.yaml   # Flask API deployment spec
    ├── service.yaml      # Flask API NodePort service spec
    └── mongo.yaml        # MongoDB deployment & cluster service
```

---

## ✨ Features

- **🎨 Modern Light Theme Glassmorphism UI**: Clean, responsive, light-mode interface with dynamic progress tracking, status badges, and filter tabs.
- **⚡ Decoupled Microservice Design**: Separate frontend and backend services connected via REST API and dev proxying.
- **📊 Real-Time Status & Progress**: Displays live API connection status, completed task counts, and percentage completion progress bar.
- **🔄 Full CRUD Operations**:
  - Add new tasks
  - Toggle completion state (with strikethrough animation)
  - Delete tasks dynamically
  - Filter by `All`, `Active`, or `Completed`
- **☸️ Kubernetes Containerization Ready**: Containerized with Docker and ready for deployment on Kubernetes clusters (EKS, GKE, AKS, or Minikube).

---

## 🛠️ REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | API health status check |
| `GET` | `/tasks` | Fetch all tasks from MongoDB |
| `POST` | `/tasks` | Create a new task (`{ "title": "Task Name" }`) |
| `PUT` | `/tasks/<id>` | Toggle/update task completion status |
| `DELETE` | `/tasks/<id>` | Delete task by ID |

---

## 🚀 Local Development & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.9+)
- [MongoDB](https://www.mongodb.com/) (Running on `localhost:27017`)

---

### 1. Run Backend (Flask API)

```bash
# Navigate to app directory
cd app

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server (runs on port 5000)
python app.py
```

---

### 2. Run Frontend (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server (runs on port 5173 / 5174)
npm run dev
```

Open your browser at `http://localhost:5174/` to view the application!

---

## ☸️ Kubernetes Deployment

Deploy the application and MongoDB instance onto any Kubernetes cluster:

```bash
# 1. Deploy MongoDB Deployment & Service
kubectl apply -f k8s/mongo.yaml

# 2. Deploy Task Manager Flask API
kubectl apply -f k8s/deployment.yaml

# 3. Expose Task Manager Service via NodePort
kubectl apply -f k8s/service.yaml

# Verify deployment status
kubectl get pods,services
```
