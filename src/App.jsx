import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Task from './components/Tasks'
import AddTask from './components/AddTask';
import {v4} from 'uuid'

function App() {
  let [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Estudar Programação',
      description: 'Estudar Programação para virar um dev Full-stack',
      isCompleted: false
    },
    {
      id: 2,
      title: 'Fazer Exercícios',
      description: 'Fazer Exercícios para melhorar a habilidade',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Aprender Inglês',
      description: 'Aprender Inglês para se comunicar com o mundo',
      isCompleted: false
    }
  ])

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      // PRECISO ATUALIZAR A TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted }
      }

      // NÃO PRECISO ATUALIZAR A TAREFA
      return task
    });
    setTasks(newTasks)
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks)
  }

  function onAddTaskSubmit(taskTitle, taskDescription) {
    const newTask = {
      id: v4(),
      title: taskTitle,
      description: taskDescription,
      isCompleted: false
    }

    setTasks([...tasks, newTask])
  }

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
      <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
      <Task tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
    </div>
  )
}

export default App
