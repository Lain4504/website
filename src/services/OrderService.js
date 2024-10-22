import axios from "axios";

const ORDER_API = import.meta.env.VITE_API_URL + "/order";

const cancelOrder = (orderId) => {
    return axios.put(`${ORDER_API}/cancel/${orderId}`)
}
const getOrderByUserId = (userId) => {
    return axios.get(`${ORDER_API}/user/${userId}`);
}
const getOrderDetailByOrderId = (orderId) => {
    return axios.get(`${ORDER_API}/orderdetail/${orderId}`);
}
const addOrder = (order) => {
    return axios.post(`${ORDER_API}/process`, order);
}
const getOrderById = (orderId) => {
    return axios.get(`${ORDER_API}/${orderId}`);
}
const updateOrder = (orderId, updatedOrderData) => {
    return axios.put(`${ORDER_API}/update-info/${orderId}`, updatedOrderData);
};
export {cancelOrder, getOrderByUserId, getOrderDetailByOrderId, getOrderById, addOrder, updateOrder}