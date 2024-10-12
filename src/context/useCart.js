import { useState, useEffect } from 'react';
import { getAllCartByUserId } from '../services/CartService';

const useCart = (userId) => {
  const [cart, setCart] = useState([]);
  const [cartChange, setCartChange] = useState(false);

  useEffect(() => {
    const handleCart = async () => {
      try {
        const cartData = await getAllCartByUserId(userId);
        setCart(cartData?.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      handleCart();
    }
  }, [userId, cartChange]);

  return { cart, setCart, cartChange, setCartChange };
};

export default useCart;
