import axios from "axios";

const WISHLIST_BASE_URL = 'http://localhost:5146/api/wishlist'

const getWishlistByUserId = (userId) => {
    return axios.get(WISHLIST_BASE_URL + '/user/' + userId);
}

const addWishList = (user, book) => {
    return axios.post(WISHLIST_BASE_URL + `?user=${user}&book=${book}`);
}

const deleteWishList = (user, book) => {
    return axios.delete(WISHLIST_BASE_URL + `?user=${user}&book=${book}`);
}

const deleteAllWishList = (user) => {
    return axios.delete(WISHLIST_BASE_URL + 'all-' + user);
}

export {getWishlistByUserId, addWishList, deleteWishList, deleteAllWishList}