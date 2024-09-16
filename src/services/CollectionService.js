import axios from "axios";

const COLLECTION_URL_API = "http://localhost:5146/api/collection"

const getCollections = () => {
    return axios.get(COLLECTION_URL_API)
}

const getCollectionById = (id) => { 
    return axios.get(COLLECTION_URL_API + '/' + id)
}

export {getCollections, getCollectionById}