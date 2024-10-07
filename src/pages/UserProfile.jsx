import React, { useEffect, useState } from 'react';
import { getUserProfile, updateProfile } from '../services/UserService';
import { message, Modal, Button, Form, Input, Spin, Row, Col, Select } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import UserNavBar from './UserNavBar';
import { jwtDecode } from 'jwt-decode';

const UserProfile = ({ cookies }) => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fade, setFade] = useState(true); // State to control fade effect

    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Profile' }
    ];

    useEffect(() => {
        const token = cookies.authToken;
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];

                const fetchUserInfo = async () => {
                    try {
                        const res = await getUserProfile(userId);
                        setProfileData(res?.data);
                        setTimeout(() => setLoading(false), 1000);
                    } catch (error) {
                        message.error('Failed to fetch user profile');
                        setLoading(false);
                    }
                };
                fetchUserInfo();
            } catch (error) {
                message.error('Invalid token');
                setLoading(false);
            }
        } else {
            message.error('No token found');
            setLoading(false);
        }
    }, [cookies.authToken]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        const token = cookies.authToken;

        if (!token) {
            message.error('No token found');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];

            await updateProfile(userId, values);
            message.success('Profile updated successfully');
            setIsModalVisible(false);
            const res = await getUserProfile(userId);
            setProfileData(res?.data);
        } catch (error) {
            message.error('Failed to update profile');
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Breadcrumb items={breadcrumbs} className="my-10" />
            <UserNavBar />
            <div className={`flex h-auto my-10 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex-1 p-6 bg-white shadow-md rounded-lg ml-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Spin size="large" tip="Đang tải thông tin người dùng..." />
                        </div>
                    ) : (
                        <>
                            {profileData ? (
                                <>
                                    <h2 className="text-2xl font-bold my-5">Hồ sơ</h2>
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form layout="vertical">
                                                <Form.Item label="Họ và Tên">
                                                    <Input value={profileData?.fullName || ''} disabled placeholder="Chưa có thông tin" />
                                                </Form.Item>
                                                <Form.Item label="Giới tính" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                                                    <Input value={profileData?.gender || ''} disabled placeholder="Chưa có thông tin" />
                                                </Form.Item>
                                            </Form>
                                            <Form.Item label="Email" style={{ marginTop: '16px' }}>
                                                <Input value={profileData?.email || ''} disabled placeholder="Chưa có thông tin" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form layout="vertical">
                                                <Form.Item label="Số điện thoại">
                                                    <Input value={profileData?.phone || ''} disabled placeholder="Chưa có thông tin" />
                                                </Form.Item>
                                                <Form.Item label="Ngày sinh">
                                                    <Input value={profileData?.dob ? new Date(profileData.dob).toLocaleDateString() : ''} disabled placeholder="Chưa có thông tin" />
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                    <hr className="my-4" />
                                    <Form layout="vertical">
                                        <Form.Item label={<strong>Địa chỉ:</strong>}>
                                            <Input
                                                className="w-3/4"
                                                disabled
                                                value={profileData?.address || 'Chưa có thông tin'}
                                            />
                                        </Form.Item>
                                    </Form>
                                    <Button type="primary" onClick={showModal} className="mt-4">
                                        Chỉnh sửa thông tin
                                    </Button>
                                </>
                            ) : (
                                <div>Không tìm thấy thông tin người dùng</div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Modal for Editing Profile */}
            <Modal
                title="Chỉnh sửa thông tin"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    layout="vertical"
                    onFinish={handleOk}
                    initialValues={{
                        fullName: profileData?.fullName,
                        gender: profileData?.gender,
                        email: profileData?.email,
                        phone: profileData?.phone,
                        dob: profileData?.dob ? new Date(profileData.dob).toISOString().split('T')[0] : '',
                        address: profileData?.address,
                    }}
                >
                    <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value="Male">Nam</Select.Option>
                            <Select.Option value="Female">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                        <Button onClick={handleCancel} className="ml-2">
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserProfile;
