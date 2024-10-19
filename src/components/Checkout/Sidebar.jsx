import React from 'react';
import { Image } from 'antd'; 
const Sidebar = ({ cart }) => {
  return (
    <div className='w-64 p-4 bg-gray-100'>
      <div className="space-y-4">
        <div>
          {cart.orderDetails?.map(item => (
            <div className="flex items-center border-b py-2" key={item.id}>
              <div className="relative">
                <Image
                  className="w-16 h-16 object-cover rounded-md"
                  src={item.book.images[0].link}
                  alt={item.book.title}
                  preview={false}
                />
                <span className="absolute bottom-0 right-0 bg-black text-white text-xs rounded-full px-2 py-0.5">
                  {item.amount}
                </span>
              </div>
              <div className="ml-4 flex-1">
                <span className="block font-semibold">{item.book.title}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-lg text-red-600">
                  {item.book.salePrice.toLocaleString()}₫
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-gray-700">
            <span>Tạm tính</span>
            <span>
              {cart.orderDetails?.reduce((total, item) => total + item.book.salePrice * item.amount, 0)?.toLocaleString()}₫
            </span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Phí ship</span>
            <span>
              {cart.shippingPrice?.toLocaleString()}₫
            </span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Tổng tiền</span>
            <div className="text-right">
              <span className="text-lg font-semibold text-red-600">
                {(cart.orderDetails?.reduce((total, item) => total + item.book.salePrice * item.amount, 0) + cart.shippingPrice)?.toLocaleString()}₫
              </span>
              <span className="block text-xs text-gray-500">VND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
