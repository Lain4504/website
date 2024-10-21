import React, { useContext, useEffect, useState } from 'react';
import { getAllCartByUserId } from '../services/CartService';
import { AuthContext } from '../context/AuthContext';

const MiniCart = () => {
  const [miniCart, setMiniCart] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.userId || null;

  useEffect(() => {
    if (userId) {
      getAllCartByUserId(userId).then(response => {
        setMiniCart(response.data.orderDetails);
      }).catch(error => {
        console.error("Error fetching mini cart:", error);
      });
    }
  }, [userId]);

  if (miniCart.length === 0) {
    return <div className="p-4 text-center text-gray-500">Giỏ hàng trống</div>;
  }
  // change positon
  return (
    <div className="mini-cart p-4 bg-white shadow-lg rounded-md w-64 z-50 relative"> 
      {miniCart.map(item => (
        <div key={item.id} className="flex items-center mb-2">
          <img src={item.book.images[0]?.link} alt={item.book.title} className="w-12 h-auto" />
          <div className="ml-4">
            <p className="font-medium">{item.book.title}</p>
            <p className="text-sm text-gray-600">{item.amount} x {item.salePrice.toLocaleString()}₫</p>
          </div>
        </div>
      ))}
      <p className="font-bold mt-4">
        Tổng: {miniCart.reduce((total, item) => total + item.amount * item.salePrice, 0).toLocaleString()}₫
      </p>
    </div>
  );
};

export default MiniCart;
