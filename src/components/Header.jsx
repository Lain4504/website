import React from "react";
import { FacebookFilled, InstagramFilled, YoutubeFilled, MailFilled, PhoneFilled } from '@ant-design/icons';

const Header = () => {
    return (
        <div className="bg-blue-700 py-2 w-screen absolute top-0 left-0 z-50">
            <div className="mx-auto max-w-screen-xl"> 
                <div className="flex flex-wrap items-center justify-between">
                    {/* Social Network */}
                    <div className="w-full lg:w-2/12 mb-4 lg:mb-0">
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/" className="text-white hover:text-gray-300">
                                <FacebookFilled />
                            </a>
                            <a href="https://www.instagram.com/?hl=en" className="text-white hover:text-gray-300">
                                <InstagramFilled />
                            </a>
                            <a href="https://www.youtube.com/" className="text-white hover:text-gray-300">
                                <YoutubeFilled />
                            </a>
                        </div>
                    </div>

                    {/* Short News */}
                    <div className="w-full lg:w-5/12 mb-4 lg:mb-0">
                        <div className="flex items-center space-x-2">
                            <marquee behavior="scroll" direction="left" className="text-white text-sm">
                                Chào mừng bạn đến với FOREVER. Nếu bạn cần giúp đỡ, Hãy liên lạc với chúng tôi qua số hotline: (+84) 915234798 hoặc email: Bookstore@gmail.com
                            </marquee>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="w-full lg:w-5/12 text-right">
                        <div className="space-x-4">
                            <a href="tel:(+84) 1900561595" className="text-white hover:text-gray-300">
                                <PhoneFilled /> (+84) 915234798
                            </a>
                            <a href="mailto:cskh_online@sachtructuyen.com.vn" className="text-white hover:text-gray-300">
                                <MailFilled /> ForeverBookStore@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
