import React from 'react';
import { Collapse, Typography, Divider } from 'antd'; // Ant Design components
import Title from '../../components/Title';

const { Panel } = Collapse;
const { Paragraph } = Typography;

const FAQ = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center mb-6 text-2xl">  
        <Title text1={'Câu hỏi'} text2={'thường gặp'}/>
        </h2>
      <Divider />

      <Collapse accordion>
        <Panel header="1. Làm thế nào để đặt hàng trên FOREVER?" key="1">
          <Paragraph className="text-gray-700">
            Để đặt hàng, bạn chỉ cần tìm kiếm sản phẩm trên trang chủ, chọn sách bạn muốn, thêm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn.
          </Paragraph>
        </Panel>
        <Panel header="2. Tôi có thể thanh toán bằng hình thức nào?" key="2">
          <Paragraph className="text-gray-700">
            Chúng tôi hỗ trợ nhiều hình thức thanh toán, bao gồm chuyển khoản ngân hàng, thanh toán khi nhận hàng (COD) và ví điện tử.
          </Paragraph>
        </Panel>
        <Panel header="3. Thời gian giao hàng là bao lâu?" key="3">
          <Paragraph className="text-gray-700">
            Thời gian giao hàng sẽ phụ thuộc vào địa điểm của bạn. Thông thường, đơn hàng sẽ được giao trong vòng 3-5 ngày làm việc.
          </Paragraph>
        </Panel>
        <Panel header="4. Tôi có thể trả hàng không?" key="4">
          <Paragraph className="text-gray-700">
            Có, bạn có thể trả hàng trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên vẹn và đầy đủ hóa đơn.
          </Paragraph>
        </Panel>
        <Panel header="5. Tôi có thể theo dõi đơn hàng của mình không?" key="5">
          <Paragraph className="text-gray-700">
            Có, sau khi đặt hàng, bạn sẽ nhận được email xác nhận với mã đơn hàng. Bạn có thể sử dụng mã này để theo dõi trạng thái đơn hàng trên website.
          </Paragraph>
        </Panel>
        <Panel header="6. Liệu có giảm giá hay khuyến mãi nào không?" key="6">
          <Paragraph className="text-gray-700">
            Chúng tôi thường xuyên có các chương trình khuyến mãi và giảm giá. Bạn có thể theo dõi thông tin trên trang web hoặc đăng ký nhận tin để không bỏ lỡ bất kỳ ưu đãi nào.
          </Paragraph>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FAQ;
