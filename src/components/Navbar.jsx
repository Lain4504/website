import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Header from './Header';
import SearchBar from './SearchBar';
import CollectionList from './CollectionList';
import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext); 

    // Ghi log current user cho debugging
    useEffect(() => {
        console.log("Current user in Navbar:", authContext.currentUser);
    }, [authContext.currentUser]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logout = () => {
        authContext.dispatch({ type: "LOGOUT", isSessionExpired: false }); // Logout bình thường
    };

    const menu = (
        <Menu style={{ width: '120px', fontSize: '16px' }}>
            {authContext.currentUser ? ( // Kiểm tra nếu người dùng đã đăng nhập
                <>
                    <Menu.Item key="1">
                        <Link to={`/profile`}>Tài khoản</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/orderlist'>Đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={logout}>
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
            <div className='flex items-center justify-between py-5 font-medium sm:mt-32 xs:mt-32 xxs:mt-32 lg:mt-10 mt-16'>
                <Link to='/'><img src={assets.logo} className="w-36" alt="Logo" /></Link>
                <div className='flex items-center gap-6 ml-auto'>
                    <SearchOutlined
                        style={{ fontSize: '24px' }}
                        onClick={() => setShowSearch(prev => !prev)}
                        className='w-5 cursor-pointer hover:scale-110 hover:text-blue-500 transition-transform duration-300 ease-in-out'
                        alt="Search Icon"
                    />
                    <Link to='/wishlist' className='relative'>
                        <HeartOutlined
                            style={{ fontSize: "24px" }}
                            className='w-5 min-w-5 cursor-pointer hover:scale-110 hover:text-red-500 transition-transform duration-300 ease-in-out'
                            alt='Wishlist Icon'
                        />
                    </Link>
                    <Link to='/cart' className='relative'>
                        <ShoppingCartOutlined
                            style={{ fontSize: "24px" }}
                            className='w-5 min-w-5 cursor-pointer hover:scale-110 hover:text-green-500 transition-transform duration-300 ease-in-out'
                            alt="Cart Icon"
                        />
                        <p className='absolute right-[-5px] bottom-[-5px] 
                                    w-4 text-center leading-4 bg-black
                                    text-white aspect-square rounded-full text-[8px]'>
                        </p>
                    </Link>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <UserOutlined style={{ fontSize: '24px' }}
                            className='w-6 cursor-pointer hover:scale-110 hover:text-purple-500 transition-transform duration-300 ease-in-out'
                        />
                    </Dropdown>
                    <img
                        onClick={() => setVisible(true)}
                        src={assets.menu_icon}
                        className='w-5 cursor-pointer md:hidden '
                        alt="Menu Icon"
                    />
                </div>

                <div className={`absolute top-0 right-0 bottom-0 mt-32 overflow-hidden bg-white transition-all ${visible ? 'w-full z-50' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Dropdown Icon" />
                            <p>Back</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border menu-item' to='/'>TRANG CHỦ</NavLink>
                        <div className='py-2 pl-6 border menu-item'>
                            <CollectionList closeMenu={() => setVisible(false)} />
                        </div>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border menu-item' to='/postcategory/all'>TIN TỨC</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border menu-item' to='/about'>VỀ FOREVER</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border menu-item' to='/contact'>LIÊN HỆ</NavLink>
                    </div>
                </div>
            </div>
            <hr />
            <div className={`search-bar ${showSearch ? 'open' : ''}`}>
                {showSearch && <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />}
            </div>
            <div className='flex items-center justify-center py-5 font-medium'>
                <ul className='hidden md:flex gap-16 text-md text-gray-700'>
                    <NavLink to='/' className='nav-link flex flex-col items-center gap-1'>
                        <p>TRANG CHỦ</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <h1 className='flex flex-col items-center gap-1'>
                        <CollectionList />
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </h1>
                    <NavLink to='/postcategory/all' className='nav-link flex flex-col items-center gap-1'>
                        <p>TIN TỨC</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/about' className='nav-link flex flex-col items-center gap-1'>
                        <p>VỀ FOREVER</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/contact' className='nav-link flex flex-col items-center gap-1'>
                        <p>LIÊN HỆ</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
