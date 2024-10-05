import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; // Sử dụng useCookies để truy xuất cookie
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collection from "./pages/BookByCollection";
import SearchResult from "./pages/SearchResult";
import Page404 from "./components/Page404";
import Activate from "./components/Activate";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPasswordFogot";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";
import FloatingPhoneIcon from "./components/FloatingPhoneIcon";
import PostList from "./pages/PostList";
import UserProfile from "./pages/UserProfile";
import OrderList from "./pages/OrderList";
import ChangePassword from "./components/ChangePassword";
import Wishlist from "./pages/WishList";
import PostDetail from "./pages/PostDetail";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['authToken']); // Lấy 'authToken' từ cookies
  const location = useLocation();
  const navigate = useNavigate();

  const is404Page = location.pathname === '/404';

  useEffect(() => {
    const validRoutes = [
      '/', '/about', '/collections/:id', '/contact', '/post', '/login', '/register',
      '/search/:name', '/activation/:token', '/forgot-password', '/reset-password/:token',
      '/products/:id', '/profile', '/orderlist','/change-password', '/wishlist', '/posts/:id'

    ];

    const pathExists = validRoutes.some(route => {
      const regexPattern = route.replace(/:[^/]+/, '[^/]+').replace(/\/$/, '\\/?');
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
        {!is404Page && <Navbar cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/collections/:id' element={<Collection />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/post' element={<PostList />} />
          <Route path='/login' element={<Login cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/register' element={<Register cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/search/:name' element={<SearchResult />} />
          <Route path='/activation/:token' element={<Activate />} />
          <Route path='/profile' element={<UserProfile cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/404' element={<Page404 />} />
          <Route path='/forgot-password' element={<ForgotPassword cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/reset-password/:token' element={<ResetPassword cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/wishlist' element={<Wishlist cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>}></Route>
          <Route path='/orderlist'element={<OrderList cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>} />
          <Route path="/change-password" element={<ChangePassword cookies={cookies}/>}></Route>
        </Routes>
        <ScrollToTop />
        <FloatingPhoneIcon />
        {!is404Page && <Footer />}
      </div>

      {!is404Page && (
        <div className="bg-black">
          <hr />
          <p className="py-5 text-sm text-center text-white"> Copyright 2024@ Book Store - All Right Reserved </p>
        </div>
      )}
    </>
  );
};

export default App;
