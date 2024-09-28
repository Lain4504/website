import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';

const { Sider } = Layout;
const { Title } = Typography;

const UserSideBar = () => {
    return (
        <Sider width={200} className="site-layout-background border-r border-gray-300" style={{ backgroundColor: '#fff' }}>
            <div className="flex flex-col h-full p-4"> 
                <Title level={4} className="mb-4 text-left">Tài khoản của tôi</Title>
                <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
                    <Menu.Item key="1" className="hover:text-blue-500 border-b border-gray-300 py-3">
                    <Link to='/get-profile'> Hồ sơ</Link>
                    </Menu.Item>
                    <Menu.Item key="2" className="hover:text-blue-500 border-b border-gray-300 py-3">
                    <Link to='/change-password'> Đổi mật khẩu</Link> 
                    </Menu.Item>
                    <Menu.Item key="3" className="hover:text-blue-500 py-3">
                        <Link to='/orderlist'>Lịch sử đặt hàng</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Sider>
    );
}

export default UserSideBar;
