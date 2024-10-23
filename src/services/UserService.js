import axios from "axios";

const ACCOUNT_API = import.meta.env.VITE_API_URL + "/user";

const createAccount = (account) => {
    return axios.post(`${ACCOUNT_API}/register`, account);
};

const login = (account) => {
    return axios.post(`${ACCOUNT_API}/login`, account);
};

const activateAccount = (token) => {
    return axios.post(`${ACCOUNT_API}/activate`, token, {
        headers: {
            'Authorization': `Bearer ${token}` // Truyền token vào header
        }
    });
};

const forgetPassword = (email) => {
    return axios.post(`${ACCOUNT_API}/forgot-password`, {
        Email: email 
    });
};

const resetPassword = (token) => {
    return axios.post(`${ACCOUNT_API}/reset-password`, token, {
        headers: {
            'Authorization': `Bearer ${token}` // Truyền token vào header
        }
    });
};

const getUserProfile = async (userId) => {
    return await axios.get(`${ACCOUNT_API}/get-profile/${userId}`);
};

const changePassword = (token) => {
    return axios.post(`${ACCOUNT_API}/change-password`, token, {
        headers: {
            'Authorization': `Bearer ${token}` // Truyền token vào header
        }
    });
};

const updateProfile = (id, profileData) => {
    return axios.put(`${ACCOUNT_API}/update-profile/${id}`, profileData);
}
const logout = (resfestToken) => {
    return axios.post(`${ACCOUNT_API}/logout`, resfestToken);
}
export { 
    createAccount, 
    login, 
    activateAccount, 
    forgetPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword, 
    updateProfile 
};
