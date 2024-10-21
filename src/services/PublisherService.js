import axios from "axios";

const PUBLISHER_BASE_URL = "http://localhost:5146/api/publisher";

const getPublisherById = (id) => {
    return axios.get(PUBLISHER_BASE_URL + '/' + id);
}

export {getPublisherById}