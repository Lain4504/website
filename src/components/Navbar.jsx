import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets"
import Header from "./Header"
import { Link, NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { 
        setVisible(false); 
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>  
      <Header/>
      <div className='flex items-center justify-between py-5 font-medium sm:mt-32 xs:mt-32 lg:mt-10 mt-16'>
        <Link to='/'><img src={assets.logo} className="w-36" alt=""/></Link>
        <SearchBar />
      </div>

      {/* Navigation */}
      <div className='flex items-center justify-between py-5 font-medium'>
        <ul className='hidden md:flex gap-5 text-lg text-gray-700'>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>TRANG CHỦ</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>SẢN PHẨM</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>VỀ FOREVER</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>LIÊN HỆ</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </ul>

        {/*--------------- */}
        <div className='flex items-center gap-6'>
          <img onClick={() => setVisible(true)} src={assets.menu_icon} className=' w-5 cursor-pointer md:hidden' alt="" />
          <Link to='/login' className='relative'>Đăng nhập</Link>
          <Link to='/register' className='relative'>Đăng ký</Link>
         <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] 
                        w-4 text-center leading-4 bg-black
                        text-white aspect-square rounded-full text-[8px]'>
          </p>
        </Link>
        </div>

        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 mt-32 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>TRANG CHỦ</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>SẢN PHẨM</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>VỀ fOREVER</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>LIÊN HỆ</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
