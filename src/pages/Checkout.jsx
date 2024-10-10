import React, { useEffect } from 'react';
import { Layout, Row, Col, Breadcrumb } from 'antd'; // Import Ant Design components
import CheckoutInfo from './CheckoutInfo';
import Sidebar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;

const Checkout = ({ cart, setCart, cartChange, setCartChange, cookies }) => {
    const navigate = useNavigate();
    // Redirect to login if the user is not authenticated
    useEffect(() => {
        if (!cookies.authToken) {
           navigate('/login');
        }
        if (cart?.orderDetails?.length === 0) {
            navigate('/cart');
        }
    }, [cookies, cart]);

    return (
        <Layout className='min-h-screen bg-gray-100'>
            <Content className='py-8'>
                <div className='container mx-auto'>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={16} className="bg-white p-6 rounded-md shadow-md">
                            <CheckoutInfo cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange} />
                        </Col>
                        <Col xs={24} lg={8}>
                            <Sidebar cart={cart} />
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Checkout;
