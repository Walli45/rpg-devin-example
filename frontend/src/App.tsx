import { useEffect, useState } from 'react'
import './App.css'
import { fetchUsers } from './api/users'

interface UserStats {
  hp: number;
  level: number;
  power: number;
  intelligence: number;
  charisma: number;
}

interface User {
  id: number;
  username: string;
  created_at: string;
  stats: UserStats;
}

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: 'Clean', completed: false },
    { id: '2', name: 'Work', completed: false },
    { id: '3', name: 'Study', completed: false },
  ])

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true)
        const userData = await fetchUsers()
        setUsers(userData)
      } catch (err) {
        setError('Failed to fetch users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  return (
    <div className="app-container">
      {loading ? (
        <p className="loading-message">Loading user data...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : users.length === 0 ? (
        <p className="no-data-message">No users found</p>
      ) : (
        <div className="two-column-layout">
          {/* Left Pane - User Profile */}
          <div className="left-pane">
            {/* User Profile Picture */}
            <div className="profile-picture">
              <div className="dummy-avatar"></div>
            </div>
            
            {/* User Info */}
            <div className="user-info">
              <h2>{users[0].username}</h2>
              <p>Created: {new Date(users[0].created_at).toLocaleString()}</p>
            </div>
            
            {/* User Stats as Vertical List */}
            <div className="stats-list">
              <h3>Character Stats</h3>
              <ul>
                <li className="stat-item">
                  <span className="stat-label">HP:</span>
                  <span className="stat-value">{users[0].stats.hp}</span>
                </li>
                <li className="stat-item">
                  <span className="stat-label">Level:</span>
                  <span className="stat-value">{users[0].stats.level}</span>
                </li>
                <li className="stat-item">
                  <span className="stat-label">Power:</span>
                  <span className="stat-value">{users[0].stats.power}</span>
                </li>
                <li className="stat-item">
                  <span className="stat-label">Intelligence:</span>
                  <span className="stat-value">{users[0].stats.intelligence}</span>
                </li>
                <li className="stat-item">
                  <span className="stat-label">Charisma:</span>
                  <span className="stat-value">{users[0].stats.charisma}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Pane - Task Section */}
          <div className="right-pane">
            <div className="task-section">
              <h3>Tasks</h3>
              <div className="task-list">
                {tasks.length === 0 ? (
                  <p className="no-tasks-message">No tasks remaining</p>
                ) : (
                  tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <label className="task-label">
                        <input 
                          type="checkbox" 
                          className="task-checkbox" 
                          onChange={() => handleTaskComplete(task.id)}
                        />
                        <span className="task-name">{task.name}</span>
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
