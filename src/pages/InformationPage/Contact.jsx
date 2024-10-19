import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Title from '../../components/Title';

const Contact = () => {
  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Liên hệ' }
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbs} className="my-10" />
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'LIÊN'} text2={'HỆ'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* Google Maps Embed */}
        <div className='w-full h-[60vh] md:w-3/5 md:h-[60vh]'>
          <iframe
            src="https://maps.google.com/maps?q=FPT%20University,%20Quy%20Nhon&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className='w-full h-full border-0'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='Google Maps'
          ></iframe>
        </div>
        <div className='flex flex-col justify-center items-start gap-6 md:w-2/5'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>FPT University <br /> Quy Nhon City</p>
          <p className='text-gray-500'> Tel: 0915234798 <br /> Email: ForeverBookStore@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Một dự án cho môn học SWP391</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Khám phá thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
