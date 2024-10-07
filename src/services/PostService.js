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

export {getAllPost, getPostById, getAllPostCategories}