import { useState, useEffect } from 'react'
import './App.css'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
      <div className="mb-6">
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <TaskList tasks={tasks} />
    </div>
  )
}

export default App
