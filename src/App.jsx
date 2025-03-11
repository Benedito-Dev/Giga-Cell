import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Tasks from './components/tasks'

function App() {
  let [message, setMessage] = useState("Ola mundo")

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("Fui clicado!")}>Clique aqui</button>
      <Tasks />
    </div>
  )
}
export default App
