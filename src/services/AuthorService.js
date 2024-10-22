import axios from "axios"

const AUTHOR_URL = import.meta.env.VITE_API_URL + "/author"

const getAuthorById = (id) => {
    return axios.get(`${AUTHOR_URL}/${id}`) 
}

export {
    getAuthorById
}
