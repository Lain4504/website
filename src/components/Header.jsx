import React from "react";
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Header = () => {
    return (
        <div className="bg-blue-700 py-2 w-screen absolute top-0 left-0 z-50">
            <div className="mx-auto max-w-screen-xl"> 
                <div className="flex flex-wrap items-center justify-between">
                    {/* Social Network */}
                    <div className="w-full lg:w-2/12 mb-4 lg:mb-0">
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/is.mycampione/" className="text-white hover:text-gray-300">
                                <FacebookIcon />
                            </a>
                            <a href="https://www.instagram.com/?hl=en" className="text-white hover:text-gray-300">
                                <InstagramIcon />
                            </a>
                            <a href="https://www.youtube.com/" className="text-white hover:text-gray-300">
                                <YouTubeIcon />
                            </a>
                        </div>
                    </div>

                    {/* Short News */}
                    <div className="w-full lg:w-5/12 mb-4 lg:mb-0">
                        <div className="flex items-center space-x-2">
                            <marquee behavior="scroll" direction="left" className="text-white text-sm"> {/* Chữ nhỏ hơn */}
                                Chào mừng bạn đến với FOREVER. Nếu bạn cần giúp đỡ, Hãy liên lạc với chúng tôi qua số hotline: (+84) 123456789 hoặc email: bookstore@gmail.com
                            </marquee>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="w-full lg:w-5/12 text-right">
                        <div className="space-x-4">
                            <a href="tel:(+84) 1900561595" className="text-white hover:text-gray-300"> {/* Chữ trắng */}
                                <i className="fa fa-phone" aria-hidden="true"></i> (+84) 123456789
                            </a>
                            <a href="mailto:cskh_online@sachtructuyen.com.vn" className="text-white hover:text-gray-300"> {/* Chữ trắng */}
                                <i className="fa fa-envelope" aria-hidden="true"></i> bookstore@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
}

export default Header;
