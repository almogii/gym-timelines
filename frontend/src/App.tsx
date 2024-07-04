

import HomePage from './pages/Home';
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import SignIn from './pages/signIn';
import MyRecipes from './pages/MyRecpies';
function App() {
 
  return (
    
  <>
  
  <Routes>
    <Route path='/' element={<HomePage/>}/> 
    <Route path='/register' element={<Register/>}/> 
    <Route path = '/signin' element={<SignIn/>}/>
    <Route path='/myrecipes' element={<MyRecipes/>}/>
  </Routes>
  
  </>

          
  )
}

export default App
