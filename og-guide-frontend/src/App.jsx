// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import{BrowserRouter,Routes,Route} from "react-router-dom"
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Service } from './pages/Service'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Navbar } from './components/Navbar'
import {Test} from './pages/Test'
import { Logout } from './pages/Logout'





 const  App=()=> {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/test" element={<Test/>} />
          <Route path="/logout" element={<Logout/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
