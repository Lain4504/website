import React from 'react';
import { Typography, Divider } from 'antd'; // Ant Design component
import Title from '../../components/shared/Title';
import Breadcrumb from '../../components/shared/Breadcrumb';

const { Paragraph } = Typography;

const ReturnPolicy = () => {
  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Chính sách đổi trả' },
];
  return (
    <> 
    <Breadcrumb items={breadcrumbs}/>
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center mb-6 text-2xl">  <Title text1={'Chính sách'} text2={'đổi trả'}/></h2>

      <Divider />

      <Paragraph className="text-gray-700">
        Để việc mua sắm của quý khách tại Forever.vn được thuận lợi, quý khách vui lòng kiểm tra hàng ngay khi nhận được sản phẩm, bao gồm:
      </Paragraph>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Số lượng.</li>
        <li>Tên sản phẩm và chất lượng sản phẩm.</li>
        <li>
          Thông tin sản phẩm, thông tin người nhận trong lúc nhận hàng trước khi ký nhận và thanh toán tiền cho nhân viên giao nhận nếu bạn chọn thanh toán COD.
        </li>
      </ul>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">1. Các trường hợp được đổi sản phẩm:</Paragraph>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          Sản phẩm không đúng với yêu cầu đặt hàng: đổi trả trong vòng 7 ngày kể từ khi nhận hàng thành công.
        </li>
        <li>Sản phẩm lỗi kỹ thuật: lỗi trang, lỗi in ấn…. đổi trả trong vòng 7 ngày kể từ khi nhận hàng thành công.</li>
        <li>
          Sản phẩm không đảm bảo chất lượng và bị hư hỏng do quá trình vận chuyển: Khách hàng vui lòng trả ngay cho shipper khi kiểm tra hàng.
        </li>
      </ul>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">2. Các trường hợp được trả sản phẩm, hoàn tiền:</Paragraph>
      <Paragraph className="text-gray-700">
        Khách hàng có thể trả sản phẩm và nhận lại tiền mà không chịu bất kỳ phí tổn nào trong 2 trường hợp:
      </Paragraph>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Đơn hàng chưa được chuyển đi.</li>
        <li>Sản phẩm bị lỗi nhưng Forever không còn sản phẩm khác để thay thế.</li>
      </ul>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">3. Quy trình đổi trả hàng:</Paragraph>
      <Paragraph className="text-gray-700">
        Quý khách vui lòng gửi mail đến địa chỉ <span className="font-semibold">online.Forevervn@gmail.com</span> với tiêu đề
        “Đổi trả đơn hàng #mã đơn hàng”.
      </Paragraph>
      <Paragraph className="text-gray-700">
        Trong mail nêu rõ lý do yêu cầu đổi trả hàng, kèm các thông tin dưới đây:
      </Paragraph>
      <ul className="list-disc pl-6 text-gray-700">
        <li>
          Đối với trường hợp trả hàng ngay cho shipper: Chụp lại tình trạng gói hàng ngay thời điểm nhận, quay clip mở
          gói hàng (không chỉnh sửa).
        </li>
        <li>
          Đối với trường hợp trả hàng sau: Ở Hà Nội đổi trả trực tiếp tại văn phòng 110 Nguyễn Ngọc Nại, Khương Mai,
          Thanh Xuân, Hà Nội.
        </li>
      </ul>

      <Paragraph className="text-gray-700">
        Nếu cần hỗ trợ thêm quý khách có thể liên hệ trực tiếp qua hotline{' '}
        <span className="font-semibold text-blue-600">03 3319 3979</span> để được hỗ trợ nhanh chóng.
      </Paragraph>
    </div>
    </>
  );
};

export default ReturnPolicy;
