import axios from "axios";

const COLLECTION_API = "http://localhost:8081/api/v1/book-collection"

const getCollections = () => {
    return axios.get(COLLECTION_API)
}

const getCollectionById = (id) => { 
    return axios.get(COLLECTION_API + '/' + id)
}

export {getCollections, getCollectionById}