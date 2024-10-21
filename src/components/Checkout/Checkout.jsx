import React from 'react';
import Sidebar from './Sidebar';
import { Row, Col, Breadcrumb } from 'antd';
import CheckoutInfo from './CheckoutInfo';

const Checkout = () => {
    return (
        <div className='content'>
            {!cookies.authToken && (window.location.href = '/login')}
            {cart?.orderDetails?.length === 0 && (window.location.href = '/cart')}
            <div className='mx-auto my-5'>
                <div className='bg-white p-5 rounded shadow-md'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
                        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Row gutter={16}>
                    <Col span={16}>
                        <CheckoutInfo cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange} />
                    </Col>
                    <Col span={8}>
                        <Sidebar cart={cart} />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Checkout;
