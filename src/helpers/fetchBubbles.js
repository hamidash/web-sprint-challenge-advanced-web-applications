import { axiosWithAuth } from "./axiosWithAuth";

export const fetchBubbles = (setColorList) => {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
        setColorList(res.data);
    })
    .catch(err => {
        console.error(err.response)
    })
}