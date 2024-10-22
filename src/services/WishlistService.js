import axios from "axios";

const WISHLIST_API = `${import.meta.env.VITE_API_URL}/wishlist`;

const getWishlistByUserId = (userId) => {
    return axios.get(`${WISHLIST_API}/user/${userId}`);
};

const addWishList = (userId, bookId) => {
    const data = {
        userId: userId,
        bookId: bookId
    };
    return axios.post(WISHLIST_API, data);
};

const deleteWishList = (wishlistId) => {
    return axios.delete(`${WISHLIST_API}/${wishlistId}`);
};

export { getWishlistByUserId, addWishList, deleteWishList };
