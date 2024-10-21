import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const UserNavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname; // Get current path

    return (
        <Header className="bg-white shadow-none border-b border-gray-200">
            <Menu mode="horizontal" selectedKeys={[currentPath]} style={{ border: 'none' }}>
                <Menu.Item key="/profile" className={`transition duration-300 ease-in-out ${currentPath === '/profile' ? 'font-bold' : ''}`}>
                    <Link to='/profile'> Hồ sơ</Link>
                </Menu.Item>
                <Menu.Item key="/change-password" className={`transition duration-300 ease-in-out ${currentPath === '/change-password' ? 'font-bold' : ''}`}>
                    <Link to='/change-password'> Đổi mật khẩu</Link> 
                </Menu.Item>
                <Menu.Item key="/orderlist" className={`transition duration-300 ease-in-out ${currentPath === '/orderlist' ? 'font-bold' : ''}`}>
                    <Link to='/orderlist'> Lịch sử đặt hàng</Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default UserNavBar;
