import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collection from "./pages/BookByCollection";
import Post from "./pages/Post";
import SearchResult from "./pages/SearchResult";
import Page404 from "./components/Page404";
import Activate from "./components/Activate";
import ForgotPassword from "./components/ForgotPassword";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra nếu trang hiện tại là 404
  const is404Page = location.pathname === '/404';

  // Chuyển hướng tới 404 nếu route không tồn tại
  useEffect(() => {
    const validRoutes = [
      '/',
      '/about',
      '/collections/:id',
      '/contact',
      '/post',
      '/login',
      '/register',
      '/search/:name',
      '/active',
      '/forgot-password',
      '/products/:id'
    ];

    const pathExists = validRoutes.some(route => {
      // Convert route pattern to regex
      const regexPattern = route
        .replace(/:[^/]+/, '[^/]+')  // Replace dynamic segments with regex patterns
        .replace(/\/$/, '\\/?');    // Optional trailing slash
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(location.pathname);
    });

    if (!pathExists && location.pathname !== '/404') {
      navigate('/404');
    }
  }, [location, navigate]);

  return (
    <>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Chỉ hiển thị Navbar và Footer khi không phải trang 404 */}
      {!is404Page && <Navbar cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collections/:id' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/post' element={<Post />} />
        <Route path='/login' element={<Login cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
        <Route path='/register' element={<Register cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
        <Route path='/search/:name' element={<SearchResult />} />
        <Route path='/active' element={<Activate />} />
        <Route path='/404' element={<Page404 />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/products/:id' element={<ProductDetail cookies={cookies} setCookie={setCookies} />}></Route>
      </Routes>
      {/* Chỉ hiển thị Footer khi không phải trang 404 */}
      {!is404Page && <Footer />}
    </div>
     </>
  );
};

export default App;
