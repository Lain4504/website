import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Collection from '../pages/BookByCollection';
import SearchResult from '../pages/SearchResult';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Activate from '../components/Activate';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPasswordFogot';
import ProductDetail from '../pages/ProductDetail';
import PostList from '../pages/PostList';
import UserProfile from '../pages/UserProfile';
import OrderList from '../pages/OrderList';
import ChangePassword from '../components/ChangePassword';
import Wishlist from '../pages/WishList';
import PostDetail from '../pages/PostDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Page404 from '../components/Page404';

const AppRoutes = ({ cookies, setCookies, removeCookies, cart, setCart, cartChange, setCartChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Điều hướng nếu không tìm thấy trang
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

  return (
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
      <Route path='/forgot-password' element={<ForgotPassword cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
      <Route path='/reset-password/:token' element={<ResetPassword cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />} />
      <Route path='/products/:id' element={<ProductDetail cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} setCart={setCart} setCartChange={setCartChange}/>} />
      <Route path='/posts/:id' element={<PostDetail />} />
      <Route path='/wishlist' element={<Wishlist cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>}/>
      <Route path='/orderlist' element={<OrderList cookies={cookies} setCookies={setCookies} removeCookies={removeCookies}/>} />
      <Route path="/change-password" element={<ChangePassword cookies={cookies}/>}/>
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} setCartChange={setCartChange} cartChange={cartChange} />}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path='/404' element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
