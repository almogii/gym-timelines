

import HomePage from './pages/Home';
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import SignIn from './pages/signIn';
function App() {
 
  return (
    
  <>
  
  <Routes>
    <Route path='/' element={<HomePage/>}/> 
    <Route path='/register' element={<Register/>}/> 
    <Route path = '/signin' element={<SignIn/>}/>
  </Routes>
  
  </>

          
  )
}

export default App
