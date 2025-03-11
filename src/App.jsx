import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Tasks from './components/Task/tasks'
import AddTask from './components/Task/AddTask'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar Programação",
      description: "Estudar Programação para se tornar um dev Full Stack",
      isCompleted: false
    },
    {
      id: 2,
      title: "Fazer Exercícios",
      description: "Fazer Exercícios para se manter em forma",
      isCompleted: false
    },
    {
      id: 3,
      title: "Aprender Inglês",
      description: "Aprender Inglês para se comunicar com o mundo",
      isCompleted: false
    }
  ])

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
      <AddTask />
      <Tasks tasks={tasks}/>
    </div>
  )
}
export default App
