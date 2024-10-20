import React, { useState, useEffect } from 'react';
import { Breadcrumb, Form, Input, Button, Select } from 'antd';
import { getProvince, getDistrict, getWard } from '../../services/AddressService';
import { updateCartItem } from '../../services/CartService';
import SelectAddress from '../SelectAddress';
const CheckoutInfo = ({cart, setCart, cartChange, setCartChange }) => {
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
    const [error, setError] = useState({
        emptyError: false,
        phoneError: false
    });

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
        window.location.href = '/payment';
    };

    useEffect(() => {
        const fetchProvince = async () => {
            const res = await getProvince();
            setProvices(res?.data);
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        setDistrict(null);
        setDistrictName(null);
        const fetchDistrict = async () => {
            const res = await getDistrict(province);
            setDistricts(res?.data.districts);
        };
        province && fetchDistrict();
        setReset(!province);
        if (!province) setDistricts([]);
    }, [province]);

    useEffect(() => {
        setWard(null);
        setWardName(null);
        const fetchWard = async () => {
            const res = await getWard(district);
            setWards(res?.data.wards);
        };
        district && fetchWard();
        setReset(!district);
        if (!district) setWards([]);
    }, [district]);

    return (
        <div className="p-6">
            <div className="main-content">
                <h5 className="mb-4">Thông tin thanh toán</h5>
                <Form layout="vertical">
                    <Form.Item label="Họ và tên" required>
                        <Input
                            autoComplete='off'
                            name='fullName'
                            placeholder='Họ và tên'
                            value={cart.fullName || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" required>
                        <Input
                            type="text"
                            autoComplete='off'
                            name='phone'
                            placeholder='Điện thoại'
                            value={cart.phone || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" required>
                        <Input
                            autoComplete='off'
                            name='address'
                            placeholder='Địa chỉ'
                            value={cart.address || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Tỉnh/Thành phố:">
                        <SelectAddress
                            reset={reset}
                            options={provinces}
                            value={province}
                            setValue={setProvince}
                            setName={setProvinceName}
                            name='su_province'
                            label={cart.province}
                        />
                    </Form.Item>
                    <Form.Item label="Quận/Huyện:">
                        <SelectAddress
                            reset={reset}
                            options={districts}
                            value={district}
                            setValue={setDistrict}
                            setName={setDistrictName}
                            name='su_district'
                            label={cart.district}
                        />
                    </Form.Item>
                    <Form.Item label="Phường/Xã:">
                        <SelectAddress
                            reset={reset}
                            options={wards}
                            value={ward}
                            setValue={setWard}
                            setName={setWardName}
                            name='su_ward'
                            label={cart.ward}
                        />
                    </Form.Item>
                </Form>
                <div className="mb-2 flex justify-between">
                    <a href="/cart" className="text-blue-500">
                        Giỏ hàng
                    </a>
                    <Button type="primary" onClick={handleToPayment}>
                        Phương thức thanh toán
                    </Button>
                </div>
                {error.emptyError && <div >Vui lòng điền đầy đủ thông tin</div>}
                {error.phoneError && <div >Số điện thoại không hợp lệ</div>}
            </div>
        </div>
    );
};

export default CheckoutInfo;
