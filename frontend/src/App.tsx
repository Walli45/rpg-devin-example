import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchUsers } from './api/users'

interface User {
  id: number;
  username: string;
  created_at: string;
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
      
      <div className="card">
        <h2>Users from SQLite Database</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <strong>{user.username}</strong> - Created at: {new Date(user.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
      
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
