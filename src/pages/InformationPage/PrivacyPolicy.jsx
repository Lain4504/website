import React from 'react';
import { Typography, Divider } from 'antd'; // Ant Design component
import Title from '../../components/Title';
import Breadcrumb from '../../components/Breadcrumb';

const { Paragraph } = Typography;

const PrivacyPolicy = () => {
  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Chính sách bảo mật' },
];
  return (
    <> 
    <Breadcrumb items={breadcrumbs}/>
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center mb-6 text-2xl">  <Title text1={'Chính sách'} text2={'bảo mật'} /></h2>

      <Divider />

      <Paragraph className="text-lg font-bold text-gray-900">1. Mục đích và phạm vi thu thập thông tin</Paragraph>
      <Paragraph className="text-gray-700">
        Bảo mật thông tin khách hàng là một trong những ưu tiên hàng đầu nhằm tạo điều kiện mua sắm tốt nhất cho quý khách tại Forever. Chúng tôi hiểu sử dụng hợp lý và bảo mật thông tin sẽ thể hiện sự quan tâm của Forever dành cho quý khách. Vì thế, Forever cam kết việc sử dụng thông tin trên sẽ chỉ nhằm nâng cao chất lượng dịch vụ khách hàng và tạo môi trường mua sắm an toàn, tiện lợi tại website Forever.vn. Cụ thể, thông tin cá nhân của quý khách chỉ được dùng với các mục đích sau:
        <p className='mt-3'>
          - Số điện thoại và địa chỉ Email của quý khách được dùng nhằm nâng cao chất lượng dịch vụ hỗ trợ khách hàng.
        </p>
        <p>
          - Địa chỉ của quý khách chỉ được sử dụng để Forever thực hiện việc giao các đơn hàng quý khách đã đặt trên website Forever.vn
        </p>
        <p>
          - Gửi tới khách hàng các thông tin tiện ích, đánh giá chất lượng dịch vụ, giải quyết các vấn đề khi có phát sinh tranh chấp và ngăn chặn những hoạt động vi phạm pháp luật.
        </p>
      </Paragraph>
      <Paragraph className="text-lg font-bold text-gray-900">2. Phạm vi sử dụng thông tin</Paragraph>
      <Paragraph>
        Các thông tin về địa chỉ nhận hàng sẽ được cung cấp cho đơn vị vận chuyển nhằm thực hiện giao nhận hàng hóa. Các thông tin khác chỉ được sử dụng trong nội bộ Công ty cổ phần Xuất bản và truyền thông Forever.
      </Paragraph>

      <Paragraph className="text-lg font-bold text-gray-900">3. Thời gian lưu trữ thông tin</Paragraph>
      <Paragraph>
        Các thông tin về địa chỉ nhận hàng sẽ được cung cấp cho đơn vị vận chuyển nhằm thực hiện giao nhận hàng hóa. Các thông tin khác chỉ được sử dụng trong nội bộ Công ty cổ phần Xuất bản và truyền thông Forever.
      </Paragraph>

      <Paragraph className="text-lg font-bold text-gray-900">4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</Paragraph>
      <Paragraph>
        CÔNG TY CỔ PHẦN XUẤT BẢN VÀ TRUYỀN THÔNG Forever
        <div>
          Địa chỉ: 110 Nguyễn Ngọc Nại, Khương Mai, Thanh Xuân, Hà Nội
        </div>
      </Paragraph>

      <Paragraph className="text-lg font-bold text-gray-900">5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</Paragraph>
      <Paragraph>
        Bất cứ thời điểm nào bạn cũng có thể truy cập và chỉnh sửa những thông tin cá nhân của mình theo các đường links mà chúng tôi cung cấp.
      </Paragraph>
      <Paragraph className="text-lg font-bold text-gray-900">6. Forever cam kết bảo vệ thông tin của khách hàng</Paragraph>
      <Paragraph>
        <p>
          Forever cam kết không bán, chia sẻ thông tin cá nhân của quý khách vì bất cứ mục đích gì. Tất cả thông tin giao dịch giữa quý khách và Forever sẽ được bảo mật và không chia sẻ cho bất kỳ bên thứ ba nào.
        </p>
        <p>
          Forever cam kết không lưu lại bất kỳ thông tin tài khoản ngân hàng, thông tin thẻ tín dụng và thông tin tài chính của quý khách.
        </p>
      </Paragraph>
      <Paragraph className="text-lg font-bold text-gray-900">7. Trách nhiệm của khách hàng</Paragraph>
      <Paragraph>
        <div>
          Quý khách không nên trao đổi những thông tin tài khoản, thanh toán, giao nhận của mình cho bất kỳ bên thứ 3 nào khác để tránh rò rỉ thông tin. Khi sử dụng chung máy tính với nhiều người, vui lòng thoát khỏi tài khoản mỗi khi không sử dụng dịch vụ của Forever nữa để tự bảo vệ thông tin về mật khẩu truy cập của mình.
        </div>
        <div>
          Ngoài ra, quý khách tuyệt đối không được sử dụng bất kỳ hình thức nào để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Chúng tôi nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống website. Mọi vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết. Mọi thông tin của quý khách tại Forever sẽ được chúng tôi bảo mật nhưng trong trường hợp pháp luật yêu cầu, chúng tôi buộ.c phải cung cấp thông tin này cho cơ quan pháp luật
        </div>
        <Paragraph>
          Trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo mật của Forever, vui lòng liên hệ:
          <br />
          Fanpage: <a href="https://www.facebook.com/Forevervn">https://www.facebook.com/Forever</a>
          <br />
          Email: ForeverBookStore@gmail.com
          <br />
          Tel: 03 3319 3979
        </Paragraph>
      </Paragraph>
    </div>
    </>
  );
};

export default PrivacyPolicy;
