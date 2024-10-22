import React, { useContext, useEffect, useState } from 'react';
import { getUserProfile, updateProfile } from '../../services/UserService';
import { getProvinceById, getDistrictById, getWardById } from '../../services/AddressService'; 
import { Button, message } from 'antd';
import Breadcrumb from '../../components/shared/Breadcrumb';
import UserNavBar from '../../components/account/UserNavBar';
import { AuthContext } from '../../context/AuthContext';
import EditProfileModal from '../../components/modal/EditProfileModal';
import moment from 'moment';

const UserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [addressName, setAddressName] = useState(''); // State để lưu tên địa chỉ
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser ? currentUser.userId : null;
    const breadcrumbs = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Tài khoản' }
    ];

    const addressParts = profileData?.address ? profileData.address.split(',') : [];
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getUserProfile(userId);
                setProfileData(res?.data);
                await fetchAddressNames(res?.data?.address); // Gọi hàm lấy tên địa chỉ
            } catch (error) {
                message.error('Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };
        if (userId) fetchUserInfo();
    }, [userId]);

    const fetchAddressNames = async (address) => {
        if (!address) return;

        const addressParts = address.split(',');
        const wardId = addressParts[0];
        const districtId = addressParts[1];
        const provinceId = addressParts[2];

        try {
            const [wardRes, districtRes, provinceRes] = await Promise.all([
                getWardById(wardId),
                getDistrictById(districtId),
                getProvinceById(provinceId)
            ]);
            setAddressName(`${wardRes}, ${districtRes}, ${provinceRes}`);
        } catch (error) {
            console.error('Error fetching address names:', error);
            setAddressName('Không tìm thấy địa chỉ');
        }
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        try {
            await updateProfile(userId, values);
            message.success('Profile updated successfully');
            setIsModalVisible(false);
            const res = await getUserProfile(userId);
            setProfileData(res?.data);
            await fetchAddressNames(res?.data?.address); // Cập nhật tên địa chỉ sau khi cập nhật profile
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
            <div className="flex flex-col items-center my-10">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-10">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-lg text-gray-600">Đang tải thông tin người dùng...</div>
                        </div>
                    ) : (
                        <>
                            {profileData ? (
                                <>
                                    <h2 className="text-3xl font-bold mb-6">Hồ sơ</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                                                <input
                                                    type="text"
                                                    value={profileData?.fullName || ''}
                                                    disabled
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900"
                                                    placeholder="Chưa có thông tin"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                                                <input
                                                    type="text"
                                                    value={profileData?.gender || ''}
                                                    disabled
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900"
                                                    placeholder="Chưa có thông tin"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    value={profileData?.email || ''}
                                                    disabled
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900"
                                                    placeholder="Chưa có thông tin"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                                <input
                                                    type="text"
                                                    value={profileData?.phone || ''}
                                                    disabled
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900"
                                                    placeholder="Chưa có thông tin"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                                                <input
                                                    type="text"
                                                    value={profileData?.dob ? new Date(profileData.dob).toLocaleDateString() : ''}
                                                    disabled
                                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900"
                                                    placeholder="Chưa có thông tin"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                        <input
                                            type="text"
                                            value={addressName || 'Chưa có thông tin'}
                                            disabled
                                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900"
                                            placeholder="Chưa có thông tin"
                                        />
                                    </div>
                                    <Button
                                        onClick={showModal}
                                        className="px-6 py-2 mt-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                                    >
                                        Chỉnh sửa thông tin
                                    </Button>
                                </>
                            ) : (
                                <div className="text-center text-gray-500">Không tìm thấy thông tin người dùng</div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <EditProfileModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSubmit={handleOk}
                initialValues={{
                    fullName: profileData?.fullName,
                    gender: profileData?.gender,
                    email: profileData?.email,
                    phone: profileData?.phone,
                    dob: profileData?.dob ? moment(profileData.dob).format('YYYY-MM-DD') : '',
                    address: profileData?.address,
                    province: addressParts.length > 0 ? addressParts[2]?.trim() : '',  // Tỉnh
                    district: addressParts.length > 1 ? addressParts[1]?.trim() : '',  // Huyện
                    ward: addressParts.length > 2 ? addressParts[0]?.trim() : '',
                }}
            />
        </>
    );
};

export default UserProfile;
