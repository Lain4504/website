import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/UserService';
import { message, Modal, Button, Form, Input, Spin, Row, Col } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import UserSideBar from './UserSideBar';

const UserProfile = ({ cookies }) => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Profile' }
    ];

    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        const token = cookies.authToken;
        if (token) {
            try {
                const decoded = decodeJWT(token);
                const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                console.log("User ID from token: ", userId);

                const fetchUserInfo = async () => {
                    try {
                        const res = await getUserProfile(userId);
                        setProfileData(res?.data);
                        console.log("User profile data:", res?.data);
                        // Set loading to false after 1 second delay
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
        console.log('Received values:', values);
        // Here you would usually call an update API to save the changes
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Breadcrumb items={breadcrumbs} />
            <div className="flex h-a">
                <UserSideBar />
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
                                                <Form.Item label="Email">
                                                    <Input value={profileData?.email || ''} disabled placeholder="Chưa có thông tin" />
                                                </Form.Item>
                                            </Form>
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
                                                className="w-3/4" // Thiết lập chiều rộng là 3/4
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
                <Form layout="vertical" onFinish={handleOk}>
                    <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}>
                        <Input defaultValue={profileData?.fullName} />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input type="email" defaultValue={profileData?.email} />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input defaultValue={profileData?.phone} />
                    </Form.Item>
                    <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
                        <Input type="date" defaultValue={profileData?.dob ? new Date(profileData.dob).toISOString().split('T')[0] : ''} />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                        <Input defaultValue={profileData?.address} />
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
