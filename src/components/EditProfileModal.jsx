import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Row, Col, notification, message } from 'antd';
import SelectAddress from './SelectAddress'; 
import { getProvince, getDistrict, getWard } from '../services/AddressService'; 

const EditProfileModal = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(initialValues.province);
    const [selectedDistrict, setSelectedDistrict] = useState(initialValues.district);
    const [selectedWard, setSelectedWard] = useState(initialValues.ward);

    // Fetch address data
    useEffect(() => {
        if (initialValues) {
            setSelectedProvince(initialValues.province);
            setSelectedDistrict(initialValues.district);
            setSelectedWard(initialValues.ward);
        }
    }, [initialValues]);

    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await getProvince();
            setProvinces(response.data);
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                const response = await getDistrict(selectedProvince);
                setDistricts(response.data.districts);
            };
            fetchDistricts();
        } else {
            setDistricts([]); // Reset districts if no province is selected
            setSelectedDistrict(''); // Reset selected district
            setSelectedWard(''); // Reset selected ward
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                const response = await getWard(selectedDistrict);
                setWards(response.data.wards);
            };
            fetchWards();
        } else {
            setWards([]); // Reset wards if no district is selected
            setSelectedWard(''); // Reset selected ward
        }
    }, [selectedDistrict]);

    const handleAddressChange = () => {
        const address = `${selectedWard || ''}, ${selectedDistrict || ''}, ${selectedProvince || ''}`.trim();
        return address.replace(/, +/g, ', ').replace(/, $/, ''); // Clean up the address string
    };

    const handleFinish = (values) => {
        // Kiểm tra xem tất cả các trường đã được chọn chưa
        if (!selectedProvince || !selectedDistrict || !selectedWard) {
            message.error("Vui lòng chọn đủ Tỉnh, Huyện và Xã."); // Sử dụng message từ Ant Design
            return; // Ngừng thực hiện nếu chưa đủ
        }

        const updatedValues = {
            fullName: values.fullName || initialValues.fullName,
            gender: values.gender || initialValues.gender,
            dob: values.dob || initialValues.dob,
            phone: values.phone || initialValues.phone,
            address: (selectedProvince !== initialValues.province || selectedDistrict !== initialValues.district || selectedWard !== initialValues.ward)
                ? handleAddressChange()
                : initialValues.address,
        };

        onSubmit(updatedValues);
    };


    return (
        <Modal
            title="Chỉnh sửa thông tin"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
            className="rounded-lg shadow-md"
        >
            <div className="space-y-4">
                <div>
                    <label className="font-bold">Họ và Tên</label>
                    <Input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" defaultValue={initialValues.fullName} />
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <div>
                            <label className="font-bold">Giới tính</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                defaultValue={initialValues.gender}
                                onChange={(e) => setSelectedProvince(e.target.value)}>
                                <option value="" disabled>Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <label className="font-bold">Ngày sinh</label>
                            <Input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                defaultValue={initialValues.dob} />
                        </div>
                    </Col>
                </Row>

                <div>
                    <label className="font-bold">Số điện thoại</label>
                    <Input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" defaultValue={initialValues.phone} />
                </div>

                <div>
                    <label className="font-bold">Địa chỉ</label>
                    <Row gutter={16}>
                        <Col span={8}>
                            <SelectAddress 
                                label="Tỉnh" 
                                options={provinces} 
                                name="province" 
                                setValue={(value) => {
                                    setSelectedProvince(value);
                                    setSelectedDistrict(''); // Reset district when province changes
                                    setSelectedWard(''); // Reset ward when province changes
                                }}
                                initialValue={selectedProvince} // Chỉ truyền code
                            />
                        </Col>
                        <Col span={8}>
                            <SelectAddress 
                                label="Huyện" 
                                options={districts} 
                                name="district" 
                                setValue={(value) => {
                                    setSelectedDistrict(value);
                                    setSelectedWard(''); // Reset ward when district changes
                                }}
                                initialValue={selectedDistrict} // Chỉ truyền code
                            />
                        </Col>
                        <Col span={8}>
                            <SelectAddress 
                                label="Xã" 
                                options={wards} 
                                name="ward" 
                                setValue={setSelectedWard}
                                initialValue={selectedWard} // Chỉ truyền code
                            />
                        </Col>
                    </Row>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="primary"
                        onClick={handleFinish}
                        className="bg-blue-500 hover:bg-blue-600 text-white border-none rounded-lg px-6 py-2">
                        Lưu
                    </Button>
                    <Button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                        Hủy
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileModal;
