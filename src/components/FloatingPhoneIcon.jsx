import React from 'react';
import { Button, Tooltip } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

const FloatingPhoneIcon = () => {
    const handleClick = () => {
        window.open('https://www.facebook.com/your_fanpage', '_blank'); // Thay đổi URL này thành URL fanpage của bạn
    };

    return (
        <Tooltip title="Liên hệ chúng tôi nếu bạn cần hỗ trợ" className='md:w-8 md:h-8'>
            <Button
                type="primary"
                shape="circle"
                icon={<PhoneOutlined />}
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
                onClick={handleClick}
                className="fixed bottom-5 left-5 w-16 h-16 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl"
            />
        </Tooltip>
    );
};

export default FloatingPhoneIcon;
