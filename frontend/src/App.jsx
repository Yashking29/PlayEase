import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Limbo from './components/Limbo'
import Limbo2 from './components/Limbo2'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Limbo></Limbo>
       
    </>
  )
}

export default App
