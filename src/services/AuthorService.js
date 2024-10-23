import axios from "axios"

const AUTHOR_API = import.meta.env.VITE_API_URL + "/author"

const getAuthorById = (id) => {
    return axios.get(`${AUTHOR_API}/${id}`) 
}

export {
    getAuthorById
}
