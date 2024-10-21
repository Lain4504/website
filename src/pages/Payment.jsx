import React, { useContext, useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import PaymentInfo from '../components/Checkout/PaymentInfo';
import Sidebar from '../components/Checkout/Sidebar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAllCartByUserId } from '../services/CartService';

const Payment = () => {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.userId || null;
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [cartChange, setCartChange] = useState(false); 

    useEffect(() => {
        const handleCart = async () => {
            if (userId) {
                try {
                    const cartData = await getAllCartByUserId(userId);
                    setCart(cartData?.data || []);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        handleCart();
    }, [userId, cartChange]);

    if (!userId) {
        navigate('/login');
    }

    return (
        <div>
                <div className='container mx-auto my-5'>
                    <Row gutter={16}>
                        <Col span={16}>
                            <PaymentInfo cart={cart} setCart={setCart} cartChange={cartChange} setCartChange={setCartChange} />
                        </Col>
                        <Col span={8}>
                            <Sidebar cart={cart} />
                        </Col>
                    </Row>
                </div>
                </div>
    );
}

export default Payment;
