import axios from "axios"

const BOOK_API = import.meta.env.VITE_API_URL + "/book"

const getBook = () => {
    return axios.get(`${BOOK_API}`)
}

const getBookById = (id) => {
    return axios.get(`${BOOK_API}/${id}`)
}

const getCollectionByBookId = (bookId) => {
    return axios.get(`${BOOK_API}/get-collections/${bookId}`);
}

const getAuthorByBookId = (bookId) => {
    return axios.get(`${BOOK_API}/get-authors/${bookId}`);
}

const getBooksByCollectionId = (id) => {
    if (id === 'all') {
        return axios.get(`${BOOK_API}/sorted-and-paged`)
    }
    return axios.get(`${BOOK_API}/sorted-and-paged/by-collection?collection=${id}`)
}

const getBooksByQuery = (id) => {
    if (id === 'all') {
        return axios.get(`${BOOK_API}/sorted-and-paged/by-collection?sortBy=Price&sortOrder=asc`)
    }
    return axios.get(`${BOOK_API}/sorted-and-paged/by-collection?collection=${id}&sortBy=Price&sortOrder=asc`)
}

const getBooksBySearchValue = (value) => {
    return axios.get(`${BOOK_API}/search?title=${value}`)
}

const getBookByQuery = (query) => {
    return axios.get(`${BOOK_API}/${query}`)
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
    return axios.get(`${BOOK_API}/author/${authorId}`);
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
