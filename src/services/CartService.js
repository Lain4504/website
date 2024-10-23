import axios from "axios";

const CART_API = import.meta.env.VITE_API_URL + "/cart";

const getAllCartByUserId = (id) => {
    return axios.get(`${CART_API}/by-user/${id}`);
}

const addToCart = (cart) => {
    return axios.post(`${CART_API}/add`, cart);
}

const updateCartItem = (cart) => {
    return axios.put(CART_API, cart);
}

const removeFromCart = (cartItemId) => {
    return axios.delete(`${CART_API}/remove/${cartItemId}`);
}

const getCartDetails = (userId) => {
    return axios.get(`${CART_API}/details/${userId}`);
}

export { 
    getAllCartByUserId, 
    addToCart, 
    updateCartItem, 
    removeFromCart, 
    getCartDetails 
}
