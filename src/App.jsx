import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { useCookies } from 'react-cookie';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Page404 from "./components/Page404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import Post from "./pages/Post";
import BooksBySearch from "./pages/BookBySearch";
import SearchPage from "./pages/SearchPage";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra nếu trang hiện tại là 404
  const is404Page = location.pathname === '/404';

  // Chuyển hướng tới 404 nếu route không tồn tại
  useEffect(() => {
    const validRoutes = ['/', '/about', '/collections/:id', '/contact', '/post', '/login', '/register', '/search'];
    const pathExists = validRoutes.some(route => {
      const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`);
      return regex.test(location.pathname);
    });
  
    if (!pathExists && location.pathname !== '/404') {
      navigate('/404');
    }
  }, [location, navigate]);
  

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      {/* Chỉ hiển thị Navbar và Footer khi không phải trang 404 */}
      {!is404Page && <Navbar cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collections/:id' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/post' element={<Post />} />
        <Route path='/login' element={<Login cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>} />
        <Route path='/register' element={<Register cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>} />
        <Route path='/search' element={<SearchPage />} />

        {/* Trang 404 */}
        <Route path='/404' element={<Page404 />} />
      </Routes>

      {/* Chỉ hiển thị Footer khi không phải trang 404 */}
      {!is404Page && <Footer />}
    </div>
  );
};

export default App;
