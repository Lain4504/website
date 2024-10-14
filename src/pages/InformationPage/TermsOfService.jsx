import React from 'react';
import { Typography, Divider } from 'antd'; // Ant Design component
import Title from '../../components/Title';

const { Paragraph } = Typography;

const TermsOfService = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center mb-6 text-2xl">  <Title text1={'Điều khoản'} text2={'dịch vụ'}/></h2>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">Chào mừng Quý khách đến mua sắm tại IPM.VN</Paragraph>
      <Paragraph className="text-gray-700">
        Sau khi truy cập vào website IPM để tham khảo hoặc mua sắm, Quý khách đã đồng ý tuân thủ và ràng buộc với những
        quy định của IPM. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua
        bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần
        thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng
        tải, có nghĩa là Quý khách chấp nhận với những thay đổi đó.
      </Paragraph>
      <Paragraph className="text-gray-700">
        Nếu có bất cứ câu hỏi nào về những thỏa thuận trên đây, vui lòng email cho chúng tôi qua địa chỉ
        online.ipmvn@gmail.com.
      </Paragraph>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">1. Tài khoản của khách hàng</Paragraph>
      <Paragraph className="text-gray-700">
        Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người
        giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy
        định hiện hành của pháp luật Việt Nam.
      </Paragraph>
      <Paragraph className="text-gray-700">
        Khi mua sắm tại IPM.VN, Quý khách sẽ cung cấp cho chúng tôi thông tin về địa chỉ email, mật khẩu và họ tên để
        có được 1 tài khoản tại đây.
      </Paragraph>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">2. Quyền lợi bảo mật thông tin của khách hàng</Paragraph>
      <Paragraph className="text-gray-700">
        Khi mua sắm tại website IPM.VN, Quý khách được đảm bảo rằng những thông tin cung cấp cho chúng tôi sẽ chỉ được
        dùng để nâng cao chất lượng dịch vụ dành cho khách hàng của IPM và sẽ không được chuyển giao cho 1 bên thứ ba nào
        khác vì mục đích thương mại.
      </Paragraph>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">3. Trách nhiệm của khách hàng khi sử dụng website</Paragraph>
      <Paragraph className="text-gray-700">
        Quý khách tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào để can thiệp, xâm nhập bất hợp pháp vào hệ
        thống hay làm thay đổi cấu trúc dữ liệu tại website IPM.
      </Paragraph>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">4. Trách nhiệm và quyền lợi của IPM</Paragraph>
      <Paragraph className="text-gray-700">
        Trong trường hợp có những phát sinh ngoài ý muốn hoặc trách nhiệm của mình, IPM sẽ không chịu trách nhiệm về mọi
        tổn thất phát sinh. Ngoài ra, chúng tôi không cho phép các tổ chức, cá nhân khác quảng bá sản phẩm tại website IPM
        mà chưa có sự đồng ý bằng văn bản.
      </Paragraph>
    </div>
  );
};

export default TermsOfService;
