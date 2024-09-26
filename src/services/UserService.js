import axios from "axios";

const ACCOUNT_URL = "http://localhost:5146/api/user/";

const createAccount = (account) => {
    return axios.post(ACCOUNT_URL + 'register', account);
}

const login = (account) => {
    return axios.post(ACCOUNT_URL + 'login', account);
}
const activateAccount = (token) => {
    return axios.post("http://localhost:5146/api/user/activate/", token)
}

export {createAccount, login, activateAccount}