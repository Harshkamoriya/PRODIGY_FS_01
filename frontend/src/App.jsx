import React from 'react'
import Login from '../components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from '../components/ForgotPassword'
import Signup from '../components/Signup'
import Home from '../components/Home'
import ResetPage from '../components/ResetPage'
import Navbar from '../components/Navbar'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
     
    <Route path='/' element={<Login/>}/>

      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/resetpage' element={<ResetPage/>}/>


      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forgetpassword' element={<ForgotPassword/>}/>


    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
