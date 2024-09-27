import axios from "axios";

const ACCOUNT_URL = "http://localhost:5146/api/user/";

const createAccount = (account) => {
    return axios.post(ACCOUNT_URL + 'register', account);
}

const login = (account) => {

    return axios.post(ACCOUNT_URL + 'login', account);
}
const activateAccount = (token) => {
    return axios.post(ACCOUNT_URL + 'activate', token)
}
const forgetPassword = (email) => {
    return axios.post(ACCOUNT_URL + 'forgot-password', {
        Email: email 
    });
};
const resetPassword = (token) => {
    return axios.post(ACCOUNT_URL + 'reset-password', token); 
};
const getUserProfile = async (userId) => {
    return await axios.get(`${ACCOUNT_URL}get-profile/${userId}`); 
};


export {createAccount, login, activateAccount, forgetPassword, resetPassword,getUserProfile }