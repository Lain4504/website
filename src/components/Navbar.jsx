import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Header from './Header';
import SearchBar from './SearchBar';
import CollectionList from './CollectionList';
import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { AuthContext } from '../context/AuthContext';
import MiniCart from '../pages/MiniCart';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [showMiniCart, setShowMiniCart] = useState(false);
    const { currentUser, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    // Log the current user for debugging
    useEffect(() => {
        console.log("Current user in Navbar:", currentUser);
    }, [currentUser]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setIsMobileMenuVisible(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT", isSessionExpired: false });
    };

    const userMenu = (
        <Menu style={{ width: '120px', fontSize: '16px' }}>
            {currentUser ? (
                <>
                    <Menu.Item key="1">
                        <Link to={`/profile`}>Tài khoản</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/orderlist'>Đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={handleLogout}>
                        Đăng xuất
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="1">
                        <Link to='/login'> Đăng nhập</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/register'> Đăng ký</Link>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <>
            <Header />
            <div className='flex items-center justify-between py-5 font-medium sm:mt-32 xs:mt-32 lg:mt-10 mt-16'>
                <Link to='/'><img src={assets.logo} className="w-36" alt="Logo" /></Link>

                <div className='flex items-center gap-6 ml-auto'>
                    <SearchOutlined
                        style={{ fontSize: '24px' }}
                        onClick={() => setShowSearch(prev => !prev)}
                        className='cursor-pointer hover:scale-110 hover:text-blue-500 transition-transform duration-300 ease-in-out'
                        alt="Search Icon"
                    />

                    <Link to='/wishlist'>
                        <HeartOutlined
                            style={{ fontSize: "24px" }}
                            className='cursor-pointer hover:scale-110 hover:text-red-500 transition-transform duration-300 ease-in-out'
                            alt='Wishlist Icon'
                        />
                    </Link>

                    {/* Cart Icon with Hover to Show MiniCart */}
                    <div
                        className='relative'
                        onMouseEnter={() => setShowMiniCart(true)}
                        onMouseLeave={() => setShowMiniCart(false)}
                    >
                        <Link to='/cart'>
                            <ShoppingCartOutlined
                                style={{ fontSize: "24px" }}
                                className='cursor-pointer hover:scale-110 hover:text-green-500 transition-transform duration-300 ease-in-out'
                                alt="Cart Icon"
                            />
                            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                                {/* Insert cart count */}
                            </p>
                        </Link>
                        {showMiniCart && (
                            <div className="absolute right-0 top-full mt-2">
                                <MiniCart />
                            </div>
                        )}
                    </div>

                    {/* User Menu Dropdown */}
                    <Dropdown overlay={userMenu} trigger={['click']}>
                        <UserOutlined
                            style={{ fontSize: '24px' }}
                            className='cursor-pointer hover:scale-110 hover:text-purple-500 transition-transform duration-300 ease-in-out'
                        />
                    </Dropdown>

                    {/* Mobile Menu Icon */}
                    <img
                        onClick={() => setIsMobileMenuVisible(true)}
                        src={assets.menu_icon}
                        className='w-5 cursor-pointer md:hidden'
                        alt="Menu Icon"
                    />
                </div>

                {/* Mobile Menu */}
                <div className={`absolute top-0 right-0 bottom-0 mt-32 bg-white transition-all ${isMobileMenuVisible ? 'w-full z-50' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setIsMobileMenuVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Dropdown Icon" />
                            <p>Back</p>
                        </div>
                        <NavLink onClick={() => setIsMobileMenuVisible(false)} className='py-2 pl-6 border' to='/'>TRANG CHỦ</NavLink>
                        <div className='py-2 pl-6 border'>
                            <CollectionList closeMenu={() => setIsMobileMenuVisible(false)} />
                        </div>
                        <NavLink onClick={() => setIsMobileMenuVisible(false)} className='py-2 pl-6 border' to='/postcategory/all'>TIN TỨC</NavLink>
                        <NavLink onClick={() => setIsMobileMenuVisible(false)} className='py-2 pl-6 border' to='/about'>VỀ FOREVER</NavLink>
                        <NavLink onClick={() => setIsMobileMenuVisible(false)} className='py-2 pl-6 border' to='/contact'>LIÊN HỆ</NavLink>
                    </div>
                </div>
            </div>

            {/* Horizontal Menu for Larger Screens */}
            <div className='hidden md:flex items-center justify-center py-5 font-medium'>
                <ul className='flex gap-16 text-md text-gray-700'>
                    <NavLink to='/' className='nav-link flex flex-col items-center'>
                        <p>TRANG CHỦ</p>
                    </NavLink>
                    <CollectionList />
                    <NavLink to='/postcategory/all' className='nav-link flex flex-col items-center'>
                        <p>TIN TỨC</p>
                    </NavLink>
                    <NavLink to='/about' className='nav-link flex flex-col items-center'>
                        <p>VỀ FOREVER</p>
                    </NavLink>
                    <NavLink to='/contact' className='nav-link flex flex-col items-center'>
                        <p>LIÊN HỆ</p>
                    </NavLink>
                </ul>
            </div>

            {/* Search Bar */}
            <div className={`search-bar ${showSearch ? 'open' : ''}`}>
                {showSearch && <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />}
            </div>
        </>
    );
};

export default Navbar;
