import axios from "axios";

const COLLECTION_API = import.meta.env.VITE_API_URL + "/collection"
const getCollections = () => {
    return axios.get(`${COLLECTION_API}`)
}

const getCollectionById = (id) => { 
    return axios.get(`${COLLECTION_API}/${id}`)
}

export {getCollections, getCollectionById}