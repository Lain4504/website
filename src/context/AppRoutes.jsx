import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; // Import useCookies
import Home from '../pages/Home';
import Collection from '../pages/BookByCollection';
import SearchResult from '../pages/SearchResult';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Activate from '../components/Activate';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPasswordForgot';
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
import PrivateRoute from './PrivateRoute';
import ShippingPolicy from '../pages/InformationPage/ShippingPolicy';
import Contact from '../pages/InformationPage/Contact';
import About from '../pages/InformationPage/About';
import PaymentPolicy from '../pages/informationPage/PaymentPolicy';
import PrivacyPolicy from '../pages/informationPage/PrivacyPolicy';
import ReturnPolicy from '../pages/InformationPage/ReturnPolicy';
import TermsOfService from '../pages/InformationPage/TermsOfService';
import FAQ from '../pages/InformationPage/FAQ';
import OrderDetail from '../pages/OrderDetail';
import Payment from '../pages/Payment';

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    const validRoutes = [
      '/', '/about', '/collections/:id', '/contact', '/postcategory/:id', 
      '/login', '/register', '/search/:name', '/activation/:token', 
      '/forgot-password', '/reset-password/:token', '/products/:id', 
      '/posts/:id', '/wishlist', '/orderlist', '/cart','/profile',
      '/change-password', '/checkout','/privacypolicy',
      '/paymentpolicy','/shippingpolicy', '/termsofservice', 
      '/faq', '/order-detail/:id','/returnpolicy','/payment'
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
      <Route path='/collections/:id' element={<Collection />} />
      <Route path='/postcategory/:id' element={<PostList />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/search/:name' element={<SearchResult />} />
      <Route path='/activation/:token' element={<Activate />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/products/:id' element={<ProductDetail />} />
      <Route path='/posts/:id' element={<PostDetail />} />
     
      <Route path='/404' element={<Page404 />} />

      {/*Cookie page */}
      <Route path="/cart" element={<Cart />} />
      <Route path='/products/:id' element={<ProductDetail/>} />
      <Route path='/checkout' element={<PrivateRoute><Checkout/></PrivateRoute>} />
      <Route path='/payment' element={<PrivateRoute><Payment/></PrivateRoute>} /> 
      
      {/* Private routes that require authentication */}
      <Route path='/wishlist' element={<PrivateRoute><Wishlist /></PrivateRoute>} />
      <Route path='/orderlist' element={<PrivateRoute><OrderList /></PrivateRoute>} />
      <Route path='/change-password' element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
      <Route path='/profile' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      <Route path='/order-detail/:id' element={<PrivateRoute><OrderDetail /></PrivateRoute>} />

      {/* Information Page */}
      <Route path='/privacypolicy' element={<PrivacyPolicy />} />
      <Route path='/paymentpolicy' element={<PaymentPolicy />} />
      <Route path='/shippingpolicy' element={<ShippingPolicy />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/returnpolicy' element={<ReturnPolicy />} />
      <Route path='/termsofservice' element={<TermsOfService />} />
      <Route path='/faq' element={<FAQ />} />
    </Routes>
  );
};

export default AppRoutes;
