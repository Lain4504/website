import React, { useContext } from "react";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import ScrollToTop from "./components/shared/ScrollToTop";
import FloatingPhoneIcon from "./components/shared/FloatingPhoneIcon";
import AppRoutes from "./context/AppRoutes";
import useAuth from './context/useAuth';
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const is404Page = window.location.pathname === '/404'; 
  const { currentUser } = useContext(AuthContext);
  const { user }  = useAuth();
  const userId = currentUser?.userId || null;
  console.log("User:", userId)

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {!is404Page && (
          <Navbar />
        )}
        <AppRoutes />
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
