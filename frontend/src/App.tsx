import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello World</h1>
      
      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="user-profile">
          <div className="profile-container">
            <div className="profile-section">
              {/* User Profile Picture (Dummy Block) */}
              <div className="profile-picture">
                <div className="dummy-avatar"></div>
              </div>
              
              {/* User Info */}
              <div className="user-info">
                <h2>{users[0].username}</h2>
                <p>Created: {new Date(users[0].created_at).toLocaleString()}</p>
              </div>
            </div>
            
            {/* User Stats */}
            <div className="stats-section">
              <h3>Character Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">HP:</span>
                  <span className="stat-value">{users[0].stats.hp}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Level:</span>
                  <span className="stat-value">{users[0].stats.level}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Power:</span>
                  <span className="stat-value">{users[0].stats.power}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Intelligence:</span>
                  <span className="stat-value">{users[0].stats.intelligence}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Charisma:</span>
                  <span className="stat-value">{users[0].stats.charisma}</span>
                </div>
              </div>
            </div>
            
            {/* Empty Panel for Future Content */}
            <div className="empty-panel">
              {/* This panel is intentionally left empty for future content */}
            </div>
          </div>
        </div>
      )}
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
