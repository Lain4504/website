import axios from "axios";

const POST_URL = "http://localhost:5146/api/post";
const POSTCATEGORY_URL = "http://localhost:5146/api/post-category";
const getAllPost = () =>{
    return axios.get(POST_URL);
}
const getPostById = (id) => {
    return axios.get(POST_URL + "/" + id);
}
const getAllPostCategories = () =>{
    return axios.get(POSTCATEGORY_URL);
}
const getPostByCategoryId = (id) => {
    if (id === 'all') {
        return axios.get(POST_URL + '/sorted-and-paged');
    }
    return axios.get(POST_URL + '/sorted-and-paged/by-postcategory?postcategory=' + id);
};

export {getAllPost, getPostById, getAllPostCategories, getPostByCategoryId}