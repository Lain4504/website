import axios from "axios"

const CAROUSEL_URL = "http://localhost:8081/api/v1/slider"

const getSlider = () => {
    return axios.get(CAROUSEL_URL)
}

export {getSlider}