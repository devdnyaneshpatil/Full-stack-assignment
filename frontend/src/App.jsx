import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import HomePage from './Pages/HomePage'
import Signup from './Pages/Signup'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/home' Component={HomePage} />
        <Route path='/sign-up' Component={Signup}/>
      </Routes>
    </>
  )
}

export default App
