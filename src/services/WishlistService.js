import axios from "axios";

const WISHLIST_BASE_URL = 'http://localhost:5146/api/wishlist';

const getWishlistByUserId = (userId) => {
    return axios.get(WISHLIST_BASE_URL + '/user/' + userId);
};

const addWishList = (userId, bookId) => {
    const data = {
        userId: userId,
        bookId: bookId
    };
    return axios.post(WISHLIST_BASE_URL, data);
};


const deleteWishList = (wishlistId) => {
    return axios.delete(`${WISHLIST_BASE_URL}/${wishlistId}`);
};

export { getWishlistByUserId, addWishList, deleteWishList };
