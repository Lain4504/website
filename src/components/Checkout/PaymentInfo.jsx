import React from 'react';
import { Breadcrumb, Radio, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; 
import { addOrder } from '../../services/OrderService';

const PaymentInfo = ({ cart, setCart, cartChange, setCartChange }) => {
    const [paymentMethod, setPaymentMethod] = React.useState('cod');
    const navigate = useNavigate();
    const handleOrder = () => {
        if (paymentMethod === 'bank') {
            paymentMethod('/payment/bank');
        } else if (paymentMethod === 'cod') {
            addOrder(cart)
                .then((res) => {
                    navigate('/orderlist');
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
                    <Link to="/checkout" className="text-blue-500">
                        Trang trước
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
