import axios from "axios"

const BOOK_URL = import.meta.env.VITE_API_URL + "/book"

const getBook = () => {
    return axios.get(`${BOOK_URL}`)
}

const getBookById = (id) => {
    return axios.get(`${BOOK_URL}/${id}`)
}

const getCollectionByBookId = (bookId) => {
    return axios.get(`${BOOK_URL}/get-collections/${bookId}`);
}

const getAuthorByBookId = (bookId) => {
    return axios.get(`${BOOK_URL}/get-authors/${bookId}`);
}

const getBooksByCollectionId = (id) => {
    if (id === 'all') {
        return axios.get(`${BOOK_URL}/sorted-and-paged`)
    }
    return axios.get(`${BOOK_URL}/sorted-and-paged/by-collection?collection=${id}`)
}

const getBooksByQuery = (id) => {
    if (id === 'all') {
        return axios.get(`${BOOK_URL}/sorted-and-paged/by-collection?sortBy=Price&sortOrder=asc`)
    }
    return axios.get(`${BOOK_URL}/sorted-and-paged/by-collection?collection=${id}&sortBy=Price&sortOrder=asc`)
}

const getBooksBySearchValue = (value) => {
    return axios.get(`${BOOK_URL}/search?title=${value}`)
}

const getBookByQuery = (query) => {
    return axios.get(`${BOOK_URL}/${query}`)
        .then(response => {
            console.log('Get Book by Query Response:', response);
            return response;
        })
        .catch(error => {
            console.error('Error fetching book by query:', error);
            throw error;
        });
}

const getBookByAuthorId = (authorId) => {
    return axios.get(`${BOOK_URL}/author/${authorId}`);
}

export {
    getBook,
    getBookById,
    getCollectionByBookId,
    getAuthorByBookId,
    getBooksByCollectionId,
    getBooksByQuery,
    getBooksBySearchValue,
    getBookByQuery,
    getBookByAuthorId
}
