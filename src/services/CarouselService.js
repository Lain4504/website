import axios from "axios"

const CAROUSEL_URL = "http://localhost:5146/api/slider"

const getSlider = () => {
    return axios.get(CAROUSEL_URL)
}

export {getSlider}