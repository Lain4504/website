import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PrivacyPolicy from '../pages/Informationpage/PrivacyPolicy'
import PaymentPolicy from '../pages/Informationpage/PaymentPolicy';
import ShippingPolicy from '../pages/Informationpage/ShippingPolicy';
import About from '../pages/Informationpage/About';
import Contact from '../pages/Informationpage/Contact';
import ReturnPolicy from '../pages/Informationpage/ReturnPolicy';
import TermsOfService from '../pages/Informationpage/TermsOfService';
import FAQ from '../pages/Informationpage/FAQ';
import Home from '../pages/Home';
import Login from '../pages/account/Login';
import SearchResult from '../pages/product/SearchResult';
import Activate from '../components/account/Activate';
import ProductDetail from '../pages/product/ProductDetail';
import PostDetail from '../pages/post/PostDetail';
import Cart from '../pages/order/Cart';
import Wishlist from '../pages/account/WishList';
import UserProfile from '../pages/account/UserProfile';
import OrderDetail from '../pages/order/OrderDetail';
import BooksByCollection from '../pages/product/BookByCollection';
import PostList from '../pages/post/PostList';
import Register from '../pages/account/Register';
import ForgotPassword from '../components/account/ForgotPassword'
import ResetPassword from '../components/account/ResetPasswordForgot';
import Page404 from '../components/shared/Page404';
import Checkout from '../pages/order/Checkout';
import OrderList from '../pages/order/OrderList';
import ChangePassword from '../components/account/ChangePassword';
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
      '/posts/:id', '/wishlist', '/orderlist', '/cart', '/profile',
      '/change-password', '/checkout', '/privacypolicy',
      '/paymentpolicy', '/shippingpolicy', '/termsofservice', 
      '/faq', '/order-detail/:id', '/returnpolicy', '/payment/bank'
    ];
  
    // Skip validation if URL contains vnpayment parameters
    if (!location.search.includes("vnp_Amount=")) {
      const pathExists = validRoutes.some(route => {
        const regexPattern = route.replace(/:[^/]+/, '[^/]+').replace(/\/$/, '\\/?');
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(location.pathname);
      });
  
      if (!pathExists && location.pathname !== '/404') {
        navigate('/404');
      }
    }
  }, [location, navigate]);
  

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/collections/:id' element={<BooksByCollection />} />
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
