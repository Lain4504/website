import React from 'react';
import { Typography, Divider } from 'antd'; // Ant Design component
import Title from '../../components/Title';

const { Paragraph } = Typography;

const PaymentPolicy = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center mb-6 text-2xl">  <Title text1={'Chính sách'} text2={'thanh toán'}/></h2>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">Thanh toán bằng tiền mặt khi nhận hàng (COD)</Paragraph>
      <Paragraph className="text-gray-700">
        Sau khi khách hàng đặt hàng thành công trên website sẽ có email của IPM gửi về email quý khách để thông báo lại
        thông tin đơn hàng quý khách vừa đặt.
      </Paragraph>
      <Paragraph className="text-gray-700">
        Các yêu cầu giao hàng cần có thông tin chính xác về người nhận, địa chỉ, số điện thoại. Một số trường hợp nhạy
        cảm như: giá trị đơn hàng lớn, thời gian giao hàng buổi tối, địa chỉ giao hàng trong ngõ, khu vực xa trung tâm...
        Nhân viên xử lý đơn hàng sẽ kiểm tra và trao đổi thêm với khách hàng, thống nhất cách thức giao hàng cụ thể trước
        khi giao.
      </Paragraph>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">Thanh toán trả trước khi đặt hàng</Paragraph>
      <Paragraph className="text-gray-700">Chuyển khoản qua tài khoản ngân hàng:</Paragraph>
      <Paragraph className="text-gray-700">
        Khách hàng vui lòng chuyển khoản 100% giá trị đơn hàng (bao gồm cả phí ship, nếu có) vào tài khoản ngân hàng dưới
        đây:
      </Paragraph>
      <Paragraph className="text-gray-700 font-semibold">
        CÔNG TY CỔ PHẦN XUẤT BẢN VÀ TRUYỀN THÔNG IPM
      </Paragraph>
      <Paragraph className="text-gray-700">STK: 19037014304012</Paragraph>
      <Paragraph className="text-gray-700">
        Ngân hàng TECHCOMBANK - Ngân hàng Thương mại Cổ phần Kỹ thương Việt Nam - Chi nhánh Hà Nội
      </Paragraph>
      <Paragraph className="text-gray-700">
        Khi chuyển khoản, quý khách vui lòng ghi lại Mã số Đơn hàng được thanh toán vào phần nội dung thanh toán của lệnh
        chuyển khoản. (VD: Tên – Mã Đơn hàng – SĐT)
      </Paragraph>

      <Divider />

      <Paragraph className="text-gray-700">
        Nếu cần hỗ trợ thêm, vui lòng gọi điện đến hotline{' '}
        <span className="font-semibold text-blue-600">03 3319 3979</span> để được tư vấn.
      </Paragraph>
    </div>
  );
};

export default PaymentPolicy;
