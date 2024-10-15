import axios from "axios"

const AUTHOR_URL = "http://localhost:5146/api/author"

const getAuthorById = (id) => {
    return axios.get(BOOK_URL + '/' + id)
}

export {
    getAuthorById
}