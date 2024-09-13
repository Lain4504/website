import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Footer from "./components/Footer"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import Navbar from "./components/Navbar"
import Page404 from "./components/Page404";
import Login from "./pages/Login"
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Register from "./pages/Register"
import Collection from "./pages/Collection"
import Post from "./pages/Post"

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
  }, [cookies]);

  return(
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <ToastContainer/>
    <Navbar cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collections/:id' Component={Collection}/>
        <Route path='/contact' element={<Contact />} />
        <Route path='/post' element={<Post/>}/>
        <Route path='/login' element={<Login cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>} />
        <Route path='/register' element={<Register cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>} />
        <Route path='*' Component={Page404}/>
    </Routes>
    <Footer/>
   </div>
  )
}
export default App;