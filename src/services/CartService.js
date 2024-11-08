import axios from "axios";

const CART_API = import.meta.env.VITE_API_URL + "/cart";
const ORDER_API = import.meta.env.VITE_API_URL + "/order";
const getAllCartByUserId = (id) => {
    return axios.get(`${CART_API}/by-user/${id}`);
}

const addToCart = (cart) => {
    return axios.post(`${CART_API}/add`, cart);
}

const updateCartItem = (order) => {
    console.log("Sending update for orderId:", order);
    // console.log("Request body:", { orderDetailId, quantity, salePrice });

    // Make the PUT request
    return axios.put(`${ORDER_API}/update-quantity`, order);
};
const removeFromCart = (cartItemId) => {
    return axios.delete(`${CART_API}/remove/${cartItemId}`);
}

const getCartDetails = (userId) => {
    return axios.get(`${CART_API}/details/${userId}`);
}

const deleteCartItem = (cartItemId) => {
    return axios.delete(`${ORDER_API}/delete/${cartItemId}`);
}
export { 
    getAllCartByUserId, 
    addToCart, 
    updateCartItem, 
    removeFromCart, 
    getCartDetails,
    deleteCartItem
}
