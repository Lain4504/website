import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Footer from "./components/Footer"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import Navbar from "./components/Navbar"
import page404 from "./components/page404";
import Login from "./pages/Login"
const App = () => {
  return(
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <ToastContainer/>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' Component={page404}/>
    </Routes>
    <Footer/>
   </div>
  )
}
export default App;