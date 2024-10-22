import axios from "axios";

const POST_API = import.meta.env.VITE_API_URL + "/post";
const POSTCATEGORY_API = import.meta.env.VITE_API_URL + "/post-category";
const getAllPost = () =>{
    return axios.get(`${POST_API}`);
}
const getPostById = (id) => {
return axios.get(`${POST_API}/${id}`);
}
const getAllPostCategories = () =>{
    return axios.get(`${POSTCATEGORY_API}`);
}
const getPostByCategoryId = (id) => {
    if (id === 'all') {
        return axios.get(`${POST_API}/sorted-and-paged`);
    }
    return axios.get(`${POST_API}/sorted-and-paged/by-postcategory?postcategory=${id}`);
};

export {getAllPost, getPostById, getAllPostCategories, getPostByCategoryId}