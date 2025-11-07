import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Row from '/components/Row'

const url = 'http://localhost:3001'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(res => setTasks(res.data))
      .catch(err => {
        alert(err?.response?.data?.error || err.message)
      })
  }, [])

  const addTask = () => {
    const desc = task.trim()
    if (!desc) return

    const newTask = { description: desc }
    axios.post(`${url}/create`, { task: newTask })
      .then(res => {
        setTasks(prev => [...prev, res.data])
        setTask('')
      })
      .catch(err => {
        alert(err?.response?.data?.error || err.message)
      })
  }

  const deleteTask = (id) => {
    axios.delete(`${url}/delete/${id}`)
      .then(() => {
        setTasks(prev => prev.filter(item => item.id !== id))
      })
      .catch(err => {
        alert(err?.response?.data?.error || err.message)
      })
  }

  return (
    <div id="container">
      <h3>Todos</h3>

      <form onSubmit={(e) => { e.preventDefault(); addTask() }}>
        <input
          placeholder="Add new task"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTask()
            }
          }}
        />
      </form>

      <ul>
        {tasks.map(item => (
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  )
}

export default App
