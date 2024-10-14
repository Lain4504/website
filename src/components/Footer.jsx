import React from "react";
import { PhoneFilled, EnvironmentFilled, MailFilled, FacebookFilled, YoutubeFilled, InstagramFilled, FileAddFilled, CloseOutlined } from '@ant-design/icons';
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div>
                <hr />
                <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
                    {/* Section 1 */}
                    {/* Location */}
                    <div>
                        <img src={assets.logo} className="mb-5 w-32" alt="" />
                        <div className="flex items-center mb-3">
                            <div className="p-2 rounded-full bg-gray-200">
                                <EnvironmentFilled className="text-gray-600" />
                            </div>
                            <p className="ml-3 w-full md:w-2/3 text-gray-600">
                                FPT University, Quy Nhon City
                            </p>
                        </div>
                        {/* Phone */}
                        <div className="flex items-center mb-3">
                            <div className="p-2 rounded-full bg-gray-200">
                                <PhoneFilled className="text-gray-600" />
                            </div>
                            <p className="ml-3 w-full md:w-2/3 text-gray-600">
                                Hotline: 0915234798
                            </p>
                        </div>
                        {/* Email */}
                        <div className="flex items-center mb-3">
                            <div className="p-2 rounded-full bg-gray-200">
                                <MailFilled className="text-gray-600" />
                            </div>
                            <p className="ml-3 w-full md:w-2/3 text-gray-600">
                                Email: ForeverBookStore@gmail.com
                            </p>
                        </div>
                        {/* Policy */}
                        <div className="flex items-center mb-3">
                            <div className="p-2 rounded-full bg-gray-200">
                                <FileAddFilled className="text-gray-600" />
                            </div>
                            <p className="ml-3 w-full md:w-2/3 text-gray-600">
                                Giấy phép DKKD số 0101507251, cấp lần thứ 6 năm 2024
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <p className="text-xl font-medium mb-5">Hỗ trợ khách hàng</p>
                        <ul className="flex flex-col gap-1 text-gray-600">
                            <Link to={'/termsofservice'}>
                                <li className="hover:text-blue-500 cursor-pointer">Câu hỏi thường gặp</li>
                            </Link>
                            <Link to={'/faq'}>
                            <li className="hover:text-blue-500 cursor-pointer">Điều khoản dịch vụ</li>
                            </Link>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <p className="text-xl font-medium mb-5">Chính sách</p>
                        <ul className="flex flex-col gap-1 text-gray-600">
                            <Link to={'/privacypolicy'}>
                                <li className="hover:text-blue-500 cursor-pointer">Chính sách bảo mật</li>
                            </Link>
                            <Link to={'/paymentpolicy'}>
                                <li className="hover:text-blue-500 cursor-pointer">Chính sách thanh toán</li>
                            </Link>
                            <Link to={'/shippingpolicy'}>
                                <li className="hover:text-blue-500 cursor-pointer">Chính sách vận chuyển</li>
                            </Link>
                            <Link to={'/privacypolicy'}>
                                <li className="hover:text-blue-500 cursor-pointer">Chính sách đổi trả</li>
                            </Link>
                        </ul>
                    </div>


                    {/* Section 4 */}
                    <div>
                        <p className="text-xl font-medium mb-5">Kết nối mạng xã hội</p>
                        <div className="flex space-x-4 ">
                            <Link to={`https://www.facebook.com/`} target='_blank'>
                                <FacebookFilled style={{ fontSize: '24px' }} />
                            </Link>
                            <Link to={`https://www.youtube.com/@lain_4504`} target='_blank'>
                                <YoutubeFilled style={{ fontSize: '24px' }} />
                            </Link>
                            <Link to={`https://www.instagram.com/?hl=en`} target='_blank'>
                                <InstagramFilled style={{ fontSize: '24px' }} />
                            </Link>
                            <Link to={`https://www.x.com/?hl=en`} target='_blank'>
                                <CloseOutlined style={{ fontSize: '24px' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
