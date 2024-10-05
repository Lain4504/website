import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const UserNavBar = () => {
    return (
        <Header className="bg-white shadow-none border-b border-gray-200"> {/* Thêm border-b để định nghĩa viền dưới */}
                <Menu mode="horizontal" style={{ border: 'none' }}>
                    <Menu.Item key="1">
                        <Link to='/profile'> Hồ sơ</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/change-password'> Đổi mật khẩu</Link> 
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/orderlist'> Lịch sử đặt hàng</Link>
                    </Menu.Item>
                </Menu>
        </Header>
    );
};

export default UserNavBar;