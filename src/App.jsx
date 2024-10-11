import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import FloatingPhoneIcon from "./components/FloatingPhoneIcon";
import useAuth from "./context/useAuth";
import useCart from "./context/useCart";
import AppRoutes from "./context/AppRoutes";

const App = () => {
  const { cookies, setCookies, removeCookies, isLoggedIn } = useAuth();
  const { cart, setCart, cartChange, setCartChange } = useCart();
  const is404Page = location.pathname === '/404';

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {!is404Page && <Navbar cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} />}
        <AppRoutes cookies={cookies} setCookies={setCookies} removeCookies={removeCookies} cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange} />
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
