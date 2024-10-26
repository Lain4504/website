import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CheckoutInfo from '../../components/checkout/CheckoutInfo';
import Sidebar from '../../components/checkout/Sidebar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAllCartByUserId } from '../../services/CartService';
import Breadcrumb from '../../components/shared/Breadcrumb';
const Checkout = () => {
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
                    console.log(userId)
                    setCart(cartData?.data || []); // Ensure cart is set to an empty array if no data
                } catch (error) {
                    console.error(error);
                }
            }
        };

        handleCart();
    }, [userId, cartChange]); // Fetch cart when userId or cartChange updates

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        } else if (cart?.orderDetails?.length === 0) {
            navigate('/cart');
        }
    }, [userId, cart, navigate]);
    const breadcrumbs = [{ title: 'Trang chủ', href: '/' }, { title: 'Kiểm tra thông tin' }];
    return (
        <>
            <Breadcrumb items={breadcrumbs} />
            <div>
                <div className='container mx-auto my-5'>
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
        </>
    );
};

export default Checkout;
