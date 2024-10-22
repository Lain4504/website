import axios from "axios";

const ORDER_BASE_URL = 'http://localhost:5146/api/order'

const cancelOrder = (orderId) => {
    return axios.put(ORDER_BASE_URL + '/cancel/' + orderId)
}
const getOrderByUserId = (userId) => {
    return axios.get(ORDER_BASE_URL + '/user/' + userId);
}
const getOrderDetailByOrderId = (orderId) => {
    return axios.get(ORDER_BASE_URL + "/orderdetail/" + orderId);
}
const addOrder = (order) => {
    return axios.post(ORDER_BASE_URL + '/process', order);
}
const getOrderById = (orderId) => {
    return axios.get(ORDER_BASE_URL + "/" + orderId);
}
const updateOrder = (orderId, updatedOrderData) => {
    return axios.put(`${ORDER_BASE_URL}/update-info/${orderId}`, updatedOrderData);
};
export {cancelOrder, getOrderByUserId, getOrderDetailByOrderId, getOrderById, addOrder, updateOrder}