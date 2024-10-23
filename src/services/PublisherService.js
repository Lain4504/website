import axios from "axios";
const PUBLISHER_API = import.meta.env.VITE_API_URL + "/publisher";

const getPublisherById = (id) => {
    return axios.get(`${PUBLISHER_API}/${id}`);
}

export {getPublisherById}