import React from 'react'
import Breadcrumb from '../components/Breadcrumb';

const Cart = () => {
  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Giỏ hàng' }
];
  return (
    <> 
    <Breadcrumb items={breadcrumbs} className="my-10" /> 
    <div>
      
    </div>
    </>
  )
}

export default Cart
