import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Row, Col, message } from 'antd';
import SelectAddress from '../shared/SelectAddress'; 
import { getProvince, getDistrict, getWard } from '../../services/AddressService'; 

const EditProfileModal = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(initialValues.province);
    const [selectedDistrict, setSelectedDistrict] = useState(initialValues.district);
    const [selectedWard, setSelectedWard] = useState(initialValues.ward);
    const [fullName, setFullName] = useState(initialValues.fullName);
    const [gender, setGender] = useState(initialValues.gender);
    const [dob, setDob] = useState(initialValues.dob);
    const [phone, setPhone] = useState(initialValues.phone);

    // Fetch address data
    useEffect(() => {
        if (initialValues) {
            setSelectedProvince(initialValues.province);
            setSelectedDistrict(initialValues.district);
            setSelectedWard(initialValues.ward);
            setFullName(initialValues.fullName);
            setGender(initialValues.gender);
            setDob(initialValues.dob);
            setPhone(initialValues.phone);
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

    const handleFinish = () => {
        // Check if all required fields are selected
        if (!selectedProvince || !selectedDistrict || !selectedWard) {
            message.error("Vui lòng chọn đủ Tỉnh, Huyện và Xã."); // Use message from Ant Design
            return; // Stop execution if not enough
        }

        const updatedValues = {
            fullName,
            gender,
            dob,
            phone,
            address: (selectedProvince !== initialValues.province || selectedDistrict !== initialValues.district || selectedWard !== initialValues.ward)
                ? handleAddressChange()
                : initialValues.address,
        };
        console.log(updatedValues);
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
                    <Input 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    />
                </div>

                <Row gutter={16}>
                    <Col span={12}>
                        <div>
                            <label className="font-bold">Giới tính</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
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
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            />
                        </div>
                    </Col>
                </Row>

                <div>
                    <label className="font-bold">Số điện thoại</label>
                    <Input 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    />
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
                                initialValue={selectedProvince} // Only pass code
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
                                initialValue={selectedDistrict} // Only pass code
                            />
                        </Col>
                        <Col span={8}>
                            <SelectAddress 
                                label="Xã" 
                                options={wards} 
                                name="ward" 
                                setValue={setSelectedWard}
                                initialValue={selectedWard} // Only pass code
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
