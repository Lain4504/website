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
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { getAllCartByUserId } from "./services/CartService";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['authToken']); // Lấy 'authToken' từ cookies
  const location = useLocation();
  const navigate = useNavigate();

  const is404Page = location.pathname === '/404';

  useEffect(() => {
    const validRoutes = [
      '/', '/about', '/collections/:id', '/contact', '/postcategory/:id', '/login', '/register',
      '/search/:name', '/activation/:token', '/forgot-password', '/reset-password/:token',
      '/products/:id', '/profile', '/orderlist', '/change-password', '/wishlist', '/posts/:id', '/cart'
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

  useEffect(() => {
    // Điều hướng người dùng khỏi trang login và register khi đã đăng nhập
    if (cookies.authToken && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    }
  }, [cookies, location, navigate]);

  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartChange, setCartChange] = useState(false);

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];
        setUserId(userId);
      } catch (error) {
        console.error('Invalid token', error);
      }
    } else {
      console.error('No token found');
    }
  }, [cookies.authToken]);
  const handleCart = async() => {
    try{
      const cartData = await getAllCartByUserId(userId);
      setCart(cartData?.data);
    } catch (error){
      console.error(error);
    }
  };
  useEffect(() =>{
    handleCart();
  },[cookies, cartChange]);
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {!is404Page && <Navbar cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/collections/:id' element={<Collection />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/postcategory/:id' element={<PostList />} />
          <Route path='/login' element={<Login cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/register' element={<Register cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/search/:name' element={<SearchResult />} />
          <Route path='/activation/:token' element={<Activate />} />
          <Route path='/profile' element={<UserProfile cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/404' element={<Page404 />} />
          <Route path='/forgot-password' element={<ForgotPassword cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/reset-password/:token' element={<ResetPassword cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
          <Route path='/products/:id' element={<ProductDetail cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} setCart={setCart} setCartChange={setCartChange}/>} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/wishlist' element={<Wishlist cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>}/>
          <Route path='/orderlist'element={<OrderList cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>} />
          <Route path="/change-password" element={<ChangePassword cookies={cookies}/>}/>
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} setCartChange={setCartChange} cartChange={cartChange} />}/>
          <Route path="/checkout" element={<Checkout/>}/>
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
