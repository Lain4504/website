import axios from "axios"

const BANNER_API = import.meta.env.VITE_API_URL + "/slider"
const ADS_API = import.meta.env.VITE_API_URL + "/ads"

const getSlider = () => {
    return axios.get(`${BANNER_API}`)
}
const getAds = () => {
    return axios.get(`${ADS_API}`)
}
export {getSlider, getAds}