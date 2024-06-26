

import HomePage from './pages/Home';
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom';
import './App.css'
function App() {
 
  return (
    
  <>
  
  <Routes>
    <Route path='/' element={<HomePage/>}/> 
    <Route path='/register' element={<Register/>}/> 
  </Routes>
  
  </>

          
  )
}

export default App
