import React from 'react';
import { Layout } from 'antd';
import PaymentInfo from '../components/Checkout/PaymentInfo';
import Sidebar from '../components/Checkout/Sidebar';

const { Content } = Layout;

const Payment = ({ cart, setCart, cartChange, setCartChange, cookies }) => {
    if (!cookies?.authToken) {
        window.location.href = '/login';
    }

    return (
        <Layout>
            <Content>
                <PaymentInfo 
                    cart={cart} 
                    setCart={setCart} 
                    cartChange={cartChange} 
                    setCartChange={setCartChange} 
                />
                <Sidebar cart={cart} />
            </Content>
        </Layout>
    );
}

export default Payment;
