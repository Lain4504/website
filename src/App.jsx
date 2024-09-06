import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return(
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    <Footer/>
   </div>
  )
}
export default App;