import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets"
import Header from "./Header"
import { Link, NavLink } from "react-router-dom"
import { ShopContext } from '../context/ShopContext';
import SearchBar from "./SearchBar";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch} = useContext(ShopContext);

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
      <div className='flex items-center justify-between py-5 font-medium sm:mt-32 xs:mt-32 xxs:mt-32 lg:mt-10 mt-16'>
        <Link to='/'><img src={assets.logo} className="w-36" alt=""/></Link>
        {/*--------------- */}
        <div className='flex items-center gap-6 ml-auto'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className='group relative'>
          <Link to='/login'> <img src={assets.profile_icon} className='w-6 cursor-pointer' alt="" /></Link>
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'> My Profile</p>
              <p className='cursor-pointer hover:text-black'> Orders</p>
              <p className='cursor-pointer hover:text-black'> Logout</p>
            </div>
          </div>
        </div>
         <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] 
                        w-4 text-center leading-4 bg-black
                        text-white aspect-square rounded-full text-[8px]'>
          </p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className=' w-5 cursor-pointer sm:hidden' alt="" />
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
        <hr/>
        <SearchBar/>
      {/* Navigation */}
      <div className='flex items-center justify-center py-5 font-medium'>
        <ul className='hidden sm:flex gap-16 text-lg text-gray-700'>
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
      </div>
    </>
  );
};

export default Navbar;
