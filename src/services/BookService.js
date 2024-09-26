import axios from "axios"

const BOOK_URL = "http://localhost:5146/api/book"
const getBook = () => {
    return axios.get(BOOK_URL)
}

const getBookById = (id) => {
    return axios.get(BOOK_URL + '/' + id)
}

const getBookByQuery = (query) => {
    return axios.get(BOOK_URL + '/' + query)
    .then(response => {
        console.log('Get All Books Response:', response);
        return response;
    })
    .catch(error => {
        console.error('Error fetching all books:', error);
        throw error;
    });
}

const getBooksByCollectionId = (id) => {
    if(id === 'all')
    {
        return axios.get(BOOK_URL + '/sorted-and-paged')
    }
    return axios.get(BOOK_URL + '/sorted-and-paged/by-collection?collection=' + id )
}

const getBooksByQuery = (id) => {
    if(id === 'all')
    {
        return axios.get(BOOK_URL + `/sorted-and-paged/by-collection?sortBy=Price&sortOrder=asc`)
    }
    return axios.get(BOOK_URL + `/sorted-and-paged/by-collection?collection=${id}&sortBy=Price&sortOrder=asc`)
}

const getBooksBySearchValue = (value) => {
    return axios.get(BOOK_URL + `/search?size=12&sortOrder=asc&name=${value}`)
}

export {getBook, getBookByQuery, getBooksByCollectionId, getBooksByQuery, getBookById, getBooksBySearchValue}