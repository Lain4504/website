import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import Navbar from "./components/Navbar"
const App = () => {
  return(
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    <Footer/>
   </div>
  )
}
export default App;