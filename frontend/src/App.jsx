import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const API = ""

  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [isConnected, setIsConnected] = useState(true)

  const checkHealth = async () => {
    try {
      await axios.get(`${API}/health`)
      setIsConnected(true)
    } catch {
      setIsConnected(false)
    }
  }

  const loadTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`)
      setTasks(res.data)
      setIsConnected(true)
    } catch (err) {
      console.error("Error loading tasks:", err)
      setIsConnected(false)
    }
  }

  const addTask = async (e) => {
    if (e) e.preventDefault()
    if (!title.trim()) return

    try {
      await axios.post(`${API}/tasks`, { title: title.trim() })
      setTitle("")
      loadTasks()
    } catch (err) {
      console.error("Error adding task:", err)
    }
  }

  const toggleTask = async (id, currentCompleted) => {
    try {
      await axios.put(`${API}/tasks/${id}`, { completed: !currentCompleted })
      loadTasks()
    } catch (err) {
      console.error("Error updating task:", err)
    }
  }

  const deleteTask = async (id, e) => {
    if (e) e.stopPropagation()
    try {
      await axios.delete(`${API}/tasks/${id}`)
      loadTasks()
    } catch (err) {
      console.error("Error deleting task:", err)
    }
  }

  useEffect(() => {
    loadTasks()
    checkHealth()
    const interval = setInterval(loadTasks, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-icon">⚡</div>
          <div>
            <h1 className="brand-title">Task Manager</h1>
            <p className="brand-subtitle">Cloud-Native Microservices Architecture</p>
          </div>
        </div>

        <div className={`status-badge ${isConnected ? "online" : "offline"}`}>
          <span className="status-dot"></span>
          <span>{isConnected ? "API Connected" : "Connecting..."}</span>
        </div>
      </header>

      {/* Input Section */}
      <form onSubmit={addTask} className="input-section">
        <input
          className="task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit" className="add-button">
          <span>Add Task</span>
        </button>
      </form>

      {/* Controls & Filter Bar */}
      <div className="controls-bar">
        <div className="filter-tabs">
          <button
            className={`tab-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({tasks.length})
          </button>
          <button
            className={`tab-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active ({tasks.length - completedCount})
          </button>
          <button
            className={`tab-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className="progress-info">
          {completedCount} of {totalCount} completed ({progressPercent}%)
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      )}

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.completed ? "completed" : ""}`}
            >
              <div
                className="task-content"
                onClick={() => toggleTask(task.id, task.completed)}
              >
                <div className="custom-checkbox">
                  {task.completed && "✓"}
                </div>
                <span className="task-title">{task.title}</span>
              </div>

              <button
                className="delete-btn"
                onClick={(e) => deleteTask(task.id, e)}
                title="Delete task"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📌</div>
            <div className="empty-title">
              {filter === "all"
                ? "No tasks yet!"
                : filter === "active"
                ? "No active tasks!"
                : "No completed tasks!"}
            </div>
            <div className="empty-subtitle">
              {filter === "all"
                ? "Add a task using the input box above."
                : "All caught up with your tasks."}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App