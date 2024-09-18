import axios from "axios";

const COLLECTION_API = "http://localhost:5146/api/collection"

const getCollections = () => {
    return axios.get(COLLECTION_API)
}

const getCollectionById = (id) => { 
    return axios.get(COLLECTION_API + '/' + id)
}

export {getCollections, getCollectionById}