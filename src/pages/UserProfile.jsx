import React, { useContext, useEffect, useState } from 'react';
import { getUserProfile, updateProfile } from '../services/UserService';
import { message, Spin, Row, Col, Input, Button, Form } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import UserNavBar from './UserNavBar';
import { AuthContext } from '../context/AuthContext';
import EditProfileModal from '../components/EditProfileModal'; // Import modal for editing profile

const UserProfile = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [profileData, setProfileData] = useState(null); // User profile data
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
    const { currentUser } = useContext(AuthContext); 
    const userId = currentUser ? currentUser.userId : null; // Extract user ID from context
    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Tài khoản' }
    ];

    // Fetch user profile data
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getUserProfile(userId);
                setProfileData(res?.data);
            } catch (error) {
                message.error('Failed to fetch user profile');
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };
        if (userId) fetchUserInfo(); // Fetch user info only if userId is available
    }, [userId]);

    const showModal = () => {
        setIsModalVisible(true); // Show edit modal
    };

    const handleOk = async (values) => {
        try {
            await updateProfile(userId, values); // Update profile with new values
            message.success('Profile updated successfully');
            setIsModalVisible(false);
            const res = await getUserProfile(userId); // Refetch updated profile data
            setProfileData(res?.data);
        } catch (error) {
            message.error('Failed to update profile');
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Hide edit modal
    };

    return (
        <>
            <Breadcrumb items={breadcrumbs} className="my-10" />
            <UserNavBar />
            <div className="flex h-auto my-10">
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

            {/* EditProfileModal for editing user details */}
            <EditProfileModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSubmit={handleOk}
                initialValues={{
                    fullName: profileData?.fullName,
                    gender: profileData?.gender,
                    email: profileData?.email,
                    phone: profileData?.phone,
                    dob: profileData?.dob ? new Date(profileData.dob).toISOString().split('T')[0] : '',
                    address: profileData?.address,
                }}
            />
        </>
    );
};

export default UserProfile;
