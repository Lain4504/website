import React from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import Post from "./pages/Post";
import SearchResult from "./pages/SearchResult";
import Search from "./components/Search";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies([]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collections/:id' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/post' element={<Post />} />
        <Route path='/login' element={<Login cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
        <Route path='/register' element={<Register cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
        <Route path='/search/:name' element={<Search />} />
        
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
