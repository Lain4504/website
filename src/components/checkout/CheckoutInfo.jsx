import React, { useState, useEffect } from 'react';
import { Button, message, Radio } from 'antd'; // Imported Radio and Button from Ant Design
import { Link, useNavigate } from 'react-router-dom'; // Added missing useNavigate and Link imports
import { getProvince, getDistrict, getWard, getWardById, getDistrictById, getProvinceById } from '../../services/AddressService';
import { updateCartItem } from '../../services/CartService';
import SelectAddress from '../shared/SelectAddress';
import { addOrder, updateOrder } from '../../services/OrderService';

const CheckoutInfo = ({ cart, setCart, cartChange, setCartChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [provinceName, setProvinceName] = useState();
    const [district, setDistrict] = useState();
    const [districts, setDistricts] = useState([]);
    const [districtName, setDistrictName] = useState();
    const [ward, setWard] = useState();
    const [wardName, setWardName] = useState();
    const [wards, setWards] = useState([]);
    const [reset, setReset] = useState(false);
    const [error, setError] = useState({
        emptyError: false,
        phoneError: false,
    });
    const [addressName, setAddressName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCart((prevCart) => ({
            ...prevCart,
            [name]: value,
        }));
    };

    const fetchAddressNames = async () => {
        if (!cart.address) return;

        const addressParts = cart.address.split(',');
        const wardId = addressParts[0];
        const districtId = addressParts[1];
        const provinceId = addressParts[2];

        try {
            const [wardRes, districtRes, provinceRes] = await Promise.all([
                getWardById(wardId),
                getDistrictById(districtId),
                getProvinceById(provinceId),
            ]);

            setWardName(wardRes);
            setDistrictName(districtRes);
            setProvinceName(provinceRes);

            setAddressName(`${wardRes}, ${districtRes}, ${provinceRes}`);
        } catch (error) {
            console.error('Error fetching address names:', error);
            setAddressName('Không tìm thấy địa chỉ');
        }
    };
    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const res = await getProvince();
                setProvinces(res?.data || []);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        setDistrict(null);
        setDistrictName(null);
        const fetchDistrict = async () => {
            if (province) {
                try {
                    const res = await getDistrict(province);
                    setDistricts(res?.data.districts || []);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };
        fetchDistrict();
        setReset(!province);
    }, [province]);

    useEffect(() => {
        setWard(null);
        setWardName(null);
        const fetchWard = async () => {
            if (district) {
                try {
                    const res = await getWard(district);
                    setWards(res?.data.wards || []);
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            }
        };
        fetchWard();
        setReset(!district);
    }, [district]);

    useEffect(() => {
        fetchAddressNames(); // Call to fetch address names if address exists
    }, [cart.address]);

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value);

    };
    const handleOrder = async () => {

        console.log("Cart data before saving:", cart);
    
        if (paymentMethod === 'bank') {
            const newAddress = cart.address || `${ward}, ${district}, ${province}`;
            const totalPay = cart.orderDetails?.reduce((total, item) => total + item.book.salePrice * item.amount, 0) + +cart.shippingPrice;
            console.log("Selected address data:", { newAddress });
    
            const orderUpdateData = {
                id: cart.id,
                name: cart.fullName,
                phone: cart.phone,
                address: newAddress,
                totalPrice: totalPay
            };
    
            try {
                const updateResponse = await updateOrder(cart.id, orderUpdateData);
                if (updateResponse.status === 200) {
                    await addOrder({ ...cart }); // Await addOrder to complete
                    const response = await fetch(`http://localhost:3001/api/vnpay/url/${cart.id}`);
                    const paymentUrl = await response.text();
                    console.log("Payment URL:", paymentUrl);
                    navigate(paymentUrl);
                } else {
                    message.error("Cập nhật đơn hàng không thành công. Vui lòng thử lại.");
                }
            } catch (err) {
                console.error("Error updating order or adding order:", err);
                message.error("Có lỗi xảy ra khi cập nhật đơn hàng hoặc thêm đơn hàng. Vui lòng thử lại.");
            }
        } 
        else if (paymentMethod === 'cod') {
            const newAddress = cart.address || `${ward}, ${district}, ${province}`;
            const totalPay = cart.orderDetails?.reduce((total, item) => total + item.book.salePrice * item.amount, 0) + +cart.shippingPrice;
            console.log("Selected address data:", { newAddress });
    
            const orderUpdateData = {
                id: cart.id,
                name: cart.fullName,
                phone: cart.phone,
                address: newAddress,
                totalPrice: totalPay
            };
    
            try {
                const updateResponse = await updateOrder(cart.id, orderUpdateData);
                if (updateResponse.status === 200) {
                    await addOrder({ ...cart });
                    navigate('/orderlist');
                } else {
                    message.error("Cập nhật đơn hàng không thành công. Vui lòng thử lại.");
                }
            } catch (err) {
                console.error("Error updating order or adding order:", err);
                message.error("Có lỗi xảy ra khi cập nhật đơn hàng hoặc thêm đơn hàng. Vui lòng thử lại.");
            }
        }
    };
    
    return (
        <div className="p-6">
            <div className="main-content">
                <h5 className="mb-4">Thông tin thanh toán</h5>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Họ và tên</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Họ và tên"
                            value={cart.fullName || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Email"
                            value={cart.email || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Điện thoại"
                            value={cart.phone || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    {!cart.address ? (
                        <div className="flex space-x-4">
                            <div className="w-1/3">
                                <label className="block mb-1 font-semibold">Tỉnh/Thành phố:</label>
                                <SelectAddress
                                    reset={reset}
                                    options={provinces}
                                    value={province}
                                    setValue={setProvince}
                                    setName={setProvinceName}
                                    name="su_province"
                                    label={cart.province}
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block mb-1 font-semibold">Quận/Huyện:</label>
                                <SelectAddress
                                    reset={reset}
                                    options={districts}
                                    value={district}
                                    setValue={setDistrict}
                                    setName={setDistrictName}
                                    name="su_district"
                                    label={cart.district}
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block mb-1 font-semibold">Phường/Xã:</label>
                                <SelectAddress
                                    reset={reset}
                                    options={wards}
                                    value={ward}
                                    setValue={setWard}
                                    setName={setWardName}
                                    name="su_ward"
                                    label={cart.ward}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="block mb-1 font-semibold">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={addressName || ''}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                readOnly
                            />
                        </div>
                    )}

                </div>

                <div className="p-6">
                    <h5 className="text-lg font-semibold">Phương thức thanh toán</h5>
                    <div className="mt-4">
                        <Radio.Group onChange={handlePayment} value={paymentMethod} className="flex flex-col">
                            <Radio value="cod" className="py-2">
                                Thanh toán khi nhận hàng (COD)
                            </Radio>
                            <Radio value="bank" className="py-2">
                                Chuyển khoản ngân hàng
                            </Radio>
                        </Radio.Group>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <Link to="/cart" className="text-blue-500 underline">
                        Quay lại giỏ hàng
                    </Link>
                    <Button onClick={handleOrder} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Tiến hành thanh toán
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default CheckoutInfo;
