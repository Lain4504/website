import React from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PolicyIcon from '@mui/icons-material/Policy';
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* Section 1 */}
                {/* Location */}
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="" />
                    <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-gray-200">
                            <LocationOnIcon className="text-gray-600" />
                        </div>
                        <p className="ml-3 w-full md:w-2/3 text-gray-600">
                            Số 110 Nguyễn Ngọc Nại, Khương Mai, Thanh Xuân, Hà Nội
                        </p>
                    </div>
                    {/* Phone */}
                    <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-gray-200">
                            <LocalPhoneIcon className="text-gray-600" />
                        </div>
                        <p className="ml-3 w-full md:w-2/3 text-gray-600">
                            Hotline: 03 2838 3979
                        </p>
                    </div>
                    {/* Email*/}
                    <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-gray-200">
                            <EmailIcon className="text-gray-600" />
                        </div>
                        <p className="ml-3 w-full md:w-2/3 text-gray-600">
                            Email: online.ipmvn@gmail.com
                        </p>
                    </div>
                    {/* Policy*/}
                    <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-gray-200">
                            <PolicyIcon className="text-gray-600" />
                        </div>
                        <p className="ml-3 w-full md:w-2/3 text-gray-600">
                            Giấy phép DKKD số 0101507251, cấp lần thứ 6 năm 2019
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <p className="text-xl font-medium mb-5"> Hỗ trợ khách hàng</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Câu hỏi thường gặp</li>
                        <li>Điều khoản dịch vụ</li>
                    </ul>
                </div>

                {/* Section 3 */}
                <div>
                    <p className="text-xl font-medium mb-5">Chính sách</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách thanh toán</li>
                        <li>Chính sách vận chuyển</li>
                        <li>Chích sách đổi trả</li>
                    </ul>
                </div>

                {/* Section 4 */}
                <div>
                    <p className="text-xl font-medium mb-5">Kết nối mạng xã hội</p>
                    <div className="flex space-x-4 ">
                        <Link to={`https://www.facebook.com/`} target='_blank'>
                            <FacebookIcon />
                        </Link>
                        <Link to={`https://www.youtube.com/channel/UCnqGt1p0QZ9gw4-cykvjjSg`} target='_blank'>
                            <YouTubeIcon />
                        </Link>
                        <Link to={`https://www.instagram.com/?hl=en`} target='_blank'>
                            <InstagramIcon />
                        </Link>
                        <Link to={`https://www.x.com/?hl=en`} target='_blank'>
                            <XIcon />
                        </Link>
                    </div>
                </div>

            </div>

            <div>
                <hr/>
                <p className="py-5 text-sm text-center"> Copyright 2024@ Book Store - All Right Reserved </p>
            </div>
        </div>
    )
}
export default Footer;