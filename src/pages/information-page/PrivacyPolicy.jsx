import React from 'react';
import { Typography } from 'antd';
import Title from '../../components/Title';

const { Paragraph } = Typography;

const PrivacyPolicy = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <Title text1={'Chính sách'} text2={'Bảo mật'}/>
      <h2 className="text-center mb-6 text-2xl font-bold">Chính sách bảo mật</h2>

      <Paragraph>
        <h4 className="text-lg font-semibold">1. Mục đích và phạm vi thu thập thông tin</h4>
        Bảo mật thông tin khách hàng là một trong những ưu tiên hàng đầu nhằm tạo điều kiện mua sắm tốt nhất cho quý khách tại IPM. Chúng tôi hiểu sử dụng hợp lý và bảo mật thông tin sẽ thể hiện sự quan tâm của IPM dành cho quý khách. Vì thế, IPM cam kết việc sử dụng thông tin trên sẽ chỉ nhằm nâng cao chất lượng dịch vụ khách hàng và tạo môi trường mua sắm an toàn, tiện lợi tại website ipm.vn. Cụ thể, thông tin cá nhân của quý khách chỉ được dùng với các mục đích sau:
      </Paragraph>
      
      <Paragraph className="pl-4 list-disc">
        - Số điện thoại và địa chỉ Email của quý khách được dùng nhằm nâng cao chất lượng dịch vụ hỗ trợ khách hàng.
        <br />
        - Địa chỉ của quý khách chỉ được sử dụng để IPM thực hiện việc giao các đơn hàng quý khách đã đặt trên website ipm.vn
        <br />
        - Gửi tới khách hàng các thông tin tiện ích, đánh giá chất lượng dịch vụ, giải quyết các vấn đề khi có phát sinh tranh chấp và ngăn chặn những hoạt động vi phạm pháp luật.
      </Paragraph>

      <Paragraph>
        <h4 className="text-lg font-semibold">2. Phạm vi sử dụng thông tin</h4>
        Các thông tin về địa chỉ nhận hàng sẽ được cung cấp cho đơn vị vận chuyển nhằm thực hiện giao nhận hàng hóa. Các thông tin khác chỉ được sử dụng trong nội bộ Công ty cổ phần Xuất bản và truyền thông IPM.
      </Paragraph>

      <Paragraph>
        <h4 className="text-lg font-semibold">3. Thời gian lưu trữ thông tin</h4>
        Thông tin tài khoản của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự khách hàng thực hiện việc xóa bỏ khỏi cơ sở dữ liệu của website ipm.vn.
      </Paragraph>

      <Paragraph>
        <h4 className="text-lg font-semibold">4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân:</h4>
        CÔNG TY CỔ PHẦN XUẤT BẢN VÀ TRUYỀN THÔNG IPM
        <br />
        Địa chỉ: 110 Nguyễn Ngọc Nại, Khương Mai, Thanh Xuân, Hà Nội
      </Paragraph>

      <Paragraph>
        <h4 className="text-lg font-semibold">5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình:</h4>
        Bất cứ thời điểm nào bạn cũng có thể truy cập và chỉnh sửa những thông tin cá nhân của mình theo các đường links mà chúng tôi cung cấp.
      </Paragraph>

      <Paragraph>
        <h4 className="text-lg font-semibold">6. IPM cam kết bảo vệ thông tin của khách hàng</h4>
        IPM cam kết không bán, chia sẻ thông tin cá nhân của quý khách vì bất cứ mục đích gì. Tất cả thông tin giao dịch giữa quý khách và IPM sẽ được bảo mật và không chia sẻ cho bất kỳ bên thứ ba nào.
        <br />
        IPM cam kết không lưu lại bất kỳ thông tin tài khoản ngân hàng, thông tin thẻ tín dụng và thông tin tài chính của quý khách.
      </Paragraph>

      <Paragraph>
        <h4 className="text-lg font-semibold">7. Trách nhiệm của khách hàng</h4>
        Quý khách không nên trao đổi những thông tin tài khoản, thanh toán, giao nhận của mình cho bất kỳ bên thứ 3 nào khác để tránh rò rỉ thông tin. Khi sử dụng chung máy tính với nhiều người, vui lòng thoát khỏi tài khoản mỗi khi không sử dụng dịch vụ của IPM nữa để tự bảo vệ thông tin về mật khẩu truy cập của mình.
        <br />
        Ngoài ra, quý khách tuyệt đối không được sử dụng bất kỳ hình thức nào để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Chúng tôi nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống website. Mọi vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết. Mọi thông tin của quý khách tại IPM sẽ được chúng tôi bảo mật nhưng trong trường hợp pháp luật yêu cầu, chúng tôi buộc phải cung cấp thông tin này cho cơ quan pháp luật.
      </Paragraph>

      <Paragraph>
        Trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo mật của IPM, vui lòng liên hệ:
        <br />
        Fanpage: <a href="https://www.facebook.com/ipmvn">https://www.facebook.com/ipmvn</a>
        <br />
        Email: online.ipmvn@gmail.com
        <br />
        Tel: 03 3319 3979
      </Paragraph>
    </div>
  );
};

export default PrivacyPolicy;
