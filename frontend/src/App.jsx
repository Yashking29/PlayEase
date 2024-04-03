import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import Limbo from './components/Limbo.jsx'
import Limbo2 from './components/Limbo2'
import Type from './components/Type';
import Crash from './components/Crash.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
  
    <Router>
       
          <Routes>
          
            
            <Route  path="/limbo" element={<Limbo/>} />
            <Route  path="/type" element={<Type/>} />
            <Route  path="/crash" element={<Crash/>} />
          
            
      
          </Routes>
    </Router>
       
    
  )
}

export default App
