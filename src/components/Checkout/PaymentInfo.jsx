import React from 'react';
import { Breadcrumb, Radio, Button } from 'antd';
import { Link } from 'react-router-dom'; // Ensure to use Link from react-router for routing
import { addOrder } from '../../services/OrderService';

const PaymentInfo = () => {
    const [paymentMethod, setPaymentMethod] = React.useState('cod');

    const handleOrder = () => {
        if (paymentMethod === 'paypal') {
            window.location.href = '/checkout/payment/paypal';
        } else if (paymentMethod === 'cod') {
            addOrder(cart)
                .then((res) => {
                    window.location.href = '/account';
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className='p-6'>
            <div className="mb-4">
                <Link to="/">
                    <h4 className="text-xl font-bold">Nhà xuất bản sách mới</h4>
                </Link>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/cart">Giỏ hàng</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/checkout">Thông tin vận chuyển</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Phương thức thanh toán
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="mt-3">
                <h5 className="text-lg font-semibold">Phương thức thanh toán</h5>
                <div className="mt-4">
                    <Radio.Group onChange={handlePayment} value={paymentMethod} className="flex flex-col">
                        <Radio value="cod" className="flex items-center mb-4">
                            <span className="radio-label-primary">Thanh toán khi giao hàng (COD)</span>
                        </Radio>
                        <Radio value="bank" className="flex items-center">
                            <span className="radio-label-primary">Chuyển khoản</span>
                        </Radio>
                    </Radio.Group>
                </div>

                <div className="mb-2 flex justify-between mt-6">
                    <Link to="/cart" className="text-blue-500">
                        Giỏ hàng
                    </Link>
                    <Button type="primary" onClick={handleOrder}>
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentInfo;
