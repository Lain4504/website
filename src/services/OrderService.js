import axios from "axios";

const ORDER_BASE_URL = 'http://localhost:5146/api/order'

const cancelOrder = (orderId) => {
    return axios.put(ORDER_BASE_URL + '/cancel/' + orderId)
}
export {cancelOrder}