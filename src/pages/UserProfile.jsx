import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/UserService';
import { message } from 'antd';
import Breadcrumb from '../components/Breadcrumb';
import { useParams } from 'react-router-dom';

const UserProfile = ({ cookies }) => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    const breadcrumbs = [
        { title: 'Home', href: '/' },
        { title: 'Profile' }
    ];

    // Hàm giải mã JWT
    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1]; // Lấy phần payload của JWT
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        const token = cookies.authToken;
        if (token) {
            try {
                const decoded = decodeJWT(token); // Sử dụng hàm decodeJWT custom
                const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]; // Lấy ID người dùng từ token
                console.log("User ID from token: ", userId);
                
                const fetchUserInfo = async () => {
                    try {
                        const res = await getUserProfile(userId); 
                        setProfileData(res?.data);
                        console.log("User profile data:", res?.data); // Ghi log dữ liệu profile
                        setLoading(false); // Dừng hiển thị loading sau khi lấy được dữ liệu
                    } catch (error) {
                        message.error('Failed to fetch user profile');
                        setLoading(false); // Dừng hiển thị loading khi có lỗi
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

    if (loading) return <div>Đang tải thông tin người dùng...</div>; // Hiển thị thông báo đang tải

    if (!profileData) return <div>Không tìm thấy thông tin người dùng</div>; // Xử lý khi không có dữ liệu

    return (
    <div>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex justify-center items-center">
            <div className="md:w-1/2 lg:w-1/3 text-center">
                <div>
                    <p><strong>Full Name:</strong> {profileData?.fullName || 'Chưa có thông tin'}</p>
                    <p><strong>Email:</strong> {profileData?.email || 'Chưa có thông tin'}</p>
                    <p><strong>Phone:</strong> {profileData?.phone || 'Chưa có thông tin'}</p>
                    <p><strong>Date of Birth:</strong> {profileData?.dob || 'Chưa có thông tin'}</p>
                    <p><strong>Address:</strong> {profileData?.address || 'Chưa có thông tin'}</p>
                </div>
            </div>
        </div>
    </div>
);

};

export default UserProfile;
