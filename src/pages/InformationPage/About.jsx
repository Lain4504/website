import React from 'react'
import Breadcrumb from '../../components/Breadcrumb';
import Title from '../../components/Title';

const About = () => {
  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Về Forever' }
  ];
  return (
    <div>
      <Breadcrumb items={breadcrumbs} className="my-10" />
      <div className='text-2xl pt-8 border-t'>
        <Title text1={'Giới thiệu về'} text2={'Forever'} />
      </div>

      <hr />
      <div className='my-10'>
        <div className='text-gray-600'>
          <p>Book Store Forever là một trang web chuyên cung cấp sách đa dạng, từ tiểu thuyết, sách kinh doanh, đến sách học thuật. Với tiêu chí "Mở mang tri thức - Vững bước tương lai," Book Store Forever cam kết mang đến cho độc giả những tựa sách hay nhất, phù hợp với mọi lứa tuổi và sở thích. Giao diện trang web thân thiện, dễ sử dụng, giúp người mua dễ dàng tìm kiếm và đặt sách online. Đặc biệt, Book Store Forever thường xuyên có các chương trình khuyến mãi và ưu đãi, mang đến trải nghiệm mua sắm tiện lợi và tiết kiệm..</p>
          <b className='text-gray-800 mt-4 mb-4 block'>Sản phẩm và dịch vụ</b>
          <p>Book Store Forever cung cấp một loạt các sản phẩm phong phú với hàng ngàn đầu sách thuộc nhiều thể loại khác nhau như văn học, khoa học, kỹ năng sống, và sách thiếu nhi. Sản phẩm của chúng tôi được chọn lọc kỹ lưỡng từ các nhà xuất bản uy tín nhằm đảm bảo chất lượng cho độc giả. Ngoài việc cung cấp sách giấy, Book Store Forever còn cung cấp dịch vụ sách điện tử và audiobook, đáp ứng nhu cầu đọc sách linh hoạt. Dịch vụ giao hàng nhanh chóng trên toàn quốc, cùng với chính sách đổi trả thuận tiện, giúp khách hàng hoàn toàn yên tâm khi mua sắm tại đây.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'Tại sao'} text2={'chọn chúng tôi'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Tầm nhìn</b>
          <p className='text-gray-600'> Book Store Forever mong muốn trở thành nhà cung cấp sách hàng đầu tại Việt Nam, nơi mọi người có thể tìm thấy tri thức và cảm hứng qua từng trang sách. Chúng tôi đặt mục tiêu xây dựng một cộng đồng yêu sách rộng lớn, thúc đẩy văn hóa đọc và giúp độc giả tiếp cận tri thức dễ dàng hơn trong thời đại công nghệ số.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Sứ mệnh</b>
          <p className='text-gray-600'>Sứ mệnh của Book Store Forever là mang đến cho khách hàng những trải nghiệm mua sắm sách tiện lợi, nhanh chóng và chất lượng nhất. Chúng tôi luôn nỗ lực không ngừng để cung cấp những sản phẩm và dịch vụ hoàn hảo, nhằm lan tỏa tình yêu sách đến với mọi người. Qua đó, chúng tôi không chỉ bán sách mà còn xây dựng một nền tảng tri thức để phục vụ nhu cầu học hỏi và phát triển của cộng đồng.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Giá trị cốt lõi</b>
          <p className='text-gray-600'> Book Store Forever luôn đặt uy tín và chất lượng lên hàng đầu. Chúng tôi tin tưởng vào sự đổi mới liên tục để mang đến trải nghiệm tốt nhất cho khách hàng. Với tinh thần phục vụ tận tâm, chúng tôi cam kết đem lại những giá trị thiết thực cho cộng đồng và xây dựng mối quan hệ bền vững với khách hàng, đối tác cũng như các nhà xuất bản.</p>
        </div>
      </div>
    </div>
  )
}

export default About
