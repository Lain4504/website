import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'antd'; 
import { Button, Input, Alert } from 'antd'; 
// import SelectAddress from '../Home/SelectAddress';
// import { getProvince, getDistrict, getWard } from '../../services/CityService';
import { updateCartItem } from '../services/CartService';
import { useNavigate } from 'react-router-dom';

const CheckoutInfo = ({ cart, setCart, cartChange, setCartChange }) => {
    const [provinces, setProvices] = useState([]);
    const [province, setProvince] = useState();
    const [province_name, setProvinceName] = useState();
    const [district, setDistrict] = useState();
    const [districts, setDistricts] = useState([]);
    const [district_name, setDistrictName] = useState();
    const [ward, setWard] = useState();
    const [ward_name, setWardName] = useState();
    const [wards, setWards] = useState([]);
    const [reset, setReset] = useState(false);
    const [error, setError] = useState({ emptyError: false, phoneError: false });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCart(prevCart => ({
            ...prevCart,
            [name]: value
        }));
    };

    const handleToPayment = () => {
        if (!cart.fullName || !cart.phone || !cart.address) {
            setError(prevError => ({
                ...prevError,
                emptyError: true
            }));
            return;
        }
        const phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (!phone_regex.test(cart.phone)) {
            setError(prevError => ({
                ...prevError,
                phoneError: true
            }));
            return;
        }
        if (province_name && district_name && ward_name) {
            setCart(prevCart => ({
                ...prevCart,
                province: province_name,
                district: district_name,
                ward: ward_name
            }));
        }
        updateCartItem(cart).then(res => {
            setCartChange(!cartChange);
        });
        navigate('/checkout/payment');
    };

    useEffect(() => {
        const fetchProvince = async () => {
            const res = await getProvince();
            setProvices(res?.data);
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        const fetchDistrict = async () => {
            const res = await getDistrict(province);
            setDistricts(res?.data.districts);
        };
        province && fetchDistrict();
    }, [province]);

    useEffect(() => {
        const fetchWard = async () => {
            const res = await getWard(district);
            setWards(res?.data.wards);
        };
        district && fetchWard();
    }, [district]);

    return (
        <div className="main">
            <div className="main-header mb-6">
                <a href="/" className="text-lg font-semibold text-gray-800"><h4>Nhà xuất bản sách mới</h4></a>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/cart">Giỏ hàng</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Thông tin vận chuyển
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Phương thức thanh toán
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="main-content">
                <div className="step">
                    <div className="step-sections">
                        <div className="section">
                            <div className="section-header mb-4">
                                <h5 className="text-xl font-semibold">Thông tin thanh toán</h5>
                            </div>
                            <div className="section-content section-customer-information">
                                <div className="mb-3">
                                    <label htmlFor="name" className="block text-sm font-medium">Họ và tên</label>
                                    <Input
                                        id="name"
                                        name="fullName"
                                        placeholder="Họ và tên"
                                        value={cart.fullName || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="block text-sm font-medium">Số điện thoại</label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="Số điện thoại"
                                        value={cart.phone || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="block text-sm font-medium">Địa chỉ</label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="Địa chỉ"
                                        value={cart.address || ''}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="mb-3">
                                    <Row gutter={16}>
                                        <Col lg={8}>
                                            <label htmlFor="province" className="block text-sm font-medium">Tỉnh/Thành phố</label>
                                            <SelectAddress
                                                reset={reset}
                                                options={provinces}
                                                value={province}
                                                setValue={setProvince}
                                                setName={setProvinceName}
                                                name="su_province"
                                                label={cart.province}
                                            />
                                        </Col>
                                        <Col lg={8}>
                                            <label htmlFor="district" className="block text-sm font-medium">Quận/Huyện</label>
                                            <SelectAddress
                                                reset={reset}
                                                options={districts}
                                                value={district}
                                                setValue={setDistrict}
                                                setName={setDistrictName}
                                                name="su_district"
                                                label={cart.district}
                                            />
                                        </Col>
                                        <Col lg={8}>
                                            <label htmlFor="ward" className="block text-sm font-medium">Phường/Xã</label>
                                            <SelectAddress
                                                reset={reset}
                                                options={wards}
                                                value={ward}
                                                setValue={setWard}
                                                setName={setWardName}
                                                label={cart.ward}
                                                name="su_ward"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="step-footer mt-4 flex justify-between">
                        <a href="/cart" className="text-blue-500 hover:underline">Giỏ hàng</a>
                        <Button
                            type="primary"
                            onClick={handleToPayment}
                            className="step-footer-continue-btn bg-blue-500 hover:bg-blue-600"
                        >
                            Phương thức thanh toán
                        </Button>
                    </div>
                    {error.emptyError && <Alert message="Vui lòng điền đầy đủ thông tin" type="error" showIcon />}
                    {error.phoneError && <Alert message="Số điện thoại không hợp lệ" type="error" showIcon />}
                </div>
            </div>
        </div>
    );
};

export default CheckoutInfo;
