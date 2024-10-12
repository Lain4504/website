import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import FloatingPhoneIcon from "./components/FloatingPhoneIcon";
import useAuth from "./context/useAuth";
import useCart from "./context/useCart";
import AppRoutes from "./context/AppRoutes";

const App = () => {
  const { currentUser } = useAuth(); // Use currentUser instead of cookies
  const { cart, setCart, cartChange, setCartChange } = useCart(currentUser ? currentUser.userId : null); // Pass userId directly
  const is404Page = window.location.pathname === '/404'; // Use window.location for global context

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {!is404Page && (
          <Navbar 
          />
        )}
        <AppRoutes 
          cart={cart} 
          setCart={setCart} 
          cartChange={cartChange} 
          setCartChange={setCartChange} 
        />
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
